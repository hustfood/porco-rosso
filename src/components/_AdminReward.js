import React, { Component } from 'react';
import { Flex, WhiteSpace, Tabs, InputItem, List, Toast, Button } from 'antd-mobile';

import socket from '../socketio';

const DIV_LEN = 9;

class RepeatDivComponent extends Component {
    state = {
        s: ['', '', '', '', '?', '', '' , '', ''],
        t: [],
        run: false,
        running: false,
    };
    randSet = (index) => {
        let s = Math.floor(Math.random()*10).toString();
        let oldS = this.state.s;
        oldS[index] = s;
        this.setState({
            s: oldS
        })
    };
    componentDidMount() {
        setInterval(() => {
            if (this.state.run) {
                for (let i=0; i<DIV_LEN; i++) {
                    this.randSet(i)
                }
            } else {
                if (this.state.t.length === DIV_LEN) {
                    for (let i=0; i<DIV_LEN; i++) {
                        if (this.state.s[i] !== this.state.t[i]) {
                            this.randSet(i)
                        }
                    }
                } else {
                    if (this.state.t.length !== 0) {
                        for (let i = 0; i < DIV_LEN; i++) {
                            this.randSet(i)
                        }
                    }
                }

                if (this.state.s.toString() === this.state.t.toString()) {
                    this.setState({
                        t: [],
                        running: false
                    })
                }
            }
        }, 100)
    }
    runDiv = () => {
        return new Promise((resolve, reject) => {
            this.setState({
                run: true,
                running: true
            });
            setTimeout(() => {
                let newT = new Array(DIV_LEN);
                for (let i=0; i<DIV_LEN; i++) {
                    newT[i] = Math.floor(Math.random()*10).toString();
                }
                resolve(newT)
            }, 5000)
        });
    };
    onClick = () => {
        if (!this.state.running) {
            this.runDiv().then((data) => {
                this.setState({
                    run: false,
                    t: data
                })
            })
        }
    };
    render() {
        let div_style = {
            textAlign: 'center',
            width: '60%',
            margin: '0 auto',
            padding: '0 30px 30px 30px',
            display: 'block'
        };
        let btn_div_style = {
            textAlign: 'center',
            width: '60%',
            margin: '0 auto',
        };
        let span_style = {
            fontSize: '7vw',
            display: 'inline-block',
            width: '11%',
            padding: '20px',
            textAlign: 'center'
        };
        let sub_div_list = this.state.s.map((s,i) => (
            <div key={i} style={span_style}>{s}</div>
        ));
        return (
            <div style={div_style}>
                {sub_div_list}
                <div style={btn_div_style}>
                    <Button type="ghost" icon="check-circle-o" onClick={this.onClick} disabled={this.state.running}>抽奖</Button>
                </div>
            </div>
        )
    }
}

const tabs = [
    { title: '胜利组成员' },
    { title: '幸运支持者①' },
    { title: '幸运支持者②' }
];

class AdminRewardComponent extends Component {
    state = {
        win_group: '?'
    };
    componentDidMount() {
        socket.on('sync win group', param => this.setState({win_group: param}))
    }
    render() {
        return (
            <div className="flex-container">
                <div style={{
                    width: '70%',
                    margin: '0 auto'
                }}>
                    <Flex>
                        <Flex.Item>
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '30px'
                            }}>
                                <img style={{ verticalAlign: 'middle' }} src='http://foojamfung.top/img/crown.png'/>
                                <span style={{
                                    display: 'inline-block',
                                    verticalAlign: 'middle',
                                    fontSize: '5vw',
                                    margin: '0 10px 0 10px'
                                }}>
                                    {this.state.win_group}
                                </span>
                                <img style={{ verticalAlign: 'middle' }} src='http://foojamfung.top/img/crown.png'/>
                            </div>
                        </Flex.Item>
                    </Flex>
                    <Flex>
                        <Flex.Item>
                            <Tabs
                                tabs={tabs}
                                initialPage={0}
                                animated={false}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
                                    <RepeatDivComponent/>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
                                    <RepeatDivComponent/>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
                                    <RepeatDivComponent/>
                                </div>
                            </Tabs>
                        </Flex.Item>
                    </Flex>
                </div>
            </div>
        )
    }
}

export default AdminRewardComponent
