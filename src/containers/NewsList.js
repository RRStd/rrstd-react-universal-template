import { connect } from 'react-redux';

import { actionCreators as newsListActionCreators } from 'redux/reducers/newsList';

import { NewsList } from 'components/NewsList';


const mapStateToProps = (state, ownProps) => {
  const { maxItems } = ownProps;
  const newsIds = state.newsList.get('itemsIds').toJS();
  const newsItems = state.news.get('items').toJS();
  return {
    news: newsIds.filter(id => !!newsItems[id] || false).map(id => newsItems[id]).slice(0, maxItems),
    isNextPage: maxItems ? false : state.newsList.get('isNextPage'),
    page: state.newsList.get('page'),
  };
};

const mapDispatchToProps = {
  setPage: newsListActionCreators.setPage,
  setIsNextPage: newsListActionCreators.setIsNextPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
