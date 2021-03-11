import React, {useEffect, useState} from 'react';
import shap1 from "./images/footer-shap-1.png";
import shap2 from "./images/footer-shap-3.png";
import {useSubstrate} from "./api/contracts";

import api from './api/index';
import Loading from "./components/loading/Loading";

export default function About(props) {
    const {state, dispatch} = useSubstrate();
    const {basecontract, vaultcontract, orgcontract, votecontract, daoManagercontract, apiState} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [id, setAId] = useState(null);
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [moderators, setModerators] = useState([]);
    const [activelist, setActivelist] = useState([]);
    const [balancelist, setbalancelist] = useState([]);
    const [contractlist, setcontractlist] = useState([]);
    const [tokenlist, settokenlist] = useState([]);

    const [daostate, setdaostate] = useState(false);
    const [basestate, setbasestate] = useState(false);
    const [vaultstate, setvaultstate] = useState(false);
    const [votestate, setvotestate] = useState(false);
    const [orgstate, setorgstate] = useState(false);

    useEffect(() => {
        if (apiState !== 'READY') return;

        const setInitDAO = async () => {
            setLoading(true)
            setTips('Initializing DAO Contracts')
            await api.dao.InitDAO(state, dispatch, props.match.params.id, (data) => {
                setdaostate(data)
            });

        };
        setInitDAO();
    }, [apiState]);
    useEffect(() => {
        setAId(props.match.params.id);
    }, []);

    useEffect( () => {
        if (daoManagercontract == null && daostate) return;
        const queryAddrs = async () => {

            setTips('Get Contract Address');
            await api.dao.queryComponentAddrs(daoManagercontract).then(data => {
                if (data) {
                    setcontractlist(data)
                }

            });

        };
        queryAddrs();
    }, [daoManagercontract, daostate]);

    useEffect(() => {

        const {vault_addr, org_addr, vote_addr, erc20_addr, base_addr} = contractlist;
        if (base_addr != null) {

            const setInitBase = async () => {
                setTips('Initializing Contracts');
                await api.base.InitBase(state, dispatch, base_addr, (data) => {
                    setbasestate(data)
                });
            };
            setInitBase();
        }
        if (vault_addr != null) {
            const setInitVault = async () => {
                setTips('Initializing Contracts');
                await api.vault.InitVault(state, dispatch, vault_addr, (data) => {
                    setvaultstate(data)
                });
            };
            setInitVault();
        }

        if (org_addr != null) {
            const setInitOrg = async () => {
                setTips('Initializing Contracts');
                await api.org.InitOrg(state, dispatch, org_addr, (data) => {
                    setorgstate(data)
                });
            };
            setInitOrg();
        }
        if (vote_addr != null) {
            const setInitVote = async () => {
                setTips('Initializing Contracts');
                await api.vote.InitVote(state, dispatch, vote_addr, (data) => {
                    setvotestate(data)
                });
            };
            setInitVote();
        }
        if (erc20_addr != null) {
            const setInitErc20 = async () => {
                setTips('Initializing Contracts');
                await api.erc20.InitErc20(state, dispatch, erc20_addr);
            };
            setInitErc20();
        }

    }, [daoManagercontract, contractlist]);


    useEffect(() => {
        sessionStorage.setItem('logo', logo)
    }, [logo]);
    useEffect( () => {
        const setBalance = async () => {
            setTips('Get balance Of tokens');
            let arr = [];
            let index = 0;
            for (let item of tokenlist) {
                // eslint-disable-next-line no-loop-func
                await api.vault.getBalanceOf(vaultcontract, item).then(data => {
                    if (!data) return;

                    arr[index] = {
                        address: item,
                        balance: data
                    };
                    index++;
                });
            }
            setbalancelist(arr)
        };
        setBalance();
    }, [tokenlist]);
    useEffect( () => {
        if (!basestate || contractlist.base_addr == null || !contractlist.base_addr) return;

        const setBase = async () => {
            setTips('Get information');
            await api.base.getBaseData(basecontract).then(data => {
                if (!data) return;
                let {owner, name, logo, desc} = data;

                setName(name);
                setLogo(logo);
                setDescription(desc);
                setOwner(owner);
            });
            setLoading(false)
        };
        setBase();
    }, [basecontract, basestate]);

    useEffect( () => {
        if (!vaultstate || contractlist.vault_addr == null || !contractlist.vault_addr) return;
        const setToken = async () => {
            await api.vault.getTokenList(vaultcontract).then(data => {
                if (!data) return;
                settokenlist(data)
            });
        };
        setToken();
    }, [vaultcontract, vaultstate]);

    useEffect( () => {
        if (!votestate || contractlist.vote_addr == null || !contractlist.vote_addr) return;
        const setActiveVote = async () => {
            await api.vote.queryOpenVote(votecontract).then(data => {
                if (!data) return;
                let arr = data.slice(0, 3);
                setActivelist(arr)
            });
        };
        setActiveVote();
    }, [votecontract, votestate]);

    useEffect( () => {
        if (!orgstate || contractlist.org_addr == null || !contractlist.org_addr) return;
        const setModeratorList = async () => {
            await api.org.getDaoModeratorList(orgcontract).then(data => {
                if (!data) return;
                setModerators(data)
            });
        };
        setModeratorList();
        // const AccountId = await Accounts.accountAddress();
        // const value = 0;
        // const gasLimit = -1;
        // if(erc20contract==null) return ;
        // await erc20contract.query.name(AccountId, {value, gasLimit}).then(nameResult=>{
        //     nameResult = publicJs.formatResult(nameResult);
        //     console.log("erc20 token name:", nameResult);
        // });
        //
        // await erc20contract.query.symbol(AccountId, {value, gasLimit}).then(nameResult=>{
        //     nameResult = publicJs.formatResult(nameResult);
        //     console.log("erc20 token symbol:",nameResult);
        // });
        //
        // await erc20contract.query.totalSupply(AccountId, {value, gasLimit}).then(nameResult=>{
        //     nameResult = publicJs.formatResult(nameResult);
        //     console.log("erc20 token total supply:",nameResult);
        // });


    }, [orgcontract, orgstate]);

    const handleClicktoType = (type) => {
        props.history.push(`/${type}/${id}`)
    }
    return (
        <div>
            <Loading showLoading={loading} tips={tips}/>
            <section className="section blog-single position-relative">
                <div className="footershape-image-1">
                    <img src={shap1} alt=''/>
                </div>
                <div className="footershape-image-3">
                    <img src={shap2} alt=''/>
                </div>
                <div className="container">
                    <div className="row">
                        <aside className="col-lg-4">

                            <div className='sidebar'>
                                <div className='leftTop'>
                                    <img src={logo} alt=''/>
                                </div>
                                <ul>
                                    <li>{name}</li>
                                    <li>Owner: {owner}</li>
                                    <li>{description}</li>
                                </ul>
                            </div>

                        </aside>
                        <div className="col-lg-8 ">
                            <div className='post-details'>
                                <div>
                                    <h4>Balance</h4>
                                    <ul className='list balance'>
                                        {
                                            balancelist.map((item, index) =>
                                                <li key={`balance_${index}`}>
                                                    <a href="#"
                                                       target='_blank'>{item.address}</a><span>{item.balance}</span>
                                                </li>
                                            )
                                        }


                                    </ul>
                                </div>
                                <div>
                                    <h4>Moderators</h4>
                                    <ul className='list'>
                                        {
                                            moderators.map((i, index) => <li key={moderators[index]}>
                                                <span>{moderators[index][1]}</span>
                                                <a href="#" target='_blank'>{moderators[index][0]}</a>
                                            </li>)
                                        }

                                    </ul>
                                </div>
                                <div>
                                    <h4>Contracts</h4>
                                    {
                                        contractlist != null && <ul className='list'>{
                                            Object.keys(contractlist).map((key) => (
                                                <li key={`contract_${key}`}>
                                                    <span>{key}: </span>
                                                    <a href="#" target='_blank'>{contractlist[key]}</a>
                                                </li>))
                                        }

                                        </ul>
                                    }
                                </div>
                                <div>
                                    <h4>Votings</h4>
                                    <ul className='list'>
                                        {
                                            activelist.map((item, index) => <li key={`votings_${index}`}>
                                                {/*<span>Active: </span>*/}
                                                <a href="#" target='_blank'>{item.title}</a>
                                            </li>)
                                        }

                                    </ul>
                                </div>
                                <div>
                                    <ul className="service-docs">
                                        {
                                            contractlist.vote_addr != null && <li>
                                                <span onClick={() => handleClicktoType('vote')}>
                                                    <i className="fa fa-street-view"/>
                                                    Voting
                                                </span>
                                            </li>
                                        }
                                        {
                                            contractlist.vault_addr != null && <li>
                                            <span onClick={() => handleClicktoType('vault')}>
                                                <i className="fa fa-star-o"/>
                                                Vault
                                            </span>
                                            </li>
                                        }

                                        {
                                            contractlist.org_addr != null && <li>
                                            <span onClick={() => handleClicktoType('org')}>
                                                <i className="fa fa-building-o"/>
                                                Org
                                            </span>
                                            </li>
                                        }


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}
