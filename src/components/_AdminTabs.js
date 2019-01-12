import React from 'react';
import { TabBar } from 'antd-mobile';

import { ADMIN_TABS } from "../constants";

import VoteComponent from "../containers/AdminVote";
import RewardComponent from "../containers/AdminReward";
import OtherComponent from "../containers/AdminOther";

const AdminTabsComponent = ({ admin_current_tab, setAdminCurrentTab }) => (
    <div style={{ height: window.innerHeight, width: '100%', top: 0 }}>
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={false}
        >
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
                selected={admin_current_tab === ADMIN_TABS.VOTE_TAB}
                onPress={() => {
                    setAdminCurrentTab(ADMIN_TABS.VOTE_TAB)
                }}
            >
                <VoteComponent/>
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
                selected={admin_current_tab === ADMIN_TABS.REWARD_TAB}
                onPress={() => {
                    setAdminCurrentTab(ADMIN_TABS.REWARD_TAB)
                }}
            >
                <RewardComponent/>
            </TabBar.Item>
            <TabBar.Item
                title="其他"
                key="item_other"
                icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(http://foojamfung.top/img/others_un.svg) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(http://foojamfung.top/img/others.svg) center center /  21px 21px no-repeat` }}
                />
                }
                selected={admin_current_tab === ADMIN_TABS.OTHER_TAB}
                onPress={() => {
                    setAdminCurrentTab(ADMIN_TABS.OTHER_TAB)
                }}
            >
                <OtherComponent/>
            </TabBar.Item>
        </TabBar>
    </div>

);

export default AdminTabsComponent

