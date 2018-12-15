import React, { Component } from 'react';
import * as ons from 'onsenui';
import * as Ons from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './App.css';

class App extends Component {
    handleClick = () => {
        ons.notification.alert('Hello food!');
    };
    render() {
        return (
            <Ons.Page>
                <Ons.Button onClick={this.handleClick}>Tap me!</Ons.Button>
            </Ons.Page>
        );
    }
}

export default App;
