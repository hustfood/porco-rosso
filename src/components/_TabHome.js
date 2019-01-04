import React from 'react';
import { Flex, WhiteSpace, Carousel } from 'antd-mobile';

const data = ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'];

const TabHomeComponent = () => (
    <div>
        <div className="flex-container">
            <div className="sub-title">2019QA年会欢迎你</div>
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
            <WhiteSpace size="lg"/>
        </div>
        <div style={{ width: '100%', textAlign: 'center', bottom: '1%', position: 'absolute' }}>
            <a href="http://www.miitbeian.gov.cn/" target="_blank" className="beian">粤ICP备19001641号</a>
        </div>
    </div>
);

export default TabHomeComponent;
