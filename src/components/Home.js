import React, { Component } from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';

class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <div className="flex-container">
                    <div className="sub-title">首页</div>
                    <Flex>
                        <Flex.Item>Coming soon ~~</Flex.Item>
                    </Flex>
                    <WhiteSpace size="lg"/>
                </div>
            </div>
        );
    }
}

export default HomeComponent;
