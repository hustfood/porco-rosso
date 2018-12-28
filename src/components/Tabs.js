import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';

import RewardComponent from './Reward';
import VoteComponent from './Vote';
import BarrageComponent from './Barrage';

import reward_svg from '../icons/reward.svg';
import reward_un_svg from '../icons/reward_un.svg';
import vote_svg from '../icons/vote.svg';
import vote_un_svg from '../icons/vote_un.svg';
import barrage_svg from '../icons/barrage.svg';
import barrage_un_svg from '../icons/barrage_un.svg';

class TabsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tab_reward',
            unReadBarrage: 3
        }
    }
    render() {
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
                        onPress={() => {
                            this.setState({
                                selectedTab: 'tab_reward'
                            })
                        }}
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
                        onPress={() => {
                            this.setState({
                                selectedTab: 'tab_vote'
                            })
                        }}
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
                        onPress={() => {
                            this.setState({
                                selectedTab: 'tab_barrage',
                                unReadBarrage: 0
                            })
                        }}
                        badge={this.state.unReadBarrage}
                        data-seed="logId1"
                    >
                        <BarrageComponent/>
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default TabsComponent;
