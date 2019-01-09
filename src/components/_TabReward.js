import React from 'react';
import { Flex, WhiteSpace, Card, Icon } from 'antd-mobile';

const data = [
    ['pencil+pad.jpg', 'Apple iPad Pro', '一等奖', '包括iPad Pro Pencil手写笔', '1'],
    ['ps4pro1.jpg', 'Sony PS4 Pro', '二等奖', '黑色 1TB 国行', '4'],
    ['cherry.jpg', 'Cherry G80-3494', '三等奖', '白色红轴机械键盘', '5'],
    ['airpods1.png', 'Apple AirPods', 'C位奖品', '蓝牙无线耳机', '3'],
    ['box1.png', '20寸铝框登机箱', '四等奖', '银色 纯PC 非全铝', '12'],
    ['pillow.png', '无线按摩靠枕', '四等奖', '网易智造 值得拥有', '12'],
    ['power.png', '轻薄移动电源', '五等奖', '网易智造 值得拥有', '15'],
    ['warm.png', 'mini暖风机', '五等奖', '网易智造 值得拥有', '15'],
    ['board.png', '小方盒插线板', '普照奖', '网易智造 值得拥有', '75'],
];

class LazyImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        const img = new Image();
        img.onload = () => {
            this.setState({
                loaded: true
            });
        };
        img.src = this.props.src;
    }

    render() {
        if (!this.state.loaded) {
            return (
                <div className="loading-box">
                    <div className="loading-content">
                        <Icon type="loading"/>
                    </div>
                </div>
            )
        }
        return (
            <img
                className={this.props.className}
                style={this.props.style}
                src={this.props.src}
                alt={this.props.alt}
                width="50%"
            />
        )
    }
}

const items = data.map((d,i) => (
    <div key={i}>
        <Card>
            <Card.Header
                title={d[1]}
                extra={d[2]}
            />
            <Card.Body>
                <LazyImage src={`http://foojamfung.top/img/${d[0]}`} width="50%"/>
                <div style={{ paddingTop: '10px' }}>{d[3]}</div>
            </Card.Body>
            <Card.Footer content="" extra={"数量 "+d[4]} />
        </Card>
        <WhiteSpace size="lg"/>
    </div>
));

const TabRewardComponent = () => (
    <div className="flex-container">
        <div className="sub-title">奖品展示</div>
        <Flex>
            <Flex.Item>
                {items}
            </Flex.Item>
        </Flex>
        <WhiteSpace size="lg"/>
    </div>
);

export default TabRewardComponent;
