import React, { Component } from 'react';
import { Flex, WhiteSpace, Picker, InputItem, List, Toast, Button } from 'antd-mobile';
import { Chart, Axis, Geom, Tooltip } from 'bizgoblin';

import { VOTE_OPTIONS } from "../constants";

const data = [
  {
    group: 'EROS',
    sales: 38,
  }, {
    group: 'GAIA',
    sales: 52,
  }, {
    group: 'TITAN',
    sales: 61,
  }, {
    group: 'MOCO',
    sales: 145,
  }, {
    group: 'FM&MAKI',
    sales: 48,
  }
];

const defs = [{
  dataKey: 'group',
}, {
  dataKey: 'sales',
  tickCount: 5,
}];

function onShowTooltip(ev) {
  const items = ev.items;
  items[0].name = null;
  items[0].name = items[0].title;
  items[0].value = `¥ ${items[0].value}`;
}

class TabVoteComponent extends Component {
    state = {
        hasError: sessionStorage.getItem('current_qa') === null,
        qaCode: sessionStorage.getItem('current_qa') === null ? '' : sessionStorage.getItem('current_qa'),
        vote1: [],
        vote2: [],
        ex_vote1: sessionStorage.getItem('ex_vote1') === null ? '' : sessionStorage.getItem('ex_vote1'),
        ex_vote2: sessionStorage.getItem('ex_vote2') === null ? '' : sessionStorage.getItem('ex_vote2')
    };
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入8~9位数字的标识码', 1);
        }
    };
    onChange = (qaCode) => {
        if (qaCode.replace(/\s/g, '').length < 8 || qaCode.replace(/\s/g, '').length > 9) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
            sessionStorage.setItem('current_qa', qaCode);
        }
        this.setState({
            qaCode,
        });
    };
    onChangeVote1 = (vote1) => {
        this.setState({
            vote1
        });
    };
    onChangeVote2 = (vote2) => {
        this.setState({
            vote2
        });
    };
    handleClick = () => {
        console.log(this.state.qaCode);

        let now_vote1 = this.state.vote1;
        let now_vote2 = this.state.vote2;
        if (now_vote1.length>0) {
            sessionStorage.setItem('ex_vote1', this.state.vote1[0]);
        }
        if (now_vote2.length>0) {
            sessionStorage.setItem('ex_vote2', this.state.vote2[0]);
        }
    };
    render() {
        let chart_height = screen.height * 0.35;
        return (
            <div>
                <div className="flex-container">
                    <div className="sub-title">票选最佳</div>
                    <Flex>
                        <Flex.Item>
                            <Chart
                                width="100%"
                                height={chart_height}
                                data={data}
                                defs={defs}
                                animate={{ type: 'scaley' }}
                                pixelRatio={window.devicePixelRatio*2}
                            >
                                            <Axis dataKey="group" label={{ fontSize: '10px' }} />
                                            <Axis dataKey="sales"/>
                                            <Tooltip showItemMarker={false} onShow={onShowTooltip} />
                                            <Geom
                                                geom="interval"
                                                position="group*sales"
                                                color={['group', ['#FF3300', '#FFC000', '#99CCFF', '#99CC00', '#9966CC']]}
                                            />
                            </Chart>
                        </Flex.Item>
                    </Flex>
                </div>
                <div className="barrage-flex-container">
                    <Flex>
                        <Flex.Item>
                            <List>
                                <InputItem
                                    type="number"
                                    placeholder="8~9位数字标识码"
                                    error={this.state.hasError}
                                    onErrorClick={this.onErrorClick}
                                    onChange={this.onChange}
                                    value={this.state.qaCode}
                                >
                                    <div style={{ backgroundImage: 'url(http://foojamfung.top/img/qa.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
                                </InputItem>
                            </List>
                            <List renderHeader={()=>this.state.ex_vote1} style={{ textAlign: 'right' }}>
                                <Picker
                                    data={VOTE_OPTIONS}
                                    value={this.state.vote1}
                                    cols={1}
                                    onChange={this.onChangeVote1}
                                >
                                    <List.Item arrow="horizontal">第一票</List.Item>
                                </Picker>
                            </List>
                            <List renderHeader={()=>this.state.ex_vote2} style={{ textAlign: 'right' }}>
                                <Picker
                                    data={VOTE_OPTIONS}
                                    value={this.state.vote2}
                                    cols={1}
                                    onChange={this.onChangeVote2}
                                >
                                    <List.Item arrow="horizontal">第二票</List.Item>
                                </Picker>
                            </List>
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace size="lg"/>
                    <Flex>
                        <Flex.Item>
                            <Button type="ghost" icon="check-circle-o" onClick={this.handleClick}>投票</Button>
                        </Flex.Item>
                    </Flex>
                </div>
            </div>
        )
   }
}

export default TabVoteComponent;

