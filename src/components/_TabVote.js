import React, { Component } from 'react';
import { Flex, WhiteSpace, Picker, InputItem, List, Toast, Button } from 'antd-mobile';

import { VOTE_OPTIONS, GROUP2ID, GROUPS } from "../constants";
const { EMPTY } = GROUPS;

import socket from '../socketio';

const rules = [
    '① 每位同学有2张选票',
    '② 每张选票需要投给不同的组',
    '③ 截止投票前都可以随时改票',
    '④ 获胜组中抽取1位得到升级卷',
    '⑤ 投给获胜组中抽取2位得到升级卷',
    '⑥ 凭升级卷可以换取C位奖AirPods'
];

class TabVoteComponent extends Component {
    state = {
        hasError: sessionStorage.getItem('current_qa') === null,
        qaCode: sessionStorage.getItem('current_qa') === null ? '' : sessionStorage.getItem('current_qa'),
        vote1: sessionStorage.getItem('ex_vote1') === null ? [] : [sessionStorage.getItem('ex_vote1')],
        vote2: sessionStorage.getItem('ex_vote2') === null ? [] : [sessionStorage.getItem('ex_vote2')],
        tips: false
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
        let nianhuiid = this.state.qaCode;
        let _vote1_name = this.state.vote1.length > 0 ? this.state.vote1[0] : EMPTY;
        let _vote2_name = this.state.vote2.length > 0 ? this.state.vote2[0] : EMPTY;
        let vote1 = GROUP2ID[_vote1_name];
        let vote2 = GROUP2ID[_vote2_name];

        if (vote1 === 0 || vote2 === 0) {
            Toast.info(`亲两张票都要投哈`, 2)
        } else if (vote1 === vote2) {
            Toast.fail(`不能都投同一组哈`, 2)
        } else {
            socket.emit('send vote', {nianhuiid, vote1, vote2}, (data) => {
                if (data === 0) {
                    Toast.success(`投票成功`, 1);

                    this.setState({
                        ex_vote1: _vote1_name,
                        ex_vote2: _vote2_name
                    });
                    sessionStorage.setItem('ex_vote1', _vote1_name);
                    sessionStorage.setItem('ex_vote2', _vote2_name);
                } else if (data === 1) {
                    Toast.fail(`亲~现在不能投票`, 2)
                } else if (data === 2) {
                    Toast.fail(`亲~标识码非法`, 2)
                } else {
                    console.log(data);
                }
            })
        }
    };
    onRuleClick = () => this.setState({
        tips: !this.state.tips
    });
    render() {
        let rules_div = rules.map((r,i) => (
            <div key={i} style={{
                marginTop: '10px',
                marginBottom: '10px'
            }}>
                {r}
            </div>
        ));
        return (
            <div>
                <div
                    style={{
                        fontWeight: 'bold',
                        fontSize: '7vw',
                        padding: "30px 0 18px 15px",
                        height: screen.height*0.6,
                        backgroundImage: 'url(http://foojamfung.top/img/chart.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '10% 40%',
                    }}
                >
                    票选最佳
                    <img src={`http://foojamfung.top/img/question.svg`} style={{ height: '6vw', verticalAlign: 'middle', marginLeft: '5px', marginBottom: '5px' }} onClick={this.onRuleClick}/>
                    {
                        this.state.tips && (
                            <div style={{
                                fontSize: '17px',
                                fontWeight: 'normal',
                                color: 'red'
                            }}>
                                {rules_div}
                            </div>
                        )
                    }
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
                            <List>
                                <Picker
                                    data={VOTE_OPTIONS}
                                    value={this.state.vote1}
                                    cols={1}
                                    onChange={this.onChangeVote1}
                                >
                                    <List.Item arrow="horizontal">第一票</List.Item>
                                </Picker>
                            </List>
                            <List>
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

export default TabVoteComponent

