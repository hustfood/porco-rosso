import React from 'react';
import { Flex, WhiteSpace, Carousel } from 'antd-mobile';

const banner = ['banner1', 'banner2', 'banner3'];

const groups = [
    {
        color: '#FF3300',
        name: 'EROS',
        video: 'https://v.youku.com/v_show/id_XNDAxNjgwOTQ4NA==.html?spm=a2h3j.8428770.3416059.1',
        link: 'video_1.svg'
    },
    {
        color: '#FFC000',
        name: 'GAIA',
        video: 'https://v.youku.com/v_show/id_XNDAxNjgxMDM4NA==.html?spm=a2h3j.8428770.3416059.1',
        link: 'video_2.svg'
    },
    {
        color: '#99CCFF',
        name: 'TITAN',
        video: 'https://v.youku.com/v_show/id_XNDAxNjk1MDk0MA==.html?spm=a2h3j.8428770.3416059.1',
        link: 'video_3.svg'
    },
    {
        color: '#99CC00',
        name: 'MOCO',
        video: 'https://v.youku.com/v_show/id_XNDAxNjgxMDgwMA==.html?spm=a2h3j.8428770.3416059.1',
        link: 'video_4.svg'
    },
    {
        color: '#9966CC',
        name: 'FM&MAKI',
        video: 'https://v.youku.com/v_show/id_XNDAxNjgwNjEyMA==.html?spm=a2h3j.8428770.3416059.1',
        link: 'video_5.svg'
    },
];

const badges = groups.map((g, i) => (
    <div key={i}>
        <div
            key={i}
            style={{
                margin: '5px 20px 5px 10px',
                padding: '10px 12px 10px 15px',
                borderRadius: 4,
                color: g.color,
                fontSize: '15px',
                border: `1px solid ${g.color}`,
                textAlign: 'left',
                width: '60%',
                display: 'inline-block'
            }}
        >
            {g.name}
        </div>
        <a href={g.video} target="_blank"><img src={`http://foojamfung.top/img/${g.link}`} style={{ height: '100%', verticalAlign: 'middle' }}/></a>
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
                        {banner.map(val => (
                          <a
                            key={val}
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
                backgroundPosition: '100% 10%',
            }}
        >
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                {badges}
            </div>
            <WhiteSpace/>
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

export default TabHomeComponent
