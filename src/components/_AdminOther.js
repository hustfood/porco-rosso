import React, { Component } from 'react';
import { Flex, WhiteSpace, Picker, Button, List, Toast, Switch, Modal } from 'antd-mobile';

import { VOTE_OPTIONS, GROUP2ID } from "../constants";

import socket from '../socketio';

const game_data = [
    {
        label: 'one',
        value: 1
    },
    {
        label: 'two',
        value: 2
    }
];

const sort_data = [
    VOTE_OPTIONS,
    VOTE_OPTIONS,
    VOTE_OPTIONS,
    VOTE_OPTIONS,
    VOTE_OPTIONS
];

class AddGroupScoreComponent extends Component {
    state = {
        game: [],
        sort: [],
        score: 0
    };
    onChangeGame = (game) => {
        this.setState({
            game
        });
    };
    onChangeSort = (sort) => {
        this.setState({
            sort
        });
    };
    onBtnClick = () => {
        if (!this.state.game.length > 0 || !(this.state.sort.length === 5)) {
            Toast.fail('请设置游戏与排名', 1)
        } else {
            let game = this.state.game[0];
            let name_sort = [...new Set(this.state.sort)];
            if (name_sort.length !== 5) {
                Toast.fail('请正确设置排名', 1)
            } else {
                let sort = new Array(5);
                for (let i=0; i< name_sort.length; i++) {
                    sort[i] = GROUP2ID[name_sort[i]].toString()
                }
                socket.emit('set game sort', {game, sort}, (data) => {
                    if (data === 'ok') {
                        Toast.success(`设置成功`, 1)
                    }
                })
            }
        }
    };
    render() {
        return (
            <div>
                <List renderHeader={()=>'游戏增加票数'}>
                    <Picker
                        data={game_data}
                        value={this.state.game}
                        cols={1}
                        onChange={this.onChangeGame}
                    >
                        <List.Item arrow="horizontal">游戏</List.Item>
                    </Picker>
                    <Picker
                        data={sort_data}
                        value={this.state.sort}
                        cascade={false}
                        cols={1}
                        onChange={this.onChangeSort}
                    >
                        <List.Item arrow="horizontal">排名</List.Item>
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

class SetEnableVoteComponent extends Component {
    state = {
        checked: true
    };
    onSwitchChange = () => {
        let valid = this.state.checked ? 'False': 'True';
        socket.emit('set valid time', valid, (data) => {
            if (data === "ok") {
                this.setState({
                    checked: !this.state.checked,
                });
            }
        })
    };
    componentDidMount() {
        socket.emit('ask valid time', (data) => {
            this.setState({
                checked: data
            });
        });
    }
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

class SetWinGroupComponent extends Component {
    state = {
        group: []
    };
    onChangeGroup = (group) => {
        this.setState({
            group
        });
    };
    onBtnClick = () => {
        if (!this.state.group.length > 0) {
            Toast.fail('请选择目标组', 1)
        } else {
            let win_group = this.state.group[0];
            socket.emit('set win group', GROUP2ID[win_group], (data) => {
                if (data === 'ok') {
                    Toast.success(`[${win_group}]设置成功`, 1)
                }
            })
        }
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

class ResetAllComponent extends Component {
    onBtnClick = () => {
        Modal.alert('危险', '确定重置吗？', [
            {
                text: '取消'
            },
            {
                text: '确定', onPress: () => {
                    socket.emit('reset all', (data) => {
                        if (data === 'ok') {
                            Toast.success(`重置成功`, 1)
                        }
                    })
                }
            }
        ])
    };

    render() {
        return (
            <Button type="warning" onClick={this.onBtnClick}>重置所有数据</Button>
        )
    }
}

class SaveExVoteComponent extends Component {
    onBtnClick = () => {
        Modal.alert('谨慎', '确定保存吗？', [
            {
                text: '取消'
            },
            {
                text: '确定', onPress: () => {
                    alert('todo')
                }
            }
        ])
    };

    render() {
        return (
            <Button type="primary" onClick={this.onBtnClick}>保持当前投票</Button>
        )
    }
}

const AdminOtherComponent = () =>(
    <div className="flex-container">
        <div className="pc-sub-title">后台管理</div>
            <Flex>
                <Flex.Item>
                    <div style={{
                        width: '50%',
                        margin: '0 auto'
                    }}>
                        <SetWinGroupComponent/>
                        <WhiteSpace size="lg"/>
                        <SetEnableVoteComponent/>
                        <WhiteSpace size="lg"/>
                        <AddGroupScoreComponent/>
                        <WhiteSpace size="lg"/>
                        <WhiteSpace size="lg"/>
                        <SaveExVoteComponent/>
                        <WhiteSpace size="lg"/>
                        <WhiteSpace size="lg"/>
                        <ResetAllComponent/>
                    </div>
                </Flex.Item>
            </Flex>
    </div>
);

export default AdminOtherComponent
