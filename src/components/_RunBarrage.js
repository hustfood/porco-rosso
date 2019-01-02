import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import posed from 'react-pose';

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

const WidthItem = ({str}) => (
    <div style={{
        fontSize: '6vw',
        fontWeight: 'bold',
        WebkitTextStroke: '0.05vw #000000',
    }}>
        {str}
    </div>
);

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

const RunBarrageComponent = ({ barrages }) => {
    const barrageItems = barrages.map((b, i) => {
        // const {ret_width, ret_height} = getItemSize(str);
        // let all_channel = Math.floor(screen.height / ret_height * 0.8);
        // let ret_channel = Math.floor(Math.random() * Math.floor(all_channel));
        // let pose_height = screen.height * 0.05 + ret_channel * ret_height;
        // let now_timestamp = Date.now();
        // const new_ret = this.state.barrageRet.concat([[str,ret_width,pose_height,ret_height, randomColor(), now_timestamp]]);
        // return (
        //     <PoseBarrage key={b[5]} str={b[0]} w={b[1]} cw={screen.width} h={b[2]} eh={b[3]} color={b[4]}/>
        // )
        return (
            <div key={i}>{b}</div>
        )
    });
    return (
        <div>
            {barrageItems}
        </div>
    )
};

export default RunBarrageComponent