import { connect } from 'react-redux';

import { Menu } from 'components/Menu';


const mapStateToProps = (/* state */) => ({
  // availableModules: state.app.get('availableModules').toJS() || [],
  availableModules: [ 'news' ],
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
