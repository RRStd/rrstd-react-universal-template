import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';


export class TextArea extends React.Component {
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
      <div className={`text-area ${ !mods ? '' : `_${ mods.join(' _') }` }`}>
        <label className='text-area__label' htmlFor={input.id}>
          { label }
        </label>
        <textarea className='text-area__input'
          {...input} />
      </div>
    );
  }
}

export default TextArea;
