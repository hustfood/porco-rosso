import React from 'react';
import { List, Flex, WhiteSpace, TextareaItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { ChatFeed, Message } from 'react-chat-ui';

import socket from '../socketio';
// import { getSocket } from "../socketio";

const TabBarrageComponent = ({ form, messages }) => {
    const { getFieldProps } = form;
    const submitInput = () => {
        form.validateFields((error, value) => {
            if (value.say === undefined || value.say === null || value.say.trim() === '' ) {
                Toast.fail('亲不能发送空内容呀', 1);
            }
            else {
                // getSocket().then(socket => {
                //     socket.emit('send barrage', value, (data) => {
                //         if (data === 'ok') {
                //             form.setFieldsValue({say:''});
                //         }
                //     })
                // });
                socket.emit('send barrage', value, (data) => {
                    if (data === 'ok') {
                        form.setFieldsValue({say:''});
                    }
                })
            }
        });
    };
    const chatMessages = messages.map((message) => (
        new Message({id: 0, message: message})
    ));
    return (
        <div>
            <div
                style={{
                    fontWeight: 'bold',
                    fontSize: '7vw',
                    padding: "30px 0 18px 15px",
                    height: screen.height*0.6,
                    backgroundImage: 'url(http://foojamfung.top/img/chat.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '10% 40%',
                }}
            >弹幕互动</div>
            <div className="barrage-flex-container">
                <Flex>
                    <Flex.Item>
                        <ChatFeed
                            messages={chatMessages} // Boolean: list of message objects
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
                        <Button type="ghost" icon="check-circle-o" onClick={submitInput}>发送</Button>
                    </Flex.Item>
                </Flex>
            </div>
        </div>
    );
};

export default createForm()(TabBarrageComponent)
