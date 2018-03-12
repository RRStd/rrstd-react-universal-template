import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './styles.styl';

export class Page extends React.Component {
  static propTypes = {
    backUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rightContent: PropTypes.node,
    toolbar: PropTypes.node,
    content: PropTypes.node,
    children: PropTypes.node,
  }
  render() {
    const { backUrl, title, rightContent, content, children, toolbar } = this.props;
    return (
      <div className='page'>
        <div className='page__head'>
          <div className='page__head-left'>
            { backUrl ? <Link className='page__head-arrow' to={backUrl} /> : '' }
            <h2 className='page__title'>{ title }</h2>
          </div>
          <div className='page__head-right'>
            { toolbar || rightContent }
          </div>
        </div>
        <div className='page__content'>
          { content || children }
        </div>
      </div>
    );
  }
}

export default Page;
