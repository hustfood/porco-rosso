import React from 'react';
import { TabBar } from 'antd-mobile';

import RewardComponent from './Reward';
import VoteComponent from './Vote';
import HomeComponent from '../containers/TabHome';
import BarrageComponent from '../containers/TabBarrage';

import { TABS } from "../constants";

const TabbarComponent = ({ current_tab, unread_message_count, setCurrentTab, resetUnreadMessageCount }) => (
    <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={false}
        >
            <TabBar.Item
                title="首页"
                key="item_home"
                icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(http://foojamfung.top/img/home_un.svg) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(http://foojamfung.top/img/home.svg) center center /  21px 21px no-repeat` }}
                />
                }
                selected={current_tab === TABS.HOME_TAB}
                onPress={() => {
                    setCurrentTab(TABS.HOME_TAB)
                }}
            >
                <HomeComponent/>
            </TabBar.Item>
            <TabBar.Item
                title="抽奖"
                key="item_reward"
                icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(http://foojamfung.top/img/reward_un.svg) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(http://foojamfung.top/img/reward.svg) center center /  21px 21px no-repeat` }}
                />
                }
                selected={current_tab === TABS.REWARD_TAB}
                onPress={() => {
                    setCurrentTab(TABS.REWARD_TAB)
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
                    background: `url(http://foojamfung.top/img/vote_un.svg) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(http://foojamfung.top/img/vote.svg) center center /  21px 21px no-repeat` }}
                />
                }
                selected={current_tab === TABS.VOTE_TAB}
                onPress={() => {
                    setCurrentTab(TABS.VOTE_TAB)
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
                    background: `url(http://foojamfung.top/img/barrage_un.svg) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(http://foojamfung.top/img/barrage.svg) center center /  21px 21px no-repeat` }}
                />
                }
                selected={current_tab === TABS.BARRAGE_TAB}
                onPress={() => {
                    resetUnreadMessageCount();
                    setCurrentTab(TABS.BARRAGE_TAB);
                }}
                badge={unread_message_count}
                data-seed="logId1"
            >
                <BarrageComponent/>
            </TabBar.Item>
        </TabBar>
    </div>

);

export default TabbarComponent;
