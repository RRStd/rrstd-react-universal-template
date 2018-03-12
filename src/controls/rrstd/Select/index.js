import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';


export class Select extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    mods: PropTypes.array,
    children: PropTypes.node.isRequired,
  }

  render() {
    const {
      input,
      mods,
      label,
      children,
    } = this.props;
    return (
      <div className={`select ${ !mods ? '' : `_${ mods.join(' _') }` }`}>
        { label && <label className='select__label' htmlFor={name}>{ label }</label> }
        <select className='select__input'
          {...input}
        >
          {children}
        </select>
      </div>
    );
  }
}

export default Select;
