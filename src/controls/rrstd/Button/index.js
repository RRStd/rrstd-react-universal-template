import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';


export class Button extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
    text: PropTypes.string,
    mods: PropTypes.array,
    disabled: PropTypes.bool,
    button: PropTypes.object,
  }

  render() {
    const {
      clickHandler,
      text,
      mods,
      disabled,
      button,
    } = this.props;

    const props = {
      className: `button ${ !mods ? '' : `_${ mods.join(' _') }` }`,
    };

    if( disabled ) {
      props.onClick = e => e.preventDefault();
      props.className += ' _disabled';
    } else if( clickHandler ) {
      props.onClick = e => clickHandler(e);
    }

    return (
      <button {...props} {...button}>
        <div className='button__text'>{ text }</div>
      </button>
    );
  }
}


export default Button;
