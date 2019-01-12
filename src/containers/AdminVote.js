import { connect } from 'react-redux';
import AdminVoteComponent from '../components/_AdminVote';

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

const AdminVoteContainer = connect(
    null,
    null
)(AdminVoteComponent);

export default AdminVoteContainer