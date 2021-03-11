import React, {Component} from 'react';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";

class ThirdStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                admin: true,
                token: true,
                name: '',
                symbol: '',
                supply: '',
                adminlist: [
                    {
                        name: '',
                        address: ''
                    }
                ],
                tokenlist: [
                    {
                        address: '',
                        token: ''
                    }
                ]
            }

        };
    }

    toForthStep = () => {
        this.props.handlerSet(4);
        sessionStorage.setItem('thirdStep',JSON.stringify(this.state.form))
    }

    toSecondStep = () => {
        this.props.handlerSet(2)
    }

    addtoken = () => {
        let {tokenlist} = this.state.form;
        let newArray = [...tokenlist];
        newArray.push({
            address: '',
            token: ''

        });
        this.setState((prevState) => {
            const form = {
                ...prevState.form,
                tokenlist : newArray
            };
            return {
                form
            };
        });
    }
    addAdmin = () => {
        let {adminlist} = this.state.form;
        let newArray = [...adminlist];
        newArray.push({
            name: '',
            address: ''

        });
        this.setState((prevState) => {
            const form = {
                ...prevState.form,
                adminlist : newArray
            };
            return {
                form
            };
        });
    }
    setAddress = (e, index) => {
        let {tokenlist} = this.state.form;
        const {name, value} = e.target;
        tokenlist[index][name] = value;
        this.setState((prevState) => {
            const form = {
                ...prevState.form,
                tokenlist
            };
            return {
                form
            };
        });
    }
    setAdmin = (e, index) => {
        let {adminlist} = this.state.form;
        const {name, value} = e.target;
        adminlist[index][name] = value;
        this.setState((prevState) => {
            const form = {
                ...prevState.form,
                adminlist
            };
            return {
                form
            };
        });
    }

    removeToken(selectItem, index) {
        let {tokenlist} = this.state.form;
        tokenlist.splice(index, 1);

        this.setState((prevState) => {
            const form = {
                ...prevState.form,
                tokenlist
            };
            return {
                form
            };
        });
    }
    removeAdmin(selectItem, index) {
        let {adminlist} = this.state.form;
        adminlist.splice(index, 1);

        this.setState((prevState) => {
            const form = {
                ...prevState.form,
                adminlist
            };
            return {
                form
            };
        });
    }

    handleInput = (e) => {
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

    handleCheck = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => {
            const form = {
                ...prevState.form,
                [name]: !(value !== "false")
            };
            return {
                form
            };

        });
    }
    componentDidMount() {
        let form = JSON.parse(sessionStorage.getItem('thirdStep'));
        if(form){
            this.setState({form})
        }
    }

    render() {
        let { form:{admin, token, name, symbol,supply,tokenlist,adminlist}} = this.state;
        return <ul>
            <li>
                <div className='steptitle'>
                    DAO Admin
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="DAO Admin"
                            value={admin}
                            checked={admin}
                            name='admin'
                            onChange={this.handleCheck}
                        />
                    </Form.Group>
                </div>
                <div>
                    {adminlist.map((i, index) => (

                        <div key={index}>
                            <div className="row">
                                <div className="col-4">
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Fill the name"
                                            value={adminlist[index].name}
                                            name='name'
                                            onChange={(event) => this.setAdmin(event, index)}
                                        />
                                    </InputGroup>
                                </div>
                                <div className="col-7">
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Fill the address"
                                            value={adminlist[index].address}
                                            name='address'
                                            onChange={(event) => this.setAdmin(event, index)}
                                        />
                                    </InputGroup>
                                </div>
                                <div className="col-1">
                                    {
                                        !!index &&
                                        <i className="fa fa-close remove" onClick={this.removeAdmin.bind(this, i, index)}/>
                                    }

                                </div>
                            </div>
                        </div>
                    ))
                    }
                    <div>
                        <Button variant="light" onClick={this.addAdmin}><i className="fa fa-plus"/> Add Admin</Button>
                    </div>
                </div>
            </li>

            <li>
                <div className='steptitle'>
                    Token
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Token"
                            value={token}
                            checked={token}
                            name='token'
                            onChange={this.handleCheck}
                        />
                    </Form.Group>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Fill the name"
                            value={name}
                            checked={name}
                            name='name'
                            onChange={this.handleInput}
                        />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Fill the symbol"
                            value={symbol}
                            checked={symbol}
                            name='symbol'
                            onChange={this.handleInput}
                        />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Fill the total supply"
                            value={supply}
                            checked={supply}
                            name='supply'
                            onChange={this.handleInput}
                        />
                    </InputGroup>
                </div>
                {tokenlist.map((i, index) => (

                    <div key={index}>
                        <div className="row">
                            <div className="col-7">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Fill the address"
                                        value={tokenlist[index].address}
                                        name='address'
                                        onChange={(event) => this.setAddress(event, index)}
                                    />
                                </InputGroup>
                            </div>
                            <div className="col-4">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Fill the token"
                                        value={tokenlist[index].token}
                                        name='token'
                                        onChange={(event) => this.setAddress(event, index)}
                                    />
                                </InputGroup>
                            </div>
                            <div className="col-1">
                                {
                                    !!index &&
                                    <i className="fa fa-close remove" onClick={this.removeToken.bind(this, i, index)}/>
                                }
                                {/*<i className="fa fa-close remove" onClick={this.removeToken.bind(this, i, index)}/>*/}

                            </div>
                        </div>
                    </div>
                ))
                }

                <div>
                    <Button variant="light" onClick={this.addtoken}><i className="fa fa-plus"/> Add Token</Button>
                </div>

            </li>

            <li className='brdr'>
                <Button variant="outline-primary" className='leftBtn' onClick={this.toSecondStep}>Let me think~</Button>
                <Button variant="primary" onClick={this.toForthStep}>Create it anyway !</Button>
            </li>
        </ul>;
    }
}

export default ThirdStep;
