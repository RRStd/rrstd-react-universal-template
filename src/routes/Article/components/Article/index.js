import React from 'react';
import PropTypes from 'prop-types';

import { mounthMap, dayMap } from 'utils/date';

import './styles.styl';


export class Article extends React.Component {
  static propTypes = {
    article: PropTypes.object,
  }

  render() {
    const { article } = this.props;
    if(!article) {
      return null;
    }
    const date = new Date(article.publishDate);
    return (
      <div className='article'>
        <div className={`article__date ${ article.notifyUser ? '_notify' : '' }`}>
          {dayMap[date.getDay()]}, {date.getDate()} {mounthMap[date.getMonth()]} —&nbsp;
          { article.categoryName || (
            article.newsCategories
            && article.newsCategories.length
            && article.newsCategories[0].name)
          }{article.notifyUser ? '!' : ''}
        </div>
        <h1 className='article__title'>{ article.title }</h1>
        {article.imgUrl && <div className='article__image-wrapper'>
          <img src={article.imgUrl} alt='Image' className='article__image' />
        </div>}
        {article.text.split('\n\n').map( (content, index) => (
          <div className='article__text' key={index}>{content}</div>
        ))}
      </div>
    );
  }
}

export default Article;
