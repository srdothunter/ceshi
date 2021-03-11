import React, { useEffect, useState} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
// import Datetime from 'react-datetime';
import PageBackground from "../pagebackground";

// import moment from 'moment';
import {useSubstrate} from "../../api/contracts";
import api from "../../api";

import Loading from "../loading/Loading";

// var yesterday = moment().subtract(1, 'day');
// var valid = function (current) {
//     return current.isAfter(yesterday);
// };
//
// let inputProps = {
//     placeholder: 'Please select end time',
//     // disabled:true
// };

export default function NewVote(props) {
    // this.datetimeRef = createRef();

    const {state} = useSubstrate();
    const {votecontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [date, setdate] = useState('');
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [id, setId] = useState(null);
    const [supportInput, setsupportInput] = useState('');
    const [min, setmin] = useState('');
    const [logo, setLogo] = useState('');

    const [optionlist, setoptionlist] = useState( ['','','']);
    useEffect(() => {
        setId(props.match.params.id);
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);

    }, []);

    const handleClicktoVote = async () => {
        setLoading(true);
        setTips('Create a new vote');
        let dataobj = {
            title,
            desc,
            vote_time:date,
            support_require_num:supportInput,
            min_require_num:min,
            choices:optionlist.join(',')
        }
        await api.vote.newVote(votecontract,dataobj,(result)=> {
            setLoading(false);
            if(result){
                props.history.push(`/vote/${id}`)
            }
        });
    }

    const removeOption =(selectItem, index) => {
        let arr = optionlist;
        arr.splice(index, 1);
        setoptionlist([...arr])

    }

    const addOption = () => {
        let newArray = [...optionlist];
        newArray.push('');
        setoptionlist(newArray)
    }
    const setAddress = (e, index) => {

        let arr = optionlist;

        arr[index] = e.target.value;
        setoptionlist([...arr])
    }

    // const handleChange = (value) => {
    //     setdate(value._d)
    // }
    // const renderInput = (itemprops, openCalendar, closeCalendar) => {
    //     function clear() {
    //         console.log(itemprops.value)
    //         itemprops.onChange({target: {value: ''}});
    //     }
    //
    //     return (
    //         <div>
    //             <input {...itemprops} />
    //             <button className="selectedCal" onClick={openCalendar} />
    //             {
    //                 itemprops.value.length !== 0 &&
    //                 <div className='removeDate' onClick={clear}><i className='fa fa-close' /></div>
    //             }
    //
    //         </div>
    //     );
    // }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        let str = `set${name}`
        eval(str)(value)
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
                                <li>
                                    <div>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill how long the vote durate by seconds"
                                                name='date'
                                                value={date}
                                                onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </div>
                                    {/*<div className='voteBtn'>*/}
                                    {/*    <Datetime*/}
                                    {/*        renderInput={renderInput}*/}
                                    {/*        inputProps={inputProps}*/}
                                    {/*        isValidDate={valid}*/}
                                    {/*        // ref={datetimeRef}*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                </li>
                                <li>
                                    <div>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill the title"
                                                name='title'
                                                value={title}
                                                onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill the minimum support require numbers."
                                                name='supportInput'
                                                value={supportInput}
                                                onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill the minimum voter require numbers."
                                                name='min'
                                                value={min}
                                                onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <InputGroup>
                                            <FormControl as="textarea"
                                                         placeholder="Please fill description"
                                                         name='desc'
                                                         value={desc}
                                                         onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </div>
                                </li>

                                <li>
                                    {optionlist.map((i, index) => (

                                        <div key={index}>
                                            <div className="row">
                                                <div className="col-11">
                                                    <InputGroup className="mb-3">
                                                        <FormControl
                                                            placeholder="fill the option"
                                                            value={optionlist[index]}
                                                            onChange={(event) => setAddress(event, index)}
                                                        />
                                                    </InputGroup>
                                                </div>
                                                <div className="col-1">
                                                    {
                                                        !!index && index!==1 && <i className="fa fa-close remove"
                                                                                        onClick={removeOption.bind(this, i, index)}/>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    }

                                    <div>
                                        <Button variant="light" onClick={addOption}><i
                                            className="fa fa-plus"/> Add Option</Button>
                                    </div>

                                </li>

                                <li className='brdr'>
                                    <Button variant="primary" onClick={handleClicktoVote}>Create</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )

}


