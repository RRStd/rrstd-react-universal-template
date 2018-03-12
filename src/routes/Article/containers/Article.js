import { connect } from 'react-redux';

import { Article } from '../components/Article';


const mapStateToProps = (state, ownProps) => {
  const article = state.news.get('items').toJS()[ownProps.articleId];
  return {
    article: article || null,
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
