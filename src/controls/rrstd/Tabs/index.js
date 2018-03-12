import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './styles.styl';

export class Tabs extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  render() {
    const { items } = this.props;

    return (
      <div className='tabs'>
        {items.map((el, i) => (
          <Link
            className='tabs__item'
            to={el.to}
            key={i}
            activeClassName='_active'
            >
            {el.text}
          </Link>
          ))}
      </div>
    );
  }
}

export default Tabs;
