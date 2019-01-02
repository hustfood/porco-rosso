import React, { Component } from 'react';
import { List, Flex, WhiteSpace, TextareaItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { ChatFeed, Message } from 'react-chat-ui';
import socket from '../socketio';

class BarrageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emote: false,
            messages: [],
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
    componentDidMount() {
        socket.on('sync barrage', param => {
            const new_ret = this.state.messages.concat([new Message({ id: 0, message: param})]);
            this.setState({messages: new_ret});
        });
    }
    render() {
        const { getFieldProps} = this.props.form;
        return (
            <div>
                <div className="barrage-flex-container">
                    <Flex>
                        <Flex.Item>
                            <ChatFeed
                                messages={this.state.messages} // Boolean: list of message objects
                                isTyping={false} // Boolean: is the recipient typing
                                hasInputField={false} // Boolean: use our input, or use your own
                                showSenderName // show the name of the user who sent the message
                                bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                            />
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace/>
                    <Flex>
                        <Flex.Item>
                            <List>
                                <TextareaItem
                                    {...getFieldProps('say')}
                                    placeholder="支持emoji表情"
                                    rows={3}
                                    count={60}
                                />
                            </List>
                            <WhiteSpace/>
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace/>
                    <Flex>
                        <Flex.Item>
                            <Button type="ghost" icon="check-circle-o" onClick={this.submit}>发送</Button>
                        </Flex.Item>
                    </Flex>
                </div>
            </div>
        );
    }
}

export default createForm()(BarrageComponent);
