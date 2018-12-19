import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import Barrage from 'react-barrage';
import randomColor from 'randomcolor';

import RewardComponent from './components/Reward';
import VoteComponent from './components/Vote';
import BarrageComponent from './components/Barrage';

import './App.css';

import reward_svg from './icons/reward.svg';
import reward_un_svg from './icons/reward_un.svg';
import vote_svg from './icons/vote.svg';
import vote_un_svg from './icons/vote_un.svg';
import barrage_svg from './icons/barrage.svg';
import barrage_un_svg from './icons/barrage_un.svg';

const barrageStyle = {
    color: randomColor(),
    fontSize: '6vw',
    fontWeight: 'bold',
    WebkitTextStroke: '0.05vw #000000'
};

function Item ({text, xId}) {
    return <div style={barrageStyle}>{text}</div>
}

function _getData () {
    let ret = [];
    for (let i = 0; i < 20; i++) {
        ret.push({
            xId: i,
            text: i + '_alalal_' + i
        })
    }

    return Promise.resolve(ret)
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tab_barrage'
        }
    }
    render() {
        let barrage = (
            <Barrage
                getData={_getData}
                style={{height: '95%', overflow: 'hidden'}}
                Item={Item}
                margin={50}
                itemKey="xId"
            />
        );
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={false}
                >
                    <TabBar.Item
                        title="抽奖"
                        key="item_reward"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${reward_un_svg}) center center /  21px 21px no-repeat` }}
                            />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${reward_svg}) center center /  21px 21px no-repeat` }}
                            />
                        }
                        selected={this.state.selectedTab === 'tab_reward'}
                        badge={1}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'tab_reward'
                            })
                        }}
                        data-seed="logId1"
                      >
                        <RewardComponent/>
                    </TabBar.Item>
                    <TabBar.Item
                        title="投票"
                        key="item_vote"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${vote_un_svg}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${vote_svg}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selected={this.state.selectedTab === 'tab_vote'}
                        badge={'new'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'tab_vote'
                            })
                        }}
                        data-seed="logId2"
                    >
                        <VoteComponent/>
                    </TabBar.Item>
                    <TabBar.Item
                        title="弹幕"
                        key="item_barrage"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${barrage_un_svg}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${barrage_svg}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selected={this.state.selectedTab === 'tab_barrage'}
                        dot
                        onPress={() => {
                            this.setState({
                                selectedTab: 'tab_barrage'
                            })
                        }}
                    >
                        <BarrageComponent/>
                    </TabBar.Item>
                </TabBar>
                {barrage}
            </div>
        );
    }
}

export default App;
