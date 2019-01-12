import React, { Component } from 'react';
import { Flex, WhiteSpace, Picker, InputItem, List, Toast, Button } from 'antd-mobile';

import { VOTE_OPTIONS } from "../constants";

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
                >票选最佳</div>
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
                            <WhiteSpace size="md"/>
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
                            <WhiteSpace size="md"/>
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

