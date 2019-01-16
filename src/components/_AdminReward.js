import React, { Component } from 'react';
import { Flex, WhiteSpace, Tabs, Toast, Button } from 'antd-mobile';

import socket from '../socketio';

import { ID2GROUP } from "../constants";

const DIV_LEN = 9;

class RepeatDivComponent extends Component {
    state = {
        s: ['', '', '', '', '?', '', '' , '', ''],
        t: [],
        run: false,
        running: false,
        l: '',
        show_l: false
    };
    randSetAll = () => {
        let newT = new Array(DIV_LEN);
        for (let i=0; i<DIV_LEN; i++) {
            newT[i] = Math.floor(Math.random()*10).toString();
        }
        this.setState({
            s: newT
        })
    };
    componentDidMount() {
        setInterval(() => {
            if (this.state.run) {
                for (let i=0; i<DIV_LEN; i++) {
                    this.randSetAll()
                }
            } else {
                if (this.state.s.toString() === this.state.t.toString()) {
                    this.setState({
                        t: [],
                        running: false,
                        show_l: true
                    })
                } else {
                    if (this.state.t.length === DIV_LEN) {
                        let t = this.state.t;
                        this.setState({
                            s: t
                        })
                    } else {
                        if (this.state.t.length !== 0) {
                            for (let i = 0; i < DIV_LEN; i++) {
                                this.randSetAll()
                            }
                        }
                    }
                }
            }
        }, 100)
    }
    runDiv = (lucky) => {
        return new Promise((resolve, reject) => {
            this.setState({
                run: true,
                running: true,
                show_l: false
            });
            setTimeout(() => {
                let idArray = lucky.nianhuiid.split("");
                if (idArray.length === 8) {
                    idArray.unshift("")
                }
                resolve(idArray)
            }, 5000)
        });
    };
    onGoClick = () => {
        socket.emit(`ask ${this.props.tag}`, (lucky) => {
            if (lucky === undefined) {
                Toast.fail('未能成功获取幸运儿呀')
            } else if (lucky === "error") {
                Toast.fail('未能成功获取幸运儿呀')
            } else if (Object.keys(lucky).length === 0) {
                Toast.fail('尚未决出胜利小组哦')
            } else {
                if (!this.state.running) {
                    this.runDiv(lucky).then((data) => {
                        this.setState({
                            run: false,
                            t: data,
                            l: lucky.name
                        })
                    })
                }
            }
        });
    };
    render() {
        let div_style = {
            textAlign: 'center',
            width: '80%',
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
            paddingBottom: '10px',
            textAlign: 'center'
        };
        let name_style = {
            fontSize: '6vw',
            color: '#FFDF00',
            WebkitTextStroke: '0.1vw #000000'
        };
        let sub_div_list = this.state.s.map((s,i) => (
            <div key={i} style={span_style}>{s}</div>
        ));
        return (
            <div style={div_style}>
                <WhiteSpace size="lg"/>
                {sub_div_list}
                <WhiteSpace size="lg"/>
                <div style={btn_div_style}>
                    <Button type="ghost" icon="check-circle-o" onClick={this.onGoClick} disabled={this.state.running}>抽奖</Button>
                </div>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                {
                    this.state.show_l && (
                        <span style={name_style}>{this.state.l}</span>
                    )
                }
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
        socket.emit('ask win group', (data) => {
            if ([1,2,3,4,5].includes(data)) {
                this.setState({win_group: ID2GROUP[data]})
            }
        });
        socket.on('sync win group', param => this.setState({win_group: ID2GROUP[param]}))
    }
    render() {
        return (
            <div className="flex-container">
                <div style={{
                    width: '60%',
                    margin: '0 auto'
                }}>
                    <Flex>
                        <Flex.Item>
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '20px'
                            }}>
                                <img style={{ verticalAlign: 'middle' }} src='http://foojamfung.top/img/crown.png'/>
                                <span style={{
                                    display: 'inline-block',
                                    verticalAlign: 'middle',
                                    fontSize: '5vw',
                                    fontWeight: 'bold',
                                    margin: '0 10px 0 10px',
                                    color: '#FFDF00',
                                    WebkitTextStroke: '0.1vw #000000'
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
                                <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'center', height: window.innerHeight*0.6, backgroundColor: '#fff' }}>
                                    <RepeatDivComponent tag="win lucky"/>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'center', height: window.innerHeight*0.6, backgroundColor: '#fff' }}>
                                    <RepeatDivComponent tag="vote lucky"/>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'center', height: window.innerHeight*0.6, backgroundColor: '#fff' }}>
                                    <RepeatDivComponent tag="vote lucky"/>
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
