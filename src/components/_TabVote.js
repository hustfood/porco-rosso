import React, { Component } from 'react';
import { Flex, WhiteSpace, Picker, InputItem, List, Toast } from 'antd-mobile';
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
                <span>Eros</span>
            </div>
        ),
        value: 'red',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#FFC000' }} />
                <span>Gaia</span>
            </div>
        ),
        value: 'yellow',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#99CCFF' }} />
                <span>Titan</span>
            </div>
        ),
        value: 'blue',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#99CC00' }} />
                <span>Moco</span>
            </div>
        ),
        value: 'green',
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle, backgroundColor: '#9966CC' }} />
                <span>Fm&Maki</span>
            </div>
        ),
        value: 'purple',
    },
];

const data111 = [
  {
    year: '1951 年',
    sales: 38,
  }, {
    year: '1952 年',
    sales: 52,
  }, {
    year: '1956 年',
    sales: 61,
  }, {
    year: '1957 年',
    sales: 145,
  }, {
    year: '1958 年',
    sales: 48,
  }
];

const defs111 = [{
  dataKey: 'year',
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
        let chart_height = screen.height * 0.4;
        return (
            <div className="flex-container">
                <div className="sub-title">票选最佳</div>
                <Flex>
                    <Flex.Item>
      <Chart width="100%" height={chart_height} data={data111} defs={defs111} animate={{ type: 'scaley' }} pixelRatio={window.devicePixelRatio*2} >
        <Axis dataKey="year" label={{ fontSize: 8 }} />
        <Axis dataKey="sales" />
        <Tooltip showItemMarker={false} onShow={onShowTooltip} />
        <Geom geom="interval" position="year*sales" />
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
                                placeholder="8位数字标识码"
                                error={this.state.hasError}
                                onErrorClick={this.onErrorClick}
                                onChange={this.onChange}
                                value={this.state.qaCode}
                            >
                                <div style={{ backgroundImage: 'url(http://foojamfung.top/img/qa.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
                            </InputItem>
                        </List>
                        <List.Item>
                            <div
                                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                                onClick={this.handleClick}
                            >
                                OK
                            </div>
                        </List.Item>
                    </Flex.Item>
                </Flex>
            </div>
        )
   }
}

export default TabVoteComponent;

