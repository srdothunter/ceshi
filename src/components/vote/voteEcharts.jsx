import React, {Component} from 'react';

import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

class VoteEcharts extends Component {
    initEchart() {
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}:  ({d}%)"
            },
            legend: {
                show: true,
                orient: 'vertical',
                x: 'right',
                icon: 'circle',
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        formatter: '{b}:{c}\n\r({d}%)',
                        position: 'left'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: this.props.optionlist
                }
            ]
        }, true);
    }

    componentDidMount() {

        if(this.props.optionlist.length){
            this.initEchart()
        }

    }

    render() {
        return (
            <div id="main"/>
        );
    }
}

export default VoteEcharts;
