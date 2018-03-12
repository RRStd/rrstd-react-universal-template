import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';

export class Radio extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    mods: PropTypes.array,
  }

  render() {
    const {
      input,
      mods,
      label,
    } = this.props;
    return (
      <div className={`radio ${ !mods ? '' : `_${ mods.join(' _') }` }`}>
        <input className='radio__control'
          {...input}
          type='radio' />
        <label htmlFor={input.id} className='radio__label'>
          {label}
        </label>
      </div>
    );
  }
}

export default Radio;
