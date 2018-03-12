import React from 'react';
import PropTypes from 'prop-types';
import { NewsListItem } from './NewsListItem';

import './styles.styl';

export class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  static propTypes = {
    news: PropTypes.array,
    page: PropTypes.number.isRequired,
    haveMain: PropTypes.bool,
    isNextPage: PropTypes.bool.isRequired,
    setPage: PropTypes.func.isRequired,
    setIsNextPage: PropTypes.func.isRequired,
  }
  handleScroll() {
    const { setPage, setIsNextPage, page, isNextPage } = this.props;
    const { fetching } = this.state;
    const newsListBCR = this.newsList.getBoundingClientRect();
    const newsListBottomY = newsListBCR.y + newsListBCR.height;
    const windowY = window.pageYOffset || document.documentElement.scrollTop;
    if((windowY + window.innerHeight > newsListBottomY && !fetching) && isNextPage) {
      this.setState({ fetching: true });
      setPage(page + 1, {fetch: true}).then((action) => {
        this.setState({ fetching: false });
        if(action.response.data.length < 10) {
          this.setState({fetching: false});
          setIsNextPage(false);
        }
      });
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }
  render() {
    const { news, haveMain } = this.props;
    if(news) {
      return (
        <div className='news-list' ref={(r) => { this.newsList = r; }}>
          {news.map((el, i) => <NewsListItem
            mods={(i === 0 && haveMain) ? ['main'] : []}
            key={i}
            newsArticle={el}
          />)}
        </div>
      );
    }
    return null;
  }
}

export default NewsList;
