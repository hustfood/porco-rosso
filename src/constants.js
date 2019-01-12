import React from 'react';

export const TABS = {
    HOME_TAB: 'HOME_TAB',
    REWARD_TAB: 'REWARD_TAB',
    VOTE_TAB: 'VOTE_TAB',
    BARRAGE_TAB: 'BARRAGE_TAB',
};

export const ADMIN_TABS = {
    VOTE_TAB: 'VOTE_TAB',
    REWARD_TAB: 'REWARD_TAB',
    OTHER_TAB: 'OTHER_TAB'
};

export const REWARD_SHOW = [
    ['pencil+pad.jpg', 'Apple iPad Pro', '一等奖', '包括iPad Pro Pencil手写笔', '1'],
    ['ps4pro1.jpg', 'Sony PS4 Pro', '二等奖', '黑色 1TB 国行', '4'],
    ['cherry.jpg', 'Cherry G80-3494', '三等奖', '白色红轴机械键盘', '5'],
    ['box1.png', '20寸铝框登机箱', '四等奖', '银色 纯PC 非全铝', '12'],
    ['pillow.png', '无线按摩靠枕', '四等奖', '网易智造 值得拥有', '12'],
    ['power.png', '轻薄移动电源', '五等奖', '网易智造 值得拥有', '15'],
    ['warm.png', 'mini暖风机', '五等奖', '网易智造 值得拥有', '15'],
    ['board.png', '小方盒插线板', '普照奖', '网易智造 值得拥有', '75'],
    ['airpods1.png', 'Apple AirPods', 'C位奖品', '蓝牙无线耳机', '3'],
];


const colorStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '16px',
    height: '16px',
    marginRight: '10px',
};

export const VOTE_OPTIONS = [
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#FF3300' }} />
                <span>EROS</span>
            </div>
        ),
        value: 'EROS',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#FFC000' }} />
                <span>GAIA</span>
            </div>
        ),
        value: 'GAIA',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#99CCFF' }} />
                <span>TITAN</span>
            </div>
        ),
        value: 'TITAN',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#99CC00' }} />
                <span>MOCO</span>
            </div>
        ),
        value: 'MOCO',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#9966CC' }} />
                <span>FM&MAKI</span>
            </div>
        ),
        value: 'FM&MAKI',
    },
];

