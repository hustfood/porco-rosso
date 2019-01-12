import React, { Component } from 'react';
import { Flex, WhiteSpace, Picker, InputItem, List, Toast, Button } from 'antd-mobile';

const DIV_LEN = 9;

class RepeatDivComponent extends Component {
    state = {
        s: ['-', '-', '-', '-', '-', '-', '-' , '-', '-'],
        t: [],
        run: false,
        running: false
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
            }, 1000)
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
            padding: '0 30px 30px 30px'
        };
        let btn_div_style = {
            textAlign: 'center',
            width: '60%',
            margin: '0 auto',
        };
        let span_style = {
            color: 'lightgray',
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

class AdminRewardComponent extends Component {
    state = {
    };
    render() {
        return (
            <div className="flex-container">
                <div className="pc-sub-title"/>
                    <Flex>
                        <Flex.Item>
                            <RepeatDivComponent/>
                            <RepeatDivComponent/>
                            <RepeatDivComponent/>
                        </Flex.Item>
                    </Flex>
            </div>
        )
    }
}

export default AdminRewardComponent
