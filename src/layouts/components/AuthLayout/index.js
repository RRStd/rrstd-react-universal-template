import React from 'react';
import PropTypes from 'prop-types';

import { Logo } from 'components/Logo';

import './styles.styl';


export class AuthLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <div className='layout _auth'>
        <div className='layout__inner'>
          <div className='layout__col'>
            <div className='layout__col-inner'>
              <div className='layout__logo'><Logo isBig /></div>
            </div>
          </div>
          <div className='layout__col'>
            <div className='layout__col-inner'>
              <div className='layout__content'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthLayout;
