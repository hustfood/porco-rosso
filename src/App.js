import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import randomColor from 'randomcolor';
import posed from 'react-pose';

import TabsComponent from './components/Tabs';

import TabbarContainer from './containers/Tabbar';
import RunBarrageContainer from './containers/RunBarrage';

import socket from './socketio';

import './App.css';

import {
    handle_barrage,
    add_message
} from "./actions";

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
    enter: {
        x: (props) => props.cw,
        y: (props) => props.h,
        transition: {
            duration: 5000,
            ease: 'linear'
        }
    },
    exit: {
        x: (props) => (0-props.w),
        transition: {
            duration: 5000,
            ease: 'linear'
        }
    }
});

class PoseBarrage extends React.Component {
  state = { pose: 'enter' };

  componentDidMount() {
      this.setState({ pose: 'exit'});
  }

  render() {
    return (
        <Box pose={this.state.pose} w={this.props.w} cw={this.props.cw} h={this.props.h} style={{
            color: this.props.color,
            position: 'fixed',
            zIndex: 999,
            fontSize: '6vw',
            fontWeight: 'bold',
            WebkitTextStroke: '0.05vw #000000'
        }}>
            {this.props.str}
        </Box>
    );
  }
}

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
            this.props.addBarrage(param);
            this.props.addMessage(param);
        });
        // socket.on('sync barrage', param => {
        //     this.handleAdd(param).then((_del) => {
        //         this.handleRemove(_del);
        //     });
        // });
    }
    handleAdd = (str) => {
        return new Promise((resolve, reject) => {
            const {ret_width, ret_height} = getItemSize(str);
            let all_channel = Math.floor(screen.height / ret_height * 0.8);
            let ret_channel = Math.floor(Math.random() * Math.floor(all_channel));
            let pose_height = screen.height * 0.05 + ret_channel * ret_height;
            let now_timestamp = Date.now();
            const new_ret = this.state.barrageRet.concat([[str,ret_width,pose_height,ret_height, randomColor(), now_timestamp]]);
            this.setState({barrageRet: new_ret});
            setTimeout(function () {
                resolve(now_timestamp);
            }, 6000)
        });
    };
    handleRemove = (_tag) => {
        let newItems = this.state.barrageRet.slice();
        let delIndex = newItems.findIndex(x => x[5] === _tag);
        newItems.splice(delIndex, 1);
        this.setState({barrageRet: newItems});
    };
    render() {
        const barrageItems = this.state.barrageRet.map((b, i) => (
            <PoseBarrage key={b[5]} str={b[0]} w={b[1]} cw={screen.width} h={b[2]} eh={b[3]} color={b[4]}/>
        ));
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                {/*{barrageItems}*/}
                {/*<TabsComponent/>*/}
                <RunBarrageContainer/>
                <TabbarContainer/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBarrage: barrage => {
            dispatch(handle_barrage.addBarrage(barrage))
        },
        addMessage: message => {
            dispatch(add_message(message));
        }
    }
};

export default connect(null, mapDispatchToProps)(App);
