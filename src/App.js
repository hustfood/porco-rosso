import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import randomColor from 'randomcolor';

import TabbarContainer from './containers/Tabbar';
import RunBarrageContainer from './containers/RunBarrage';

import socket from './socketio';
// import { getSocket } from "./socketio";

import './App.css';

import {
    handle_barrage,
    handle_unread_message_count,
    add_message,
} from "./actions";

import { TABS } from "./constants";
const { BARRAGE_TAB } = TABS;

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

            this.props.addMessage(param);

            if (this.props.current_tab !== BARRAGE_TAB) {
                this.props.setUnreadMessageCount();
            }
        });
        // getSocket().then(socket => {
        //     socket.on('sync barrage', param => {
        //         const now_timestamp = Date.now();
        //         const {ret_width, ret_height} = getItemSize(param);
        //         let all_channel = Math.floor(screen.height / ret_height * 0.8);
        //         let ret_channel = Math.floor(Math.random() * Math.floor(all_channel));
        //         let pose_height = screen.height * 0.05 + ret_channel * ret_height;
        //         this.props.asyncBarrage(param, ret_width, pose_height, randomColor(), now_timestamp);
        //
        //         this.props.addMessage(param);
        //
        //         if (this.props.current_tab !== BARRAGE_TAB) {
        //             this.props.setUnreadMessageCount();
        //         }
        //     });
        // })
    }
    render() {
        return (
            <div>
                <RunBarrageContainer/>
                <TabbarContainer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        current_tab: state.current_tab
    }
};

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
        },
        addMessage: message => {
            dispatch(add_message(message));
        },
        setUnreadMessageCount: () => {
            dispatch(handle_unread_message_count.addUnreadMessageCount())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
