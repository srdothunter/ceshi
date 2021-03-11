import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useSubstrate} from "../../api/contracts";
import api from "../../api";

import Loading from "../loading/Loading";

export default function ForthStep(props) {
    const {state, dispatch} = useSubstrate();
    const {maincontract, daoManagercontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [instanceByTemplate, setinstanceByTemplate] = useState(false);
    const [name, setname] = useState('');
    const [logo, setlogo] = useState('');
    const [desc, setdesc] = useState('');
    const [ercUrl, setercUrl] = useState('');
    const [symbol, setsymbol] = useState('');
    const [ercSupply, setsercSupply] = useState('');
    const [baseC, setbaseC] = useState(null);
    const [tokenlist,settokenlist]= useState([]);
    const [adminlist,setadminlist]= useState([]);
    const [contractlist,setcontractlist]= useState(null);
    const [transfer,settransfer]= useState(false);
    const [admin,setadmin]= useState(false);
    const [queryAddrs,setqueryAddrs]= useState(false);
    const [daoinit,setDaoinit]= useState(false);
    const [adminstate,setadminstate]= useState(false);
    const [tokenstate,settokenstate]= useState(false);

    const handleClicktoAbout = () => {
        props.history.push(`/about/${baseC.dao_manager_addr}`);

    }
    useEffect( () => {
        const firstStep = JSON.parse(sessionStorage.getItem('firstStep'));
        setname(firstStep.name);
        setdesc(firstStep.description);

        const secondStep = JSON.parse(sessionStorage.getItem('secondStep'));
        // setercUrl(secondStep[0].dao_manager_code_hash);

        const thirdStep = JSON.parse(sessionStorage.getItem('thirdStep'));
        const {symbol,supply,admin,token,adminlist,tokenlist} = thirdStep;
        setsymbol(symbol);
        setsercSupply(supply);
        setadminstate(admin);
        settokenstate(token);
        if(admin){
            setadminlist(adminlist);
        }
        if(token){
            settokenlist(tokenlist);
        }
        const img = sessionStorage.getItem('ImageUrl');
        setlogo(img);

    }, []);
        useEffect( () => {

        // 1.调用main合约实例化DAO，instanceByTemplate (index: u64, controller: AccountId): bool
        // 2.等待上链，in block，根据当前账户地址查询实例化的DAO列表，listDaoInstancesByOwner (owner: AccountId): Vec<DAOInstance>
        // 取当前id最大即最新的DAO实例
        // 3.获取DAO地址后，调用初始化传入DAO名称和token初始化，init(&mut self, base_name: String, base_logo: String, base_desc: String,
        //     erc20_name: String, erc20_symbol: String, erc20_initial_supply: u64, erc20_decimals: u8) -> bool
        // 4.获取DAO地址后，调用分配token，transfer(&mut self, to: AccountId, value: u64) -> bool
        // 5.获取DAO地址后，调用增加管理员，add_dao_moderator(&mut self, name: String, moderator: AccountId) -> bool
        // 6.初始化完成，查询DAO管理的组件地址，query_component_addrs(&self) -> DAOComponentAddrs

            const secondStep = JSON.parse(sessionStorage.getItem('secondStep'));
            console.log(secondStep && secondStep[0] &&secondStep[0].id)
            if(secondStep && secondStep[0] &&secondStep[0].id){
                const stepone=async () => {
                    setLoading(true)
                    setTips('Instance By Template');
                    await api.main.instanceByTemplate(maincontract, secondStep[0].id,(result) => {
                        setinstanceByTemplate(result)
                        console.log("第一步=======instanceByTemplate",secondStep[0].id, parseInt(secondStep[0].id))
                    });
                };
                stepone();
            }


    }, [maincontract]);
    useEffect( () => {
        if (instanceByTemplate){
            console.log("第二步=======listDaoInstancesByOwner")
            const steptwo = async () => {
                setTips('List Dao Instances By Owner');
                await api.main.listDaoInstancesByOwner(maincontract).then(data => {
                    if (!data) return;
                    if (data.length) {
                        console.log("======listDaoInstancesByOwner", baseC, data)
                        setbaseC(data && data.length?data[data.length - 1]:[])
                    }
                });
            };
            steptwo()
        }
    }, [instanceByTemplate]);
    useEffect( () => {
        if(baseC!=null && instanceByTemplate){
            console.log("第三步=======InitDAO")
            const stepthree = async () => {
                setTips('Init DAO');
                await api.dao.InitDAO(state, dispatch, baseC.dao_manager_addr, (data) => {
                    setDaoinit(true)
                });
            };
            stepthree();
        }
    }, [baseC]);
    useEffect( () => {
        if(daoinit && instanceByTemplate && baseC!=null){
            console.log("第四步=======传内容",baseC.dao_manager_addr);
            let obj = {
                base_name: name,
                base_logo: logo,
                base_desc: desc,
                erc20_name: ercUrl,
                erc20_symbol: symbol,
                erc20_initial_supply: ercSupply,
                erc20_decimals: 0
            };
            if (daoManagercontract == null) return;
            const stepfour = async () => {
                setTips('Upload DAO\'s information');
                await api.dao.setDAO(daoManagercontract, obj, (data) => {
                    settransfer(true)
                });
            };
            stepfour();
        }
    }, [daoinit]);
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    useEffect( () => {
        if(daoinit && instanceByTemplate && baseC!=null && transfer){
            if(tokenstate){
                console.log("第五步======= transfer",transfer,daoinit)
                const stepfive = async () => {
                    setTips('Transfer Tokens');
                    let arr=[];
                    let index=0;
                    for (let item of tokenlist) {
                        if(index){
                            while (!arr[index-1]){
                                await delay(500);
                            }
                        }
                        try{
                            await api.dao.transferToken(daoManagercontract, item, (data) => {

                                arr.push(data);
                                setTips(`Transfer Tokens (${arr.length}/${tokenlist.length})`);
                                if(arr.length===tokenlist.length){
                                    setadmin(true);
                                }
                            });
                        }catch (e) {
                            console.log(e);
                        }
                        index++;
                    }

                };
                stepfive();

            }else{
                setadmin(true);
            }
        }

    }, [transfer]);

    useEffect( () => {
        if(admin && daoinit && instanceByTemplate && baseC!=null && transfer){
            if(adminstate){
                console.log("第六步======= 添加管理员",admin , daoinit);
                const stepsix = async () => {
                    setTips('Add Dao Moderators');
                    let arr=[];
                    let index=0;
                    for (let item of adminlist) {
                       if(index){
                           while (!arr[index-1]){
                               await delay(500);
                           }
                       }
                        try{
                            await api.dao.addDaoModeratorTx(daoManagercontract, item, (data) => {
                                arr.push(data);
                                setTips(`Add Dao Moderators (${arr.length}/${adminlist.length})`);
                                if(arr.length===adminlist.length){
                                    setqueryAddrs(true);
                                }
                            });
                        }catch (e) {
                            console.log(e)
                        }

                    index++;
                    }

                };
                stepsix();
            }else {
                setqueryAddrs(true);
            }
        }
    }, [admin]);
     useEffect( () => {
         if( queryAddrs && daoinit && instanceByTemplate && baseC!=null && admin && transfer){
             console.log("第七步======= queryComponentAddrs",queryAddrs,daoinit)
             const stepseven = async () => {
                 setTips('Get contract address');
                 await api.dao.queryComponentAddrs(daoManagercontract).then(data => {
                     console.log(data, daoManagercontract);
                     setcontractlist(data);
                     setLoading(false);
                     sessionStorage.removeItem("step");
                     sessionStorage.removeItem("secondStep");
                     sessionStorage.removeItem("thirdStep");
                     sessionStorage.removeItem("firstStep");
                     sessionStorage.removeItem("ImageUrl");
                 });
             };
             stepseven();
         }
        }, [queryAddrs]);

    return <ul>
        <Loading showLoading={loading} tips={tips}/>
        {
            contractlist!=null && <li className='successful'>
            <div className="successFont">
                <h1>
                    <span>S</span>
                    <span>U</span>
                    <span>C</span>
                    <span>C</span>
                    <span>e</span>
                    <span>s</span>
                    <span>s</span>
                    <span>f</span>
                    <span>u</span>
                    <span>l</span>
                </h1>
            </div>
            <div className="successInfo">Create {name} successful !!</div>
        </li>}
        {
            contractlist!=null &&  <li className="addresslist">{
                Object.keys(contractlist).map((key)=>(
                    <div key={key}>
                        <span>{key}</span>
                        <a href="#">{contractlist[key]}</a>
                </div>))
            }
            </li>
        }


        <li className='brdr'>
            {/*<Button variant="outline-primary" className='leftBtn' onClick={toThirdStep}>Previous</Button>*/}
            {
                contractlist!=null &&  <Button variant="primary" onClick={handleClicktoAbout}>Manage</Button>
            }

        </li>
    </ul>;


}
