import React from 'react';
import Page from 'components/Page';

import About from './containers/AboutTabs';


export default () => ({
  path: '/about',
  component: props => (
    <Page
      title='About'
      content={
        <About {...props} />
      }
    />
  ),
});
