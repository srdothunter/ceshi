import React, {useState, useEffect} from 'react';
import * as history from 'history';
import {Form} from "react-bootstrap";
import Accounts from '../api/Account';
import {useSubstrate} from "../api/contracts";

const createHashHistory = history.createHashHistory();

export default function Headertop() {
    const {dispatch} = useSubstrate();

    const [showHeader, setshowHeader] = useState(false);
    const [allList, setallList] = useState([]);
    const [selected, setselected] = useState([]);

    useEffect(() => {
        setshowHeader(createHashHistory.location.pathname !== '/');
        createHashHistory.listen((obj) => {
            setshowHeader(createHashHistory.location.pathname !== '/')
        });
    }, [setshowHeader]);

    useEffect(() => {

    }, []);

    useEffect(() => {
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
    }, []);

    const backNav = () => {
        createHashHistory.goBack()
    }

    const backHome = () => {
        createHashHistory.push(`/`)
    }

    const selectAccounts = async(e) => {
        let selected = allList.filter(i => i.address === e.target.value);
        setselected(selected);
        sessionStorage.setItem('account', JSON.stringify(selected));

        dispatch({type: 'SET_ALLACCOUNTS',payload:selected});
    }
    const connectWallet = async () => {
        const accoutlist = await Accounts.accountlist();
        setallList(accoutlist);
    }

    return (<div className='container header'>
        <div className="row">
            <div className='col-6 leftText'>
                {
                    showHeader &&
                    <div>
                        <span onClick={backNav}><i className='fa fa-chevron-left'/>Prev</span>
                        <span onClick={backHome}>Home</span>
                    </div>
                }
            </div>
            <div className='col-6 rightText'>
                <div className="header-button">
                    {
                        !selected.length && !allList.length &&
                        <button className='btn' onClick={connectWallet}>Connect Wallet</button>
                    }
                    {!selected.length && !!allList.length &&
                    <Form.Control as="select" onChange={(event) => selectAccounts(event)}>
                        <option value=''>Select Option</option>
                        {
                            allList.map((opt) =>
                                <option value={opt.address} key={opt.address}>{opt.meta.name}</option>
                            )
                        }
                    </Form.Control>
                    }
                    {!!selected.length &&
                    <div className='topName'>Account: <span>{selected[0].meta.name}</span></div>
                    }
                </div>
            </div>

        </div>
    </div>);

}

