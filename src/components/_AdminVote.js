import React, { Component } from 'react';
import { Flex, Button } from 'antd-mobile';
import {
  Chart,
  Geom,
  Axis,
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
        vote_stat: []
    };
    onRefreshClick = () => {
        socket.emit('get vote stat', (data) => {
            delete data['0'];
            let vote_stat = [];
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    vote_stat.push({
                        group: ID2GROUP[parseInt(key)],
                        votes: data[key]
                    })
                }
            }
            this.setState({
                vote_stat
            })
        })
    };
    render() {
        let btn_div_style = {
            textAlign: 'center',
            width: '30%',
            margin: '0 auto',
        };
        return (
            <div className="flex-container">
                <div className="pc-sub-title"/>
                    <Flex>
                        <Flex.Item>
                            <div style={{ width: '60%', margin: '0 auto' }}>
                                <Chart
                                    height={window.innerHeight*0.8}
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
                                        size={60}
                                        shape={[
                                            "group",
                                            function (group) {
                                                return ["image", imageMap[group]]
                                            }
                                        ]}
                                    />
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
