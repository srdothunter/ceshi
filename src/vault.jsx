import React, { useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import PageBackground from "./components/pagebackground";
import {useSubstrate} from "./api/contracts";
import api from "./api";
import Loading from "./components/loading/Loading";

export default function Vault(props){

    const {state} = useSubstrate();
    const {vaultcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [id, setId] = useState(null);
    const [list, setlist] = useState([]);
    const [tokenlist, settokenlist] = useState([]);
    const [historylist, sethistorylist] = useState([]);
    const [logo, setLogo] = useState('');
    const [withDrawS, setwithDrawS] = useState(true);

    useEffect(() => {
        setId(props.match.params.id);
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);

    }, []);
    useEffect(() => {
        if(vaultcontract==null) return ;
        const checkAuthority = async() => {
            await api.vault.checkAuthority(vaultcontract).then(data => {
                setwithDrawS(data)
            });
        };
        checkAuthority();
    }, [vaultcontract]);

    useEffect(  () => {
        const setbalance = async () => {
            let arr = [{
                token: '',
                balance: ''
            }];
            let index = 0;
            for (let item of list) {
                arr[index].token = item;
                // eslint-disable-next-line no-loop-func
                await api.vault.getBalanceOf(vaultcontract, item).then(data => {
                    if (!data) return;
                    arr[index].balance = data
                });
                index++;
            }
            settokenlist(arr);
            setLoading(false);
        };
        setbalance();
    }, [list]);

    useEffect( () => {
        if(vaultcontract === null) return;
        setLoading(true);
        setTips('Initialize the vault page');
        const setAlllist = async () => {
            await api.vault.getTokenList(vaultcontract).then(data => {
                if (!data) return;
                setlist(data)
            });

            await api.vault.getTransferHistory(vaultcontract).then(data => {
                if (!data) return;
                sethistorylist(data)
            });
        };
        setAlllist();
    }, []);

    const handleClicktoDetail = (type) => {
        props.history.push(`/${type}/${id}`)
    }
    const handleClicktoVote = () => {
        props.history.push(`/about/${id}`)
    }

        return (
            <div>
                <Loading showLoading={loading} tips={tips}/>
                <section>
                    <PageBackground />
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={logo} alt=""/>
                                </div>
                                <div className='vaultBtn'>
                                    <Button variant="primary" onClick={()=>handleClicktoDetail('deposit')}>Deposit</Button>
                                    {
                                        withDrawS&&<Button variant="primary" onClick={()=>handleClicktoDetail('withdraw')}>Withdraw</Button>
                                    }

                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="vault">
                                    <li>
                                        <h6>Balance</h6>
                                        <div className='vaultbg'>
                                            {
                                                tokenlist.map((item,index)=><dl key={`balance_${index}`}>
                                                    <dt>{item.token}</dt>
                                                    <dd>{item.balance}</dd>
                                                </dl>)
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <h6>History</h6>
                                        <div className='vaultbg hslist'>
                                            {
                                                historylist.map((item,index)=><dl key={`history_${index}`}>
                                                    {
                                                        item.transfer_direction === '2' &&  <span>
                                                            <dt>deposit</dt>
                                                        </span>
                                                    }
                                                    {
                                                        item.transfer_direction === '1' &&  <span>
                                                            <dt>Transfer from</dt>
                                                            <dd><a href="#">{item.from_address}</a></dd>
                                                        </span>
                                                    }

                                                    <dd>{item.value}</dd>
                                                </dl>)
                                            }
                                        </div>
                                    </li>
                                    <li className='brdr'>
                                        <Button variant="outline-primary" onClick={handleClicktoVote}>Back</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}

