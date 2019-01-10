import React, { Component } from 'react';
import { Flex, WhiteSpace, Picker, InputItem, List, Toast, Button } from 'antd-mobile';
import { Chart, Axis, Geom, Tooltip } from 'bizgoblin';

const colorStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '16px',
    height: '16px',
    marginRight: '10px',
};

const colors = [
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#FF3300' }} />
                <span>EROS</span>
            </div>
        ),
        value: 'red',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#FFC000' }} />
                <span>GAIA</span>
            </div>
        ),
        value: 'yellow',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#99CCFF' }} />
                <span>TITAN</span>
            </div>
        ),
        value: 'blue',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#99CC00' }} />
                <span>MOCO</span>
            </div>
        ),
        value: 'green',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#9966CC' }} />
                <span>FM&MAKI</span>
            </div>
        ),
        value: 'purple',
    },
];

const data111 = [
  {
    group: 'EROS',
    sales: 38,
  }, {
    group: 'GAIA',
    sales: 52,
  }, {
    group: 'TITAN',
    sales: 61,
  }, {
    group: 'MOCO',
    sales: 145,
  }, {
    group: 'FM&MAKI',
    sales: 48,
  }
];

const defs111 = [{
  dataKey: 'group',
}, {
  dataKey: 'sales',
  tickCount: 5,
}];

function onShowTooltip(ev) {
  const items = ev.items;
  items[0].name = null;
  items[0].name = items[0].title;
  items[0].value = `¥ ${items[0].value}`;
}

class TabVoteComponent extends Component {
    state = {
        hasError: true,
        qaCode: '',
        vote1: '',
        vote2: ''
    };
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入8位数字的标识码', 1);
        }
    };
    onChange = (qaCode) => {
        if (qaCode.replace(/\s/g, '').length !== 8) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            qaCode,
        });
    };
    onChangeVote1 = (vote1) => {
        this.setState({
            vote1
        })
    };
    onChangeVote2 = (vote2) => {
        this.setState({
            vote2
        })
    };
    handleClick = () => {
        console.log(this.state.qaCode);
    };
    render() {
        let chart_height = screen.height * 0.3;
        return (
            <div className="flex-container">
                <div className="sub-title">票选最佳</div>
                <Flex>
                    <Flex.Item>
                        <Chart
                            width="100%"
                            height={chart_height}
                            data={data111}
                            defs={defs111}
                            animate={{ type: 'scaley' }}
                            pixelRatio={window.devicePixelRatio*2}
                        >
                                        <Axis dataKey="group" label={{ fontSize: '10px' }} />
                                        <Axis dataKey="sales"/>
                                        <Tooltip showItemMarker={false} onShow={onShowTooltip} />
                                        <Geom
                                            geom="interval"
                                            position="group*sales"
                                            color={['group', ['#FF3300', '#FFC000', '#99CCFF', '#99CC00', '#9966CC']]}
                                        />
                        </Chart>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg"/>
                <Flex>
                    <Flex.Item>
                        <List>
                            <Picker
                                data={colors}
                                value={this.state.vote1}
                                cols={1}
                                onChange={this.onChangeVote1}
                            >
                                <List.Item arrow="horizontal">第一票</List.Item>
                            </Picker>
                        </List>
                        <WhiteSpace size="lg"/>
                        <List>
                            <Picker
                                data={colors}
                                value={this.state.vote2}
                                cols={1}
                                onChange={this.onChangeVote2}
                            >
                                <List.Item arrow="horizontal">第二票</List.Item>
                            </Picker>
                        </List>
                        <WhiteSpace size="lg"/>
                        <List>
                            <InputItem
                                type="number"
                                placeholder="8位数字标识码"
                                error={this.state.hasError}
                                onErrorClick={this.onErrorClick}
                                onChange={this.onChange}
                                value={this.state.qaCode}
                            >
                                <div style={{ backgroundImage: 'url(http://foojamfung.top/img/qa.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
                            </InputItem>
                        </List>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg"/>
                <Flex>
                    <Flex.Item>
                        <Button type="ghost" icon="check-circle-o" onClick={this.handleClick}>投票</Button>
                    </Flex.Item>
                </Flex>
            </div>
        )
   }
}

export default TabVoteComponent;

