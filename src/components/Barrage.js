import React, { Component } from 'react';
import { List, Flex, WhiteSpace, TextareaItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

import socket from '../socketio';

class BarrageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    submit = () => {
        this.props.form.validateFields((error, value) => {
            socket.emit('send barrage', value, (data) => {
                if (data === 'ok') {
                    this.props.form.setFieldsValue({say:''});
                }
            })
        });
    };
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <div className="flex-container">
                    <div className="sub-title">弹幕</div>
                    <Flex>
                        <Flex.Item>
                            <List renderHeader={()=>'请输入弹幕内容：'}>
                                <TextareaItem
                                    {...getFieldProps('say')}
                                    rows={2}
                                    count={20}
                                />
                            </List>
                            <WhiteSpace/>
                            <Button type="primary" onClick={this.submit}>发送</Button>
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace size="lg"/>
                </div>
            </div>
        );
    }
}

export default createForm()(BarrageComponent);
