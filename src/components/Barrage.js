import React, { Component } from 'react';
import { Modal, List, Flex, WhiteSpace, TextareaItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Picker } from 'emoji-mart';

import socket from '../socketio';

import 'emoji-mart/css/emoji-mart.css';

class BarrageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emote: false,
        };
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
    showEmote = (e) => {
        e.preventDefault();
        this.setState({
            emote: true
        })
    };
    closeEmote = (e) => {
        e.preventDefault();
        this.setState({
            emote: false
        })
    };
    emojiSelect = (emoji) => {
        let old_value = this.props.form.getFieldValue('say');
        this.props.form.setFieldsValue({'say':(old_value ? old_value:'') + `[${emoji.colons}]`});
        this.setState({
            emote: false
        })
    };
    render() {
        const { getFieldProps} = this.props.form;
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
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace/>
                    <Modal
                        visible={this.state.emote}
                        transparent
                        maskClosable={true}
                        onClose={this.closeEmote}
                    >
                        <div>
                            <Picker set="twitter" showPreview={false} perLine={6} onSelect={this.emojiSelect}/>
                        </div>
                    </Modal>
                    <Flex justify="end">
                        <Button type="ghost" inline size="small" onClick={this.showEmote} style={{ marginRight: '10px' }}>表情</Button>
                        <Button type="ghost" inline size="small" onClick={this.submit}>发送</Button>
                    </Flex>
                </div>
            </div>
        );
    }
}

export default createForm()(BarrageComponent);
