import React, {useEffect, useState} from 'react';
import VotePagination from './components/vote/votePagination';
import VotePending from './components/vote/votePending';
import VoteActive from './components/vote/voteActive';
import {Button} from "react-bootstrap";
import PageBackground from "./components/pagebackground";
import {useSubstrate} from "./api/contracts";

import api from './api/index';

import Loading from "./components/loading/Loading";

export default function Vote(props){

    const {state} = useSubstrate();
    const {votecontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [id, setAId] = useState(null);
    const [activelist, setActivelist] = useState([]);
    const [pendinglist, setPendinglist] = useState([]);
    const [historylist, setHistorylist] = useState([]);
    const [logo, setLogo] = useState('');

    const  handleClicktonewVote = () => {
        props.history.push(`/newVote/${props.match.params.id}`);
    }
    useEffect(() => {
        setAId(props.match.params.id);
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);

    useEffect(() => {

        const setAll = async() => {
            setLoading(true);
            setTips('Initialize the vote page');
            await api.vote.queryOpenVote(votecontract).then(data => {
                if (!data) return;
                setActivelist(data)
            });

            await api.vote.queryWaitVote(votecontract).then(data => {
                if (!data) return;
                setPendinglist(data)
            });

            await api.vote.queryAllVote(votecontract).then(data => {
                if (!data) return;
                setHistorylist(data)
            });
            setLoading(false);
        };
        setAll();

    }, []);

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
                                <div className='newVote'>
                                    <Button variant="primary" onClick={handleClicktonewVote}>New voting</Button>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="vote">
                                    <li>
                                        <h6>Active Voting List</h6>
                                        <VoteActive
                                            id={id}
                                            list={activelist}
                                            history={props.history}
                                        />
                                    </li>
                                    <li>
                                        <h6>Pending Voting List</h6>
                                        <VotePending
                                            id={id}
                                            list={pendinglist}
                                            history={props.history}
                                        />
                                    </li>
                                    <li>
                                        <h6>History</h6>
                                        <VotePagination
                                            id={id}
                                            list={historylist}
                                            history={props.history}  />
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}

