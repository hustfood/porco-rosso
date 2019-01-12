import { connect } from 'react-redux';
import AdminRewardComponent from '../components/_AdminReward';

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

const AdminRewardContainer = connect(
    null,
    null
)(AdminRewardComponent);

export default AdminRewardContainer