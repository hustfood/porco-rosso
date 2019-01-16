import React, { Component } from 'react';
import { Flex, Button, Toast } from 'antd-mobile';
import {
    Chart,
    Geom,
    Axis,
    Label,
    Tooltip,
} from "bizcharts";

import { ID2GROUP } from "../constants";

import socket from '../socketio';

const cols = {
    votes: {
        min: 0
    }
};

const imageMap = {
    'EROS': "http://foojamfung.top/img/pig_e.png",
    'GAIA': "http://foojamfung.top/img/pig_g.png",
    'TITAN': "http://foojamfung.top/img/pig_t.png",
    'MOCO': "http://foojamfung.top/img/pig_m.png",
    'FM&MAKI': "http://foojamfung.top/img/pig_f.png"
};

const colorMap = {
    'EROS': "#FF3300",
    'GAIA': "#FFC000",
    'TITAN': "#99CCFF",
    'MOCO': "#99CC00",
    'FM&MAKI': "#9966CC"
};

class AdminVoteComponent extends Component {
    state = {
        vote_stat: [],
        diff_stat: {}
    };
    onRefreshClick = () => {
        socket.emit('get vote stat', (data) => {
            if (Object.keys(data).length === 0) {
                Toast.fail('返回结果异常', 1)
            } else {
                let now_data = data['now'];
                let ex_data = data['ex'];

                delete now_data['0'];
                let vote_stat = [];
                for (let key in now_data) {
                    if (now_data.hasOwnProperty(key)) {
                        vote_stat.push({
                            group: ID2GROUP[parseInt(key)],
                            votes: now_data[key]
                        })
                    }
                }
                this.setState({
                    vote_stat
                });

                if (ex_data !== null) {
                    delete ex_data['0'];
                    let diff_stat = {};
                    for (let key in ex_data) {
                        if (ex_data.hasOwnProperty(key)) {
                            let diff_num = now_data[key]-ex_data[key];
                            let diff_str = '';
                            if (diff_num >= 0) {
                                diff_str = "+" + diff_num.toString()
                            } else {
                                diff_str = diff_num.toString();
                            }
                            diff_stat[ID2GROUP[parseInt(key)]] = diff_str
                        }
                    }
                    this.setState({
                        diff_stat
                    });
                }
            }
        })
    };
    render() {
        let btn_div_style = {
            textAlign: 'center',
            width: '30%',
            margin: '0 auto',
        };
        return (
            <div className="barrage-flex-container">
                <Flex>
                    <Flex.Item>
                        <div style={{ width: '70%', margin: '0 auto' }}>
                            <Chart
                                height={window.innerHeight*0.8}
                                padding={['30%', '10%', '5%', '10%']}
                                data={this.state.vote_stat}
                                placeholder
                                scale={cols}
                                forceFit
                            >
                                <Axis name="group" />
                                <Axis name="votes" />
                                <Tooltip
                                    crosshairs={{
                                        type: "y"
                                    }}
                                />
                                <Geom
                                    type="interval"
                                    position="group*votes"
                                    color={['group', (group)=>(colorMap[group])]}
                                />
                                <Geom
                                    type="point"
                                    position="group*votes"
                                    size={50}
                                    shape={[
                                        "group",
                                        function (group) {
                                            return ["image", imageMap[group]]
                                        }
                                    ]}
                                >
                                    <Label
                                        content="votes"
                                        offset={100}
                                        textStyle={{
                                            fontSize: 16
                                        }}
                                        htmlTemplate={(text, item, index) => {
                                            let point = item.point; // 每个弧度对应的点
                                            // 自定义 html 模板
                                            return '<span style="display:inline-block;font-weight:bold;font-size:30px;color:' +
                                                colorMap[point['group']] + '">' + item.point['group'] +
                                                '</span><br><span style="font-weight:bold;font-size:30px">' +
                                                (Object.keys(this.state.diff_stat).length === 5 ? this.state.diff_stat[point['group']] : '') +
                                                '</span>';
                                        }}
                                    />
                                </Geom>
                            </Chart>
                        </div>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <div style={btn_div_style}>
                            <Button type="ghost" icon={<img src="http://foojamfung.top/img/refresh.svg" alt="" />} onClick={this.onRefreshClick}>刷新</Button>
                        </div>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}

export default AdminVoteComponent
