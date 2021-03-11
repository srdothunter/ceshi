import React, { useEffect, useState} from 'react';
// import PageComponent from '../pageComponent.jsx';
import {Table} from "react-bootstrap";
import VoteModalTips from "./votemodalTips";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";

export default function VotePending(props) {
    const {state} = useSubstrate();
    const {votecontract} = state;

    // const [indexList, setIndexList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [list, setList] = useState([]);
    const [selectid, setselectid] = useState('');
    const [toTop, settoTop] = useState(false);
    // const [totalNum, setTotalNum] = useState(0);
    // const [totalData, setTotalData] = useState({});
    // const [current, setCurrent] = useState(1);
    // const [pageSize, setPageSize] = useState(5);
    // const [totalPage, setTotalPage] = useState(0);


    useEffect(() => {
        if(props.list.length){
            setList(props.list)
        }
        // let totalNum = 52;
        // setTotalData({})
        // setTotalNum(totalNum)
        //
        // let totalPage = Math.ceil(totalNum / pageSize);
        // setTotalPage(totalPage)
        // pageClick(1);

    }, [props]);
    useEffect(() => {
        if(toTop){
            props.history.push(`/vote`)
        }

    }, [toTop]);




    // const handleClicktoVoteview = (voteid) => {
    //     let { id } = this.props;
    //     this.props.history.push(`/voteOverview/${id}/${voteid}`)
    // }
    // const pageClick = (pageNum) => {
    //     if (pageNum !== this.state.current) {
    //         // this.state.current = pageNum
    //         this.setState({current: pageNum}, () => {
    //             console.log("====", this.state.current)
    //         })
    //     }

        // _this.state.indexList = [];//清空之前的数据
        // for (var i = (pageNum - 1) * _this.state.pageSize; i < _this.state.pageSize * pageNum; i++) {
        //     if (_this.state.totalData.array[i]) {
        //         _this.state.indexList.push(_this.state.totalData.array[i])
        //     }
        // }
        // _this.setState({indexList: _this.state.indexList})
        // console.log(_this.state.indexList)
    // }
    const triggerConfirm = (id)=>{
        setselectid(id);
        setShowModal(true)
    }
    const handleClose = () => {
        setShowModal(false);
        setselectid('')
    }
    const handleConfirm = async (e) => {
        setShowModal(false);
        console.log(selectid)

        await api.vote.executeVote(votecontract,selectid,(data)=>{
            settoTop(data)
        }).then(data => {
            if (!data) return;
            console.log("=============executeVote",data)

        });
    }
    // const goNext = () => {
    //     let cur = this.state.current;
    //     if (cur < this.state.totalPage) {
    //         this.pageClick(cur + 1);
    //     }
    // }
    // const goPrevClick = () => {
    //     let cur = this.state.current;
    //     if (cur > 1) {
    //         this.pageClick(cur - 1);
    //     }
    // }



    return (<div>
            <VoteModalTips
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                showTips={showModal}/>
            <Table striped bordered hover>
                <tbody>
                {
                    list.map((item)=><tr key={`Pending_${item.vote_id}`}>
                        <td>{item.vote_id}</td>
                        <td>{item.title}</td>
                        {/*<td>Pending</td>*/}
                        <td><span onClick={()=>triggerConfirm(item.vote_id)}><i className="fa fa-toggle-on"/> trigger</span></td>
                    </tr>)
                }
                </tbody>
            </Table>
            {/*<PageComponent total={this.state.totalNum}*/}
            {/*               current={this.state.current}*/}
            {/*               totalPage={this.state.totalPage}*/}
            {/*               pageClick={this.pageClick.bind(this)}*/}
            {/*               goPrev={this.goPrevClick.bind(this)}*/}
            {/*               goNext={this.goNext.bind(this)}*/}
            {/*/>*/}
        </div>)


}

