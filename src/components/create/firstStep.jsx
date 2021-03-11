import React, {Component} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

class FirstStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                name: '',
                // website: '',
                description: ''
            }
        }
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => {
            const form = {
                ...prevState.form,
                [name]: value
            };
            return {
                form
            };
        });
    }

    componentDidMount() {
        const form = JSON.parse(sessionStorage.getItem('firstStep'));
        if(form!=null){
            this.setState({form});
        }
    }

    toSecondStep = () => {
        const {form} = this.state;
        this.props.handlerSet(2);
        sessionStorage.setItem('firstStep', JSON.stringify(form))
    }

    render() {
        let {name,  description} = this.state.form;
        return <ul>
            <li>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="please enter DAO's name"
                        value={name}
                        name='name'
                        onChange={this.handleChange}
                    />
                </InputGroup>
            </li>
            {/*<li>*/}
            {/*    <InputGroup className="mb-3">*/}
            {/*        <FormControl*/}
            {/*            placeholder="Optional.Please fill your DAO's website."*/}
            {/*            value={website}*/}
            {/*            name='website'*/}
            {/*            onChange={this.handleChange}*/}
            {/*        />*/}
            {/*    </InputGroup>*/}
            {/*</li>*/}
            <li>
                <InputGroup>
                    <FormControl as="textarea"
                                 placeholder="Please describe your DAO to let people know it better.Less than 1024 charactars."
                                 value={description}
                                 name='description'
                                 onChange={this.handleChange}
                    />
                </InputGroup>
            </li>
            <li className='brdr'>
                <Link to='/'><Button variant="outline-primary" className='leftBtn'>Maybe
                    Later</Button></Link>
                <Button variant="primary" onClick={this.toSecondStep}>Next</Button>
            </li>
        </ul>;
    }

}

export default FirstStep;
