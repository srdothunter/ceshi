import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useSubstrate} from '../../api/contracts';
import api from "../../api";
import Loading from "../loading/Loading";

export default function SecondStep(props) {
    const {state} = useSubstrate();
    const {maincontract} = state;

    const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState('');

    let [selected, setselected] = useState([]);
    let [list, setlist] = useState([]);

    const toThirdStep = () => {
        props.handlerSet(3);
        sessionStorage.setItem('secondStep', JSON.stringify(selected))
    }
    const toFirstStep = () => {
        props.handlerSet(1)
    }
    const handleSelect = (e) => {
        let template = list.filter(item => item.id === e.target.value);
        setselected(template)

    }
    useEffect(() => {
        let selected = JSON.parse(sessionStorage.getItem('secondStep'));
        if (selected) {
            setselected(selected)
        }
    }, []);
    useEffect(() => {
        const setlisttemplate = async () => {
            setLoading(true);
            setTips('Initialize the template list');
            await api.main.listTemplates(maincontract).then(data => {
                if (!data) return;
                setlist(data);
                setLoading(false);
            });

        };
        setlisttemplate();
    }, [maincontract]);
    return (
        <div>
            <Loading showLoading={loading} tips={tips}/>
            <ul>
                <li><Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Please choose one template to create your DAO</Form.Label>
                    <Form.Control as="select" onChange={handleSelect} value={selected && selected[0] && selected[0].id}>
                        <option>please select option</option>
                        {
                            list.map(i => (
                                <option key={i.id} value={i.id}>{i.name}</option>
                            ))
                        }
                    </Form.Control>
                </Form.Group></li>

                <li>
                    <div className="templateBrdr">
                        {
                            selected && selected[0] && !!selected[0].components.length && selected[0].components.map(item => (
                                <div key={item[1]}>{item[0]}</div>
                            ))
                        }
                    </div>
                </li>
                <li className='brdr'>
                    <Button variant="outline-primary" className='leftBtn' onClick={toFirstStep}>Let me think~</Button>
                    <Button variant="primary" onClick={toThirdStep}>Go Next</Button>
                </li>
            </ul>
        </div>)
        ;

}
