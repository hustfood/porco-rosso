import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
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
    sales: {
        tickInterval: 20
    }
};

class AdminVoteComponent extends Component {
    state = {
    };
    render() {
        return (
            <div className="flex-container">
                <div className="pc-sub-title"/>
                    <Flex>
                        <Flex.Item>
                            <div style={{ width: '60%', margin: '0 auto' }}>
                                <Chart height={window.innerHeight*0.6} data={test_data} scale={cols} forceFit>
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
                                </Chart>
                            </div>
                        </Flex.Item>
                    </Flex>
            </div>
        )
    }
}

export default AdminVoteComponent
