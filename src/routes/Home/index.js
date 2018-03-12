import React from 'react';

import Page from 'components/Page';


const HomePage = (
  <Page
    title='home'
    content={<h1>Home</h1>}
  />
);

export default () => ({
  component: () => HomePage,
});
