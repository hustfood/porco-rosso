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
    return barrages.map((item) => {
        return (
            <PoseBarrage key={item.timestamp} str={item.barrage} w={item.width} cw={screen.width} h={item.height}  color={item.color} />
        )
    });
};

export default RunBarrageComponent