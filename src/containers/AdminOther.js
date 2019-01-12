import { connect } from 'react-redux';
import AdminOtherComponent from '../components/_AdminOther';

// import {
//     set_admin_current_tab
// } from "../actions";
//
// const mapStateToProps = state => {
//     return {
//         admin_current_tab: state.admin_current_tab
//     }
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         setAdminCurrentTab: tab => {
//             dispatch(set_admin_current_tab(tab))
//         }
//     }
// };

const AdminOtherContainer = connect(
    null,
    null
)(AdminOtherComponent);

export default AdminOtherContainer