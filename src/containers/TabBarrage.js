import { connect } from 'react-redux';
import TabBarrageComponent from '../components/_TabBarrage';


const mapStateToProps = state => {
    return {
        messages: state.messages
    }
};

const TabBarrageContainer = connect(
    mapStateToProps,
    null
)(TabBarrageComponent);

export default TabBarrageContainer
