import React, {useEffect, useState} from 'react';
import PageBackground from "../pagebackground";
import VoteEcharts from "./voteEcharts";
import { Button} from "react-bootstrap";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";

export default function VoteOverview (props){
    const {state} = useSubstrate();
    const {votecontract} = state;
    const [voteid, setvoteid] = useState(null);
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [support, setsupport] = useState('');
    const [min, setmin] = useState('');
    const [optionlist, setoptionlist] = useState([]);

    const handleClicktoVote = () => {
       props.history.push(`/vote/${props.match.params.id}`)
    }
    useEffect(() => {
        const setOneVote = async() => {
            await api.vote.queryOneVote(votecontract, props.match.params.voteid).then(data => {
                if (!data) return;
                const {
                    vote_id, title, desc, support_require_num, min_require_num, choices
                } = data;
                settitle(title);
                setvoteid(vote_id);
                setdesc(desc);
                setsupport(support_require_num);
                setmin(min_require_num);
                let arr = [], afterArr = [];
                arr = choices.split(',');
                arr.map((i, index) => {
                    let obj = i.split(":");
                    afterArr[index] = {
                        value: obj[1] ? parseInt(obj[1]) : 0,
                        name: obj[0]
                    };
                    return i;
                });
                if (afterArr.length) {
                    setoptionlist(afterArr);
                }

            });
        };

        setOneVote();
    }, []);

    return (
        <div>
            <section>
                <PageBackground />
                <div className="container">
                    <div className="createSingle row">
                        <div className='col-lg-4 bg'>
                            <ul>
                                <li>
                                    Voting Number: {voteid}
                                </li>
                                {/*<li>status:*/}
                                {/*    <Badge variant="primary"><i className="fa fa-remove"/> Failed</Badge>*/}
                                {/*    <Badge variant="success"><i className="fa fa-check"/> Success</Badge>*/}
                                {/*    <Badge variant="secondary"><i className="fa fa-retweet"/> Pending</Badge>*/}
                                {/*</li>*/}
                                <li>
                                    {/*Creator: Hongfei <a href="">43ertowjtrejorejtwoot43ertowjtrejorejtwoot</a>*/}
                                </li>
                                <li>
                                    Title: {title}
                                </li>
                                <li>
                                    support require number: {support}
                                </li>
                                <li>
                                    min require number: {min}
                                </li>
                                <li>
                                    <div>
                                        Voting Description:
                                    </div>
                                    <div>
                                        {desc}
                                    </div>
                                </li>
                            </ul>
                            <div className='brdr'>
                                <Button variant="outline-primary" onClick={handleClicktoVote}>Back</Button>
                            </div>
                        </div>
                        <div className='col-lg-8 bg'>
                            {
                                optionlist.length&&<VoteEcharts optionlist={optionlist} />
                            }

                        </div>
                    </div>
                </div>
            </section>

        </div>
    )

}
