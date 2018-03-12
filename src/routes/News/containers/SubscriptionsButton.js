import { connect } from 'react-redux';

import { actionCreators as modalsActionCreators } from 'redux/reducers/modals';
import SubscriptionsButton from '../components/SubscriptionsButton';


const mapStateToProps = (/* state */) => ({
});

const mapDispatchToProps = {
  showModal: modalsActionCreators.showModal,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsButton);
