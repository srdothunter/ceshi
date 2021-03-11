import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import PageBackground from "../pagebackground";
import {useSubstrate} from "../../api/contracts";
import api from "../../api/index";
import Loading from "../loading/Loading";


export default function VoteView (props){

    const {state} = useSubstrate();
    const {votecontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [optionlist, setoptionlist] = useState([]);
    const [id, setId] = useState(null);
    const [voteid, setvoteid] = useState(null);
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [selected, setselected] = useState('');
    const [logo, setLogo] = useState('');
    const [afterchoice, setafterchoice] = useState(false);

    useEffect(() => {
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);
    useEffect(() => {
        if(afterchoice){
            props.history.push(`/voteOverview/${props.match.params.id}/${voteid}`);
            setLoading(false);
        }

    }, [afterchoice]);

    useEffect(() => {
        setvoteid(props.match.params.voteid);
        setId(props.match.params.id);


        const setOnevote = async() => {
            setLoading(true);
            setTips('Initialize the vote page');
            await api.vote.queryOneVote(votecontract, props.match.params.voteid).then(data => {
                if (!data) return;
                const {
                    vote_id, title, desc, choices
                } = data;
                settitle(title);
                setId(vote_id);
                setdesc(desc);
                setoptionlist(choices.split(','))
            });
            setLoading(false);
        };
        setOnevote();
    }, []);

    const handleClicktoVote = () => {
        props.history.push(`/vote/${props.match.params.id}`)
    }
    const handleClicktoOverview = async () => {
        setLoading(true);
        setTips('Voting');
        await api.vote.VoteChoice(votecontract,voteid,selected,(data)=>{
            setafterchoice(data)
        });

    }
    const handleRadio = (e) =>{
        setselected(e.target.value)
    }

    return (
        <div>
            <Loading showLoading={loading} tips={tips}/>
            <section>
                <PageBackground/>
                <div className="container">
                    <div className="createSingle row">
                        <div className='col-lg-4'>
                            <div>
                                <img src={logo} alt=""/>
                            </div>

                        </div>
                        <div className='col-lg-8'>
                            <ul>
                                <li className='timeTop'>
                                    <i className='fa fa-clock-o'/> 03:59:28
                                </li>
                                <li className='VotetitleTop'>
                                    <div>
                                        <p>{id}. {title} </p>
                                    </div>
                                </li>
                                <li>
                                    <div className='voteContent'>
                                        <p>{desc}</p>
                                    </div>
                                </li>

                                <li>
                                    {optionlist.map((i, index) => (

                                        <div key={index}>
                                            <div className="row">
                                                <div className="col-12 radioOption">
                                                    <Form.Group controlId="formBasicCheckbox">
                                                        <Form.Check
                                                            type="radio"
                                                            label={i.split(":")[0]}
                                                            id={`radio_${index}`}
                                                            value={index}
                                                            name='radiobutton' onChange={handleRadio}/>
                                                    </Form.Group>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                    }


                                </li>

                                <li className='brdr pl-1'>
                                    <Button variant="outline-primary" className='leftBtn'
                                            onClick={handleClicktoVote}>Cancel</Button>
                                    <Button variant="primary" onClick={handleClicktoOverview}>Vote</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )

}

