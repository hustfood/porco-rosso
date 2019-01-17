import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import randomColor from 'randomcolor';

import RunBarrageContainer from './containers/RunBarrage';
import AdminTabsContainer from './containers/AdminTabs';

import socket from './socketio';

import './App.css';

import {
    handle_barrage
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
    div.style.position = 'absolute';
    div.style.top = '-999px';
    div.style.left = '-999px';
    ReactDOM.render(tmp, div);
    let ret_width = parseFloat(getComputedStyle(div).width);
    let ret_height = parseFloat(getComputedStyle(div).height);
    ReactDOM.unmountComponentAtNode(div);
    return {ret_width, ret_height};
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
            const now_timestamp = Date.now();
            const {ret_width, ret_height} = getItemSize(param);
            let all_channel = Math.floor(screen.height / ret_height * 0.8);
            let ret_channel = Math.floor(Math.random() * Math.floor(all_channel));
            let pose_height = screen.height * 0.05 + ret_channel * ret_height;
            this.props.asyncBarrage(param, ret_width, pose_height, randomColor(), now_timestamp);
        });
    }
    render() {
        return (
            <div>
                <RunBarrageContainer/>
                <AdminTabsContainer/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        asyncBarrage: (barrage, width, height, color, timestamp) => {
            let addPromise = () => {
                return new Promise(resolve => {
                    dispatch(handle_barrage.addBarrage(barrage, width, height, color, timestamp));
                    setTimeout(function () {
                        resolve(handle_barrage.delBarrage(timestamp));
                    }, 6000)
                })
            };
            dispatch(addPromise())
        }
    }
};

export default connect(null, mapDispatchToProps)(App);
