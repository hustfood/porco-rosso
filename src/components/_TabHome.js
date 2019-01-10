import React from 'react';
import { Flex, WhiteSpace, Carousel, Badge } from 'antd-mobile';

const data = ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'];
const groups = [
    {
        color: '#FF3300',
        name: 'EROS'
    },
    {
        color: '#FFC000',
        name: 'GAIA'
    },
    {
        color: '#99CCFF',
        name: 'TITAN'
    },
    {
        color: '#99CC00',
        name: 'MOCO'
    },
    {
        color: '#9966CC',
        name: 'FM&MAKI'
    },
];
const badges = groups.map((g, i) => (
    <Badge
        key={i}
        text={g.name}
        style={{
            margin: '0 5px',
            backgroundColor: '#fff',
            borderRadius: 2,
            color: g.color,
            border: `1px solid ${g.color}`,
        }}
    />
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
        <div style={{ width: '100%', textAlign: 'center', bottom: '1%', position: 'absolute' }}>
            <div style={{ textAlign: 'center' }}>
                {badges}
            </div>
            <WhiteSpace size="lg"/>
            <div style={{ textAlign: 'center' }}>
                <img src="http://foojamfung.top/img/pig.png" />
            </div>
            <WhiteSpace size="lg"/>
            <a href="http://www.miitbeian.gov.cn/" target="_blank" className="beian">粤ICP备19001641号</a>
        </div>
    </div>
);

export default TabHomeComponent;
