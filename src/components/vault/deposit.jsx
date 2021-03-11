import React, {useEffect, useState} from 'react';
import PageBackground from "../pagebackground";
import {Button, Form, InputGroup, FormControl} from "react-bootstrap";
// import {CopyToClipboard} from 'react-copy-to-clipboard';
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import VaultmodalTips from "./vaultmodalTips";

import Loading from "../loading/Loading";

export default function Deposit(props){
    const {state} = useSubstrate();
    const {vaultcontract,erc20contract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [id, setId] = useState(null);
    // const [copied, setCopied] = useState(false);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const [token, setToken] = useState('');
    const [amount, setAmount] = useState('');
    const [logo, setLogo] = useState('');
    const [deposit, setdeposit] = useState('');

    const [list, setList] = useState([]);

    useEffect( () => {
        setId(props.match.params.id)
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
        const setTokenlist=async () => {
            await api.vault.getTokenList(vaultcontract).then(data => {
                if (!data) return;
                setList(data)
            });
        };
        setTokenlist();
    }, []);

    useEffect( () => {
        let obj = {
            amount,selected
        }
        if(deposit){
            const setdeposit =async () => {
                setLoading(true);
                setTips('Create a new deposit');
                await api.vault.deposit(vaultcontract, obj, (result) => {
                    if (result) {
                        setLoading(false);
                        props.history.push(`/vault/${id}`)
                    }
                });

            };
            setdeposit();
        }

    }, [deposit]);


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
        const {value} = e.target;
        setAmount(value)
    }
    const handleConfirm= async()=>{

        setShowModal(false);

        await api.erc20.approveOp(erc20contract,amount,(result)=> {
            setdeposit(true)
        })

    }
    const handleSelect = (e) => {
        // let template =list.filter(item => item.value === e.target.value);
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

        // return (
        //     <div>
        //         <section>
        //             <PageBackground/>
        //             <div className="container">
        //                 <div className="createSingle row">
        //                     <div className='col-lg-4'>
        //                         <div>
        //                             <img src={logo} alt=""/>
        //                         </div>
        //                     </div>
        //                     <div className='col-lg-8'>
        //                         <ul className="vault">
        //                             <li>
        //                                 <Form.Control as="select"  onChange={handleSelect} >
        //                                     <option value=''>Please select option</option>
        //                                     {
        //                                         list.map(i => (
        //                                             <option value={i} key={i}>{i}</option>
        //                                         ))
        //                                     }
        //                                 </Form.Control>
        //                             </li>
        //                             <li>
        //                                 <div className='row'>
        //                                     <div className="col-4">
        //
        //                                         {   selected &&
        //                                             <div className='qrcode'>
        //                                                 <img src={selected.img} width="100%" alt=""/>
        //                                             </div>
        //                                         }
        //                                     </div>
        //                                     <div className="col-8">
        //                                         {
        //                                             selected && <div>
        //                                         <div className='addressTop'>Deposit address</div>
        //                                         <div className='address'>
        //
        //                                                     {selected.address}
        //                                                     <CopyToClipboard text='ann4 d6tz vjzn rru6 fqee 3d57 rb62 xnph'
        //                                                                      onCopy={() => setCopied(true,()=>{setTimeout(()=>{setCopied(false)},2000)})}>
        //                                                         <i className='fa fa-copy'/>
        //                                                     </CopyToClipboard>
        //
        //
        //                                         </div>
        //                                             </div>
        //                                         }
        //                                         <div className='mt-4'>
        //                                             {
        //                                                 copied &&
        //                                                 <Alert variant='primary' transition={true}>
        //                                                     Deposit address copied to clipboard!
        //                                                 </Alert>
        //                                             }
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //
        //                             </li>
        //
        //                             <li className='brdr'>
        //                                 <Button variant="outline-primary" onClick={handleClicktoVault}>Back</Button>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>
        //
        //     </div>
        // )

}

