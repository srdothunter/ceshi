import React, {useEffect, useState} from 'react';
import PageBackground from "./components/pagebackground";
import {Button} from "react-bootstrap";
import {useSubstrate} from "./api/contracts";
import api from "./api";

import Loading from "./components/loading/Loading";

export default function Org(props) {

    const {state} = useSubstrate();
    const {orgcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [id, setId] = useState(null);
    const [list, setlist] = useState([]);
    const [memberlist, setmemberlist] = useState([]);
    const [logo, setLogo] = useState('');

    useEffect(() => {
        setId(props.match.params.id);
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);

    useEffect(() => {
        if (orgcontract == null) return;

        const setall = async () => {
            setLoading(true);
            setTips('Initialize the ORG page');

            await api.org.getDaoModeratorList(orgcontract).then(data => {
                if (!data) return;
                setlist(data)
            });
            await api.org.getDaoMembersList(orgcontract).then(data => {
                if (!data) return;
                setmemberlist(data)
            });
            setLoading(false);
        };
        setall();
    }, [orgcontract]);

    const handleClicktoManage = () => {
        props.history.push(`/manage/${id}`)
    }
    const handleClicktoAbout = () => {
        props.history.push(`/about/${id}`)
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
                            <ul className="org">
                                <li>
                                    <h6>Moderators</h6>
                                    <div className='orgbg'>

                                        {
                                            list.map((i, index) => <dl key={`moderator_${index}`}>
                                                <dt>{i[1]}</dt>
                                                <dd><a href="#" target='_blank'>{i[0]}</a></dd>
                                            </dl>)
                                        }
                                    </div>
                                </li>
                                <li>
                                    <h6>Members</h6>
                                    <div className='orgbg'>
                                        {
                                            memberlist.map((i, index) => <dl key={`member_${index}`}>
                                                <dt>{i[1]}</dt>
                                                <dd><a href="#" target='_blank'>{i[0]}</a></dd>
                                            </dl>)
                                        }
                                    </div>
                                </li>
                                <li className='brdr'>
                                    <Button variant="outline-primary" onClick={handleClicktoAbout}>Back</Button>
                                    <Button variant="primary" onClick={handleClicktoManage}>Manage</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )

}

