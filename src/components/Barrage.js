import React, { Component } from 'react';
import { List, Flex, WhiteSpace, TextareaItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

class BarrageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
    }
    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(value);
        });
    };
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <div className="flex-container">
                    <div className="sub-title">弹幕</div>
                    <Flex style={{ marginTop: '50%' }}>
                        <Flex.Item>
                            <List renderHeader={()=>'请输入弹幕内容：'}>
                                <TextareaItem
                                    {...getFieldProps('count')}
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
