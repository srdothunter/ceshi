import React, {useEffect, useState} from 'react';
// import PageComponent from '../pageComponent.jsx';
import { Table} from "react-bootstrap";

export default function VotePagination(props){
    const [indexList, setIndexList] = useState([]);
    // const [totalNum, setTotalNum] = useState(0);
    // const [totalData, setTotalData] = useState({});
    // const [current, setCurrent] = useState(1);
    // const [pageSize, setPageSize] = useState(5);
    // const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {

        if(props.list.length){
            setIndexList(props.list)
        }

        // let totalNum = 52;
        // setTotalData({})
        // setTotalNum(totalNum)
        //
        // let totalPage = Math.ceil(totalNum / pageSize);
        // setTotalPage(totalPage)
        // pageClick(1);


    }, [props]);
    const handleClicktoVoteview = (voteid) => {
        let { id } = props;
        props.history.push(`/voteOverview/${id}/${voteid}`)
    }
    // const pageClick = (pageNum) => {
    //     if (pageNum !== this.state.current) {
    //         // this.state.current = pageNum
    //         this.setState({current: pageNum}, () => {
    //             console.log("====", this.state.current)
    //         })
    //     }
    //
    //     // _this.state.indexList = [];//清空之前的数据
    //     // for (var i = (pageNum - 1) * _this.state.pageSize; i < _this.state.pageSize * pageNum; i++) {
    //     //     if (_this.state.totalData.array[i]) {
    //     //         _this.state.indexList.push(_this.state.totalData.array[i])
    //     //     }
    //     // }
    //     // _this.setState({indexList: _this.state.indexList})
    //     // console.log(_this.state.indexList)
    // }
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



        return (
            <div>
                <Table striped bordered hover>
                    <tbody>
                    {
                        indexList.map((item)=><tr key={`history_${item.vote_id}`}>
                            <td>{item.vote_id}</td>
                            <td>{item.title}</td>
                            {/*<td>*/}
                            {/*    <div><Badge variant="primary"><i className="fa fa-times-circle"/> Failed</Badge></div>*/}
                            {/*</td>*/}
                            <td><span onClick={()=>handleClicktoVoteview(item.vote_id)}><i className="fa fa-sign-in" /> view</span></td>
                        </tr>)
                    }
                    </tbody>
                </Table>
                {/*<PageComponent total={totalNum}*/}
                {/*               current={current}*/}
                {/*               totalPage={totalPage}*/}
                {/*               pageClick={pageClick.bind(this)}*/}
                {/*               goPrev={goPrevClick.bind(this)}*/}
                {/*               goNext={goNext.bind(this)}*/}
                {/*/>*/}
            </div>
        )


}


