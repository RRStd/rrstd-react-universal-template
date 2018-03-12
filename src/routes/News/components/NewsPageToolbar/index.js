import React from 'react';

import { PageToolbar } from 'components/PageToolbar';

import SubscriptionsButton from '../../containers/SubscriptionsButton';


export class NewsPageToolbar extends PageToolbar {
  render() {
    return (
      <div className='page-toolbar'>
        <div className='right-content__element'>
          <SubscriptionsButton />
        </div>
      </div>
    );
  }
}

export default NewsPageToolbar;
