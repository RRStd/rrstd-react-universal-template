import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';


export class Photo extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  }
  render() {
    const { url } = this.props;
    return (
      <div className='photo'>
        <div className='photo__body'
          style={{ backgroundImage: `url("${ url }")` }} />
      </div>
    );
  }
}

export default Photo;
