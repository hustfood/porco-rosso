import React from 'react';
import { Flex, WhiteSpace, Carousel, Badge } from 'antd-mobile';

const data = ['banner1', 'banner2', 'banner3'];

const groups = [
    {
        color: '#FF3300',
        name: 'EROS',
        video: 'https://pan.baidu.com/s/1Wwc7m-nD10CQFY843nLBYQ'
    },
    {
        color: '#FFC000',
        name: 'GAIA',
        video: 'https://pan.baidu.com/s/1ndkAhocCaokCRz_lISNM-A'
    },
    {
        color: '#99CCFF',
        name: 'TITAN',
        video: 'https://pan.baidu.com/s/16HBHeMB7L-j4B841dQvMLw'
    },
    {
        color: '#99CC00',
        name: 'MOCO',
        video: 'https://pan.baidu.com/s/1miDTmPDbFQkbDo8ToyXbeA'
    },
    {
        color: '#9966CC',
        name: 'FM&MAKI',
        video: 'https://pan.baidu.com/s/1KS0ydhxvj6X7NOQSwZ7pGg'
    },
];

const badges = groups.map((g, i) => (
    <div key={i}>
        <div
            style={{
                margin: '0 15px',
                padding: '5px',
                backgroundColor: '#fff',
                borderRadius: 4,
                color: g.color,
                fontSize: '20px',
                border: `1px solid ${g.color}`,
                display: 'inline'
            }}
        >
            {g.name}
        </div>
        <a
            href={g.video}
            target="_blank"
            style={{
                color: g.color
            }}
        >
            >> 观看新人战队视频
        </a>
        <WhiteSpace size="lg"/>
        <WhiteSpace size="lg"/>
    </div>
));

const TabHomeComponent = () => (
    <div>
        <div className="flex-container">
            <div className="sub-title">QA年会欢迎你</div>
            <Flex>
                <Flex.Item>
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                        {data.map(val => (
                          <a
                            key={val}
                            href="http://foojamfung.top"
                            style={{ display: 'inline-block', width: '100%', height: 'auto' }}
                          >
                            <img
                              src={`http://foojamfung.top/img/${val}.png`}
                              alt=""
                              style={{ width: '100%', verticalAlign: 'top' }}
                              onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                              }}
                            />
                          </a>
                        ))}
                    </Carousel>
                </Flex.Item>
            </Flex>
        </div>
        <div
            style={{
                width: '100%',
                bottom: '1%',
                position: 'absolute',
                backgroundImage: 'url(http://foojamfung.top/img/pig2.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right top',
            }}
        >
            <div
                style={{
                    marginLeft: '3%'
                }}
            >
                {badges}
            </div>
            <WhiteSpace size="lg"/>
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <img
                    src="http://foojamfung.top/img/beian.png"
                    height="15px"
                    style={{ verticalAlign: "middle", marginBottom: "3px", marginRight: "3px" }}
                />
                <a href="http://www.miitbeian.gov.cn/" target="_blank" className="beian">粤ICP备19001641号</a>
            </div>
        </div>
    </div>
);

export default TabHomeComponent;
