import React, { Component } from 'react';
import { Flex, Button } from 'antd-mobile';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";

const test_data = [
    {
        group: 'EROS',
        votes: 38
    },
    {
        group: 'GAIA',
        votes: 52
    },
    {
        group: 'TITAN',
        votes: 61
    },
    {
        group: 'MOCO',
        votes: 145
    },
    {
        group: 'FM&MAKI',
        votes: 48
    },
];

const cols = {
    votes: {
        tickInterval: 20
    }
};

const imageMap = {
    'EROS': "http://foojamfung.top/img/pig_e.png",
    'GAIA': "http://foojamfung.top/img/pig_g.png",
    'TITAN': "http://foojamfung.top/img/pig_t.png",
    'MOCO': "http://foojamfung.top/img/pig_m.png",
    'FM&MAKI': "http://foojamfung.top/img/pig_f.png"
};

class AdminVoteComponent extends Component {
    state = {
    };
    onClick = () => {

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
                                    data={test_data}
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
                                        color={['group', ['#FF3300', '#FFC000', '#99CCFF', '#99CC00', '#9966CC']]}
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
                                <Button type="ghost" icon={<img src="http://foojamfung.top/img/refresh.svg" alt="" />} onClick={this.onClick}>刷新</Button>
                            </div>
                        </Flex.Item>
                    </Flex>
            </div>
        )
    }
}

export default AdminVoteComponent
