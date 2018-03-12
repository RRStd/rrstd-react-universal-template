import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';

class Checkbox extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.bool,
  }

  render() {
    const { id, name, value, text, checked, onChange, defaultChecked } = this.props;

    return (
      <div className='checkbox'>
        <input
          id={id}
          name={name}
          value={value}
          type='checkbox'
          className='checkbox__control'
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id} className='checkbox__label'>{text}</label>
      </div>
    );
  }
}

export default Checkbox;
