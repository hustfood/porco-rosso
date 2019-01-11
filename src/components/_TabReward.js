import React from 'react';
import { Flex, WhiteSpace, Card, Icon } from 'antd-mobile';

import { REWARD_SHOW } from "../constants";

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
                src={this.props.src}
                width={this.props.width}
            />
        )
    }
}

const items = REWARD_SHOW.map((d,i) => (
    <div key={i}>
        <Card>
            <Card.Header
                title={d[1]}
                extra={d[2]}
            />
            <Card.Body>
                <LazyImage src={`http://foojamfung.top/img/${d[0]}`} width="30%"/>
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
