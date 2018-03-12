import { connect } from 'react-redux';

import { actionCreators as modalsActionCreators } from 'redux/reducers/modals';
import { ModalLayout } from '../components/ModalLayout';


const mapStateToProps = (/* state */) => ({
});

const mapDispatchToProps = {
  hideModal: modalsActionCreators.hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLayout);
