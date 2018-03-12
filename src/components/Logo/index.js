import React from 'react';
import PropTypes from 'prop-types';

import { IndexLink } from 'react-router';

import './styles.styl';

export class Logo extends React.Component {
  static propTypes = {
    isBig: PropTypes.any,
  }

  render() {
    const { isBig } = this.props;
    return (
      <IndexLink to='/'>
        <div className={`logo ${ isBig ? '_big' : '' }`} />
      </IndexLink>
    );
  }
}

export default Logo;
