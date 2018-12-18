import React, { Component } from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="flex-container">
                <div className="sub-title">Title</div>
                <Flex>
                    <Flex.Item>1</Flex.Item>
                    <Flex.Item>2</Flex.Item>
                </Flex>
                <WhiteSpace size="lg"/>
                <Flex>
                    <Flex.Item>3</Flex.Item>
                    <Flex.Item>4</Flex.Item>
                    <Flex.Item>5</Flex.Item>
                </Flex>
                <WhiteSpace size="lg"/>
                <Flex>
                    <Flex.Item>6</Flex.Item>
                    <Flex.Item>7</Flex.Item>
                </Flex>
            </div>
        );
    }
}

export default App;
