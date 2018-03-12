import React from 'react';
import PropTypes from 'prop-types';

import Button from 'controls/rrstd/Button';
import Checkbox from 'controls/rrstd/Checkbox';

import './styles.styl';

class Subscriptions extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    hideModal: PropTypes.func.isRequired,
    setCategories: PropTypes.func.isRequired,
    clearCategories: PropTypes.func.isRequired,
  }

  handleSubmit(e) {
    e.preventDefault();
    const { setCategories, hideModal } = this.props;
    const { target } = e;

    const categories = {};

    target.querySelectorAll('input[name="categories"]').forEach((checkbox) => {
      categories[checkbox.value] = checkbox.checked;
    });

    setCategories(categories);
    hideModal();
  }

  render() {
    const { categories, clearCategories, hideModal } = this.props;

    return (
      <form className='subscriptions' onSubmit={e => this.handleSubmit(e)}>
        <div className='subscriptions__inner'>
          <div className='subscriptions__title'>Choose news categories you’d like us to notify you about?</div>
          <div className='subscriptions__fields'>
            <div className='subscriptions__row'>
              <div className='subscriptions__fieldset'>
                <div className='subscriptions__fieldset-title'>Category</div>
                <div className='subscriptions__fieldset-items'>
                  {categories.map((category, i) => (
                    <div className='subscriptions__fieldset-item' key={i}>
                      <Checkbox
                        id={`${ category.Id }`}
                        name='categories'
                        text={category.name}
                        defaultChecked={category.signed === 'true'}
                        value={`${ category.Id }`} />
                    </div>
                    ))}
                </div>
              </div>
              <div className='subscriptions__fieldset'>
                <div className='subscriptions__fieldset-title'>Notifications</div>
                <div className='subscriptions__fieldset-items'>
                  <div className='subscriptions__fieldset-item'>
                    <Checkbox
                      id='sms'
                      name='notifications'
                      text='SMS'
                      value='sms' />
                  </div>
                  <div className='subscriptions__fieldset-item'>
                    <Checkbox
                      id='push'
                      name='notifications'
                      text='Push'
                      value='push' />
                  </div>
                  <div className='subscriptions__fieldset-item'>
                    <Checkbox
                      id='email'
                      name='notifications'
                      text='E-mail'
                      value='email' />
                  </div>
                  <div className='subscriptions__fieldset-item'>
                    <Checkbox
                      id='inmail'
                      name='notifications'
                      text='InMail'
                      value='inmail' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='subscriptions__buttons'>
            <div className='subscriptions__button'>
              <Button text='Apply' />
            </div>
            <div className='subscriptions__button'>
              <Button text='Clear all' mods={['secondary']} clickHandler={(e) => {
                e.preventDefault();
                clearCategories();
                hideModal();
              }} />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Subscriptions;
