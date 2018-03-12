import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';

import Subscriptions from '../../containers/Subscriptions';


class SubscriptionsButton extends React.Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
  }

  render() {
    const { showModal } = this.props;
    return (
      <div className='subscriptions-button' onClick={() => {
        showModal({
          node: <Subscriptions />,
          name: 'Subscriptions',
        });
      }}><div className='subscriptions-button__icon' />Subscriptions</div>
    );
  }
}

export default SubscriptionsButton;
