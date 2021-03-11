import React, { useEffect, useState} from 'react';
import PageBackground from "../pagebackground";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import VaultmodalTips from "./vaultmodalTips";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";

import Loading from "../loading/Loading";

export default function Withdraw(props){
    const {state} = useSubstrate();
    const {vaultcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [id, setId] = useState(null);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [address, setaddress] = useState('');
    // const [token, setToken] = useState('');
    // const [reason, setReason] = useState('');
    const [amount, setamount] = useState('');
    const [logo, setLogo] = useState('');


    const [list, setList] = useState([]);

    useEffect(() => {
        setId(props.match.params.id);
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);

    useEffect( () => {
        const settokenlist = async () => {
            await api.vault.getTokenList(vaultcontract).then(data => {
                if (!data) return;
                setList(data)
            });
        };
        settokenlist();
    }, []);

    const handleClicktoVault=()=>{
       props.history.push(`/vault/${id}`)
    }
    const triggerConfirm=()=>{
        setShowModal(true)
    }
    const handleClose = () => {
        setShowModal(false)
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        let str = `set${name}`
        eval(str)(value)
    }
    const handleConfirm= async()=>{

        setShowModal(false)

        let obj = {
            address,amount,selected
        }
        setLoading(true);
        setTips('Create a new withdraw');
        await api.vault.withdraw(vaultcontract,obj,(result)=> {
            setLoading(false);
            if(result){
                props.history.push(`/vault/${id}`)
            }
        });
    }
    const handleSelect = (e) => {
        setSelected(e.target.value)
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
                            </div>
                            <div className='col-lg-8'>
                                <ul className="withdraw">
                                    <li>
                                        <Form.Control as="select" name='selected' onChange={handleSelect}>
                                            <option key='noselect'>Please select option</option>
                                            {
                                                list.map(i => (
                                                    <option value={i} key={i}>{i}</option>
                                                ))
                                            }
                                        </Form.Control>
                                        <br />
                                    </li>
                                    <li>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill your receiver's address"
                                                value={address}
                                                name='address'
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                        {/*<InputGroup className="mb-3">*/}
                                        {/*    <FormControl*/}
                                        {/*        placeholder="Please fill your reason"*/}
                                        {/*        value={reason}*/}
                                        {/*        name='reason'*/}
                                        {/*        onChange={handleChange}*/}
                                        {/*    />*/}
                                        {/*</InputGroup>*/}

                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill your amount"
                                                value={amount}
                                                name='amount'
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                    </li>
                                    <li className='brdr'>
                                        <Button variant="primary" onClick={handleClicktoVault}>Back</Button>
                                        <VaultmodalTips
                                            handleClose={handleClose}
                                            showTips={showModal}
                                            handleConfirm={handleConfirm}
                                        />
                                        <Button variant="outline-primary" onClick={triggerConfirm}>Request</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}

