import { connect } from 'react-redux';
import RunBarrageComponent from '../components/_RunBarrage';

const mapStateToProps = state => {
    return {
        barrages: state.barrages,
    }
};

const RunBarrageContainer = connect(
    mapStateToProps,
    null
)(RunBarrageComponent);

export default RunBarrageContainer
