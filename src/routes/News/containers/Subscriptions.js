import { connect } from 'react-redux';

import { actionCreators as modalsActionCreators } from 'redux/reducers/modals';
import { actionCreators as subscriptionsActionCreators } from 'redux/reducers/subscriptions';
import Subscriptions from '../components/Subscriptions';


const mapStateToProps = state => ({
  categories: state.subscriptions.get('categories').toJS(),
});

const mapDispatchToProps = {
  hideModal: modalsActionCreators.hideModal,
  setCategories: subscriptionsActionCreators.setCategories,
  clearCategories: subscriptionsActionCreators.clearCategories,
};


export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
