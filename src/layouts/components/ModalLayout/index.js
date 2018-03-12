import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';


export class ModalLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    name: PropTypes.string,
    headComponent: PropTypes.node,
    hideModal: PropTypes.func.isRequired,
    mods: PropTypes.array,
    close: PropTypes.bool,
  }

  render() {
    const {
      children,
      isOpen,
      name,
      headComponent,
      hideModal,
      mods,
      close,
    } = this.props;
    return (
      <div className={`modal-layout ${ isOpen ? '_visible' : '' } ${ !mods ? '' : `_${ mods.join(' _') }` }`}>
        <div className='modal-layout__inner'>
          <div className='modal-layout__content'>
            <div className='modal-layout__head'>
              <div className='modal-layout__head-left'>
                {name && <div className='modal-layout__title'>{ name }</div>}
                {headComponent}
              </div>
              {close !== false && <div className='modal-layout__close'
                onClick={() => {
                  hideModal();
                }} />}
            </div>
            <div className='modal-layout__body'>
              { children }
            </div>
          </div>
          <div className='modal-layout__overlay'
            onClick={() => {
              if(close !== false) {
                hideModal();
              }
            }} />
        </div>
      </div>
    );
  }
}

export default ModalLayout;
