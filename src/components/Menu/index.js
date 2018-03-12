import React from 'react';
import PropTypes from 'prop-types';

import { IndexLink, Link } from 'react-router';

import './styles.styl';

export class Menu extends React.Component {
  static propTypes = {
    availableModules: PropTypes.array,
  }
  checkModule(moduleName) {
    const {
      availableModules,
    } = this.props;
    return availableModules.find(el => el === moduleName);
  }
  render() {
    return (
      <nav className='menu'>
        <div className='menu__inner'>
          <div className='menu__items'>
            <div className='menu__item'>
              <IndexLink to='/' className='menu__link' activeClassName='_active'>Home</IndexLink>
            </div>
            <div className='menu__item'>
              <Link to='/about' className='menu__link' activeClassName='_active'>About</Link>
            </div>
          </div>
          <div className='menu__items'>
            {this.checkModule('news') && <div className='menu__item'>
              <Link to='/news' className='menu__link' activeClassName='_active'>News</Link>
            </div>}
          </div>
        </div>
      </nav>
    );
  }
}

export default Menu;
