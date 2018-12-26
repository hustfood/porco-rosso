import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import randomColor from 'randomcolor';

import posed, {PoseGroup} from 'react-pose';

import TabsComponent from './components/Tabs';

import socket from './socketio';

import './App.css';

class WidthItem extends Component {
    render() {
        return (
            <div style={{
                fontSize: '6vw',
                fontWeight: 'bold',
                WebkitTextStroke: '0.05vw #000000',
            }}>
                {this.props.str}
            </div>
        )
    }
}

function getItemSize(str) {
    let tmp = React.createElement(WidthItem, {str});
    let div = document.createElement('div');
    document.body.appendChild(div);
    div.id = 'tmp-class';
    div.style.position = 'absolute';
    div.style.top = '-999px';
    div.style.left = '-999px';
    ReactDOM.render(tmp, div);
    let ret_width = parseFloat(getComputedStyle(div).width);
    let ret_height = parseFloat(getComputedStyle(div).height);
    ReactDOM.unmountComponentAtNode(div);
    return {ret_width, ret_height};
}

const Box = posed.div({
    exit: {
        x: (props) => props.cw,
        y: (props) => props.h,
    },
    enter: {
        x: (props) => (0-props.w),
        transition: {
            duration: 5000,
            ease: 'linear'
        }
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tab_barrage',
            barrageRet: []
        }
    }
    componentDidMount() {
        socket.on('sync barrage', param => {
            this.handleAdd(param);
        });
    }
    handleAdd = (str) => {
        const {ret_width, ret_height} = getItemSize(str);
        let all_channel = Math.floor(screen.height / ret_height * 0.8);
        let ret_channel = Math.floor(Math.random() * Math.floor(all_channel));
        let pose_height = screen.height * 0.05 + ret_channel * ret_height;
        const newItems = this.state.barrageRet.concat([[str,ret_width,pose_height]]);
        this.setState({barrageRet: newItems});
    };
    handleRemove = (i) => {
        let newItems = this.state.barrageRet.slice();
        newItems.splice(i, 1);
        this.setState({barrageRet: newItems});
    };
    render() {
        const items = this.state.barrageRet.map((item, i) => {
            return (
                <Box key={i} pose={'enter'} w={item[1]} cw={screen.width} h={item[2]} style={{
                    color: randomColor(),
                    position: 'fixed',
                    zIndex: 999,
                    fontSize: '6vw',
                    fontWeight: 'bold',
                    WebkitTextStroke: '0.05vw #000000'
                }}>{item[0]}</Box>
            )
        });
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }} id='fff'>
                <PoseGroup>
                    {items}
                </PoseGroup>
                <TabsComponent/>
            </div>
        );
    }
}

export default App;
