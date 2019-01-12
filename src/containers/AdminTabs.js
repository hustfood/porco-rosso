import { connect } from 'react-redux';
import AdminTabsComponent from '../components/_AdminTabs';

import {
    set_admin_current_tab
} from "../actions";

const mapStateToProps = state => {
    return {
        admin_current_tab: state.admin_current_tab
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAdminCurrentTab: tab => {
            dispatch(set_admin_current_tab(tab))
        }
    }
};

const AdminTabsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminTabsComponent);

export default AdminTabsContainer