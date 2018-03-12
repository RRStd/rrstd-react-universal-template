import { connect } from 'react-redux';

import { AuthLayout } from '../components/AuthLayout';


const mapStateToProps = state => ({
  modalChildrens: state.modals.get('modalChildrens').toJS(),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
