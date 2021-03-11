import React, {Component} from 'react';
import {Pagination} from "react-bootstrap";

class PageComponent extends Component {
    render() {
        let {totalPage, current, goPrev, goNext, pageClick} = this.props;
        let pageNum = [];
        let begin;
        let len;
        if (totalPage > 5) {
            len = 5;
            if (current >= (totalPage - 2)) {
                begin = totalPage - 4;
            } else if (current <= 3) {
                begin = 1;
            } else {
                begin = current - 2;
            }
        } else {
            len = totalPage;
            begin = 1;
        }
        for (let i = 0; i < len; i++) {
            let showI = begin + i;
            if (current === showI) {
                pageNum.push({num: showI, current: true});
            } else {
                pageNum.push({num: showI, current: false});
            }
        }
        return (
            <div>
                <Pagination>
                    <Pagination.Prev onClick={goPrev} disabled={current === 1}/>
                    {
                        current > 3 && <Pagination.Item onClick={pageClick.bind(this, 1)}>{1}</Pagination.Item>

                    }
                    {
                        current > 3 && <Pagination.Ellipsis/>
                    }
                    {
                        pageNum.map((curPageNum) => {
                                return (<Pagination.Item key={`vote_${curPageNum.num}`}
                                                         onClick={pageClick.bind(this, curPageNum.num)}
                                                         active={curPageNum.current ? 'active' : ''}>{curPageNum.num}</Pagination.Item>)
                            }
                        )
                    }
                    {
                        current < totalPage - 2 && <Pagination.Ellipsis/>
                    }
                    {
                        current < totalPage - 2 &&
                        <Pagination.Item onClick={pageClick.bind(this, totalPage)}>{totalPage}</Pagination.Item>
                    }

                    <Pagination.Next onClick={goNext} disabled={current === totalPage}/>
                </Pagination>
            </div>
        )
    }
}

export default PageComponent;
