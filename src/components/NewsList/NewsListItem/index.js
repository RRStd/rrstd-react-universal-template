import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { mounthMap, dayMap } from 'utils/date';

import './styles.styl';


export class NewsListItem extends React.Component {
  static propTypes = {
    newsArticle: PropTypes.object,
    mods: PropTypes.array,
  }
  render() {
    const { newsArticle, mods } = this.props;
    if(newsArticle) {
      if(newsArticle.notifyUser) {
        mods.push('notify');
      }
      if(typeof newsArticle.read === 'undefined' || newsArticle.read) {
        mods.push('read');
      }
      const date = new Date(newsArticle.publishDate);
      return (
        <Link className={`news-list__item ${ !mods ? '' : `_${ mods.join(' _') }` }`}
          to={`/news/article/${ newsArticle.id }`}>
          <div className='news-list__item-image-wrapper'>
            <div className='news-list__item-image'
              style={{ backgroundImage: `url("${ newsArticle.imgUrl }")` }} />
          </div>
          <div className='news-list__item-content'>
            <div className='news-list__item-date'>
              {dayMap[date.getDay()]}, {date.getDate()} {mounthMap[date.getMonth()]} —&nbsp;
              {newsArticle.categoryName || ''}{newsArticle.notifyUser ? '!' : ''}
            </div>
            <h3 className='news-list__item-title'>{newsArticle.title}</h3>
            <p className='news-list__item-description'>{newsArticle.text}</p>
          </div>
        </Link>
      );
    }
    return null;
  }
}

export default NewsListItem;
