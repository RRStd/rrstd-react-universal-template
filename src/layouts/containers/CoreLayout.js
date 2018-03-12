import { connect } from 'react-redux';

import { CoreLayout } from '../components/CoreLayout';


const mapStateToProps = state => ({
  modalChildrens: state.modals.get('modalChildrens').toJS(),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
