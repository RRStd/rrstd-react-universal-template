import React from 'react';
import PropTypes from 'prop-types';

import ModalLayout from 'layouts/containers/ModalLayout';
import Menu from 'containers/Menu';
import { Logo } from 'components/Logo';

import './styles.styl';


export class CoreLayout extends React.Component {
  static propTypes = {
    modalChildrens: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const {
      children,
      modalChildrens,
    } = this.props;
    // console.log('CoreLayout children', children)
    const activeModalChildren = [...modalChildrens].pop();
    return (
      <div className='layout'>
        <div className='layout__inner'>
          <div className='layout__col'>
            <div className='layout__col-inner'>
              <div className='layout__logo'><Logo /></div>
              <div className='layout__menu'><Menu /></div>
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
        <div className='layout__modal'>
          <ModalLayout isOpen={!!modalChildrens.length} {...activeModalChildren}>
            { activeModalChildren ? activeModalChildren.node : null }
          </ModalLayout>
        </div>
      </div>
    );
  }
}

export default CoreLayout;
