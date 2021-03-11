import React, {useEffect, useState} from 'react';
// import PageComponent from '../pageComponent.jsx';
import {Table} from "react-bootstrap";

export default function VoteActive(props){

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


    const handleView = (voteid) => {
            const{id} = props;
            props.history.push(`/voteView/${id}/${voteid}`)
        }

    // const pageClick = (pageNum) => {
    //     if (pageNum !== current) {
    //         setCurrent(pageNum)
    //     }
    //
    // }
    // const goNext = () => {
    //
    //     if (current < totalPage) {
    //         pageClick(current + 1);
    //     }
    // }
    //
    // const goPrevClick = () => {
    //     if (current > 1) {
    //        pageClick(current - 1);
    //     }
    // }

        return (
            <div>
                <Table striped bordered hover>
                    <tbody>
                    {
                        indexList.map((item)=><tr key={`active_${item.vote_id}`}>
                            <td>{item.vote_id}</td>
                            <td>{item.title}</td>
                            <td><span onClick={()=>handleView(item.vote_id)}><i className="fa fa-sign-in"/> view</span></td>
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
