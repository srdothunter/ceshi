import React, {Component} from 'react';
import ModalTips from "./modalTips";
import {Button, Form, FormControl, Table} from "react-bootstrap";

class ManageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            chooseAll: false,
            showModal: false,
            showAdd: false,
            showAddMember: false,
            form:{
                name:'',
                address:'',
            }
        };
    }
   handleInputChange = (e) => {
        const {name, value} = e.target;
        // let str = `set${name}`
        // eval(str)(value)

       const {form} = this.state;
       form[name] = value;
       this.setState({form})
    }
    render() {
        // const {list, listname, chooseAll, isChecked, isAllChecked, type, handleClicktoview, showModal, handleClose, showAdd, addModerators,delConfirm,handleSubmit} = this.props;

        const {list, type, handleClicktoview, showModal, handleClose, showAdd, addModerators,handleSubmit} = this.props;
        const{form} = this.state;
        return (<div>

            <ModalTips handleClose={handleClose} showTips={showModal}/>
            <div className='operationBar'>
                {/*<span onClick={delConfirm}>*/}
                {/*  <i className='fa fa-trash'/> remove*/}
                {/*</span>*/}
                <span onClick={addModerators}>
                    <i className='fa fa-plus-circle'/> add
                </span>
            </div>
            {
                showAdd && <div className='addBtn'>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <FormControl
                            placeholder="Please fill the name."
                            name='name'
                            onChange={this.handleInputChange}
                        />
                        <Form.Control as="textarea" rows={3}
                                      placeholder="Please fill the address"
                                      name='address'
                                      onChange={this.handleInputChange}
                        />
                        <Button variant="primary"  onClick={()=>handleSubmit(form)}>
                            Add
                        </Button>
                    </Form.Group>
                </div>
            }

            <Table striped bordered hover>
                <tbody>
                {/*<tr>*/}
                {/*    <th><Form.Check type='checkbox'  value={chooseAll}*/}
                {/*                    checked={chooseAll}*/}
                {/*                    id={type}*/}
                {/*                    data-list={listname}*/}
                {/*                    onChange={e => isAllChecked(e, type)}/></th>*/}
                {/*    <th>Name</th>*/}
                {/*    <th>Address</th>*/}
                {/*    <th>Operation</th>*/}
                {/*</tr>*/}
                {
                    list.map((item,index) => (
                            <tr key={`${type}_${index}`}>
                                {/*<td>*/}
                                {/*    <Form.Check type='checkbox' value={item.checked}*/}
                                {/*                checked={item.checked}*/}
                                {/*                data-type={type}*/}
                                {/*                data-list={listname}*/}
                                {/*                onChange={e => isChecked(e, item)}/>*/}
                                {/*</td>*/}
                                <td>{item[1]}</td>
                                <td>{item[0]}</td>
                                <td>
                                    <span className='hand nowrap' onClick={()=>handleClicktoview(item,type)}><i
                                        className="fa fa-trash"/> remove</span>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </Table>
        </div>);
    }
}

export default ManageItem;
