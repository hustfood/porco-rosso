import React, { Component } from 'react';
import { Flex, WhiteSpace, Picker, InputItem, List, Toast, Switch } from 'antd-mobile';

import { VOTE_OPTIONS } from "../constants";

class AddGroupScoreComponent extends Component {
    state = {
        group: [],
        score: 0
    };
    onChangeGroup = (group) => {
        this.setState({
            group
        });
    };
    onChangeScore = (score) => {
        this.setState({
            score
        });
    };
    onBtnClick = () => {
        console.log(this.state.group, this.state.score);
    };
    render() {
        return (
            <div>
                <List renderHeader={()=>'手动增加票数'}>
                    <Picker
                        data={VOTE_OPTIONS}
                        value={this.state.group}
                        cols={1}
                        onChange={this.onChangeGroup}
                    >
                        <List.Item arrow="horizontal">组别</List.Item>
                    </Picker>
                    <InputItem
                        type="number"
                        onChange={this.onChangeScore}
                        value={this.state.score}
                        defaultValue={0}
                    >加分</InputItem>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            onClick={() => this.onBtnClick()}
                        >
                            确定
                        </div>
                    </List.Item>
                </List>
            </div>
        )
    }
}

class SetEnableVoteComponent extends Component {
    state = {
        checked: true
    };
    onSwitchChange = () => {
        this.setState({
            checked: !this.state.checked,
        })
    };
    render() {
        let s = this.state.checked ? '投票开启中' : '投票已关闭';
        return (
            <div>
                <List renderHeader={()=>'设置投票状态'}>
                    <List.Item
                        extra={<Switch
                            checked={this.state.checked}
                            onChange={() => this.onSwitchChange()}
                        />}
                    >{s}</List.Item>
                </List>
            </div>
        )
    }
}

class SetBestGroupComponent extends Component {
    state = {
        group: []
    };
    onChangeGroup = (group) => {
        this.setState({
            group
        });
    };
    onBtnClick = () => {
        console.log(this.state.group);
    };
    render() {
        return (
            <div>
                <List renderHeader={()=>'设置胜利组别'}>
                    <Picker
                        data={VOTE_OPTIONS}
                        value={this.state.group}
                        cols={1}
                        onChange={this.onChangeGroup}
                    >
                        <List.Item arrow="horizontal">组别</List.Item>
                    </Picker>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            onClick={() => this.onBtnClick()}
                        >
                            确定
                        </div>
                    </List.Item>
                </List>
            </div>
        )
    }
}

class AdminOtherComponent extends Component {
    state = {
    };
    render() {
        return (
            <div className="flex-container">
                <div className="pc-sub-title"/>
                    <Flex>
                        <Flex.Item>
                            <div style={{
                                width: '40%',
                                margin: '0 auto'
                            }}>
                                <SetBestGroupComponent/>
                                <WhiteSpace size="lg"/>
                                <SetEnableVoteComponent/>
                                <WhiteSpace size="lg"/>
                                <AddGroupScoreComponent/>
                            </div>
                        </Flex.Item>
                    </Flex>
            </div>
        )
    }
}

export default AdminOtherComponent