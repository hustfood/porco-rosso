import { connect } from 'react-redux';
import AdminOtherComponent from '../components/_AdminOther';

// import {
//     set_win_group
// } from "../actions";

// const mapStateToProps = state => {
//     return {
//         admin_current_tab: state.admin_current_tab
//     }
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         setWinGroup: group => {
//             dispatch(set_win_group(group))
//         }
//     }
// };

const AdminOtherContainer = connect(
    null,
    null
)(AdminOtherComponent);

export default AdminOtherContainer