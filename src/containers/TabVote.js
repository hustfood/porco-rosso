import { connect } from 'react-redux';
import TabVoteComponent from '../components/_TabVote';

const mapStateToProps = state => {
    return {
        current_tab: state.current_tab
    }
};

const TabVoteContainer = connect(
    mapStateToProps,
    null
)(TabVoteComponent);

export default TabVoteContainer
