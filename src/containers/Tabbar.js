import { connect } from 'react-redux';
import TabbarComponent from '../components/_Tabbar';

import {
    set_current_tab
} from "../actions";


const mapStateToProps = state => {
    return {
        current_tab: state.current_tab,
        unread_message_count: state.unread_message_count
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentTab: tab => {
            dispatch(set_current_tab(tab))
        }
    }
};

const TabbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabbarComponent);

export default TabbarContainer