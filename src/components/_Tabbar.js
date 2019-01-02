import React from 'react';
import { TabBar } from 'antd-mobile';

import HomeComponent from './Home';
import RewardComponent from './Reward';
import VoteComponent from './Vote';
import BarrageComponent from '../containers/TabBarrage';

import home_svg from '../icons/home.svg';
import home_un_svg from '../icons/home_un.svg';
import reward_svg from '../icons/reward.svg';
import reward_un_svg from '../icons/reward_un.svg';
import vote_svg from '../icons/vote.svg';
import vote_un_svg from '../icons/vote_un.svg';
import barrage_svg from '../icons/barrage.svg';
import barrage_un_svg from '../icons/barrage_un.svg';

import { TABS } from "../constants";

const TabbarComponent = ({ current_tab, unread_message_count, setCurrentTab }) => (
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
                    background: `url(${home_un_svg}) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${home_svg}) center center /  21px 21px no-repeat` }}
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
                    background: `url(${reward_un_svg}) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${reward_svg}) center center /  21px 21px no-repeat` }}
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
                    background: `url(${vote_un_svg}) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${vote_svg}) center center /  21px 21px no-repeat` }}
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
                    background: `url(${barrage_un_svg}) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${barrage_svg}) center center /  21px 21px no-repeat` }}
                />
                }
                selected={current_tab === TABS.BARRAGE_TAB}
                onPress={() => {
                    setCurrentTab(TABS.BARRAGE_TAB)
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
