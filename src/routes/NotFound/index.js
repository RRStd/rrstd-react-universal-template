import React from 'react';

import Page from 'components/Page';


const NotFoundPage = (
  <Page
    title='not found'
    content={<h1>Page not found</h1>}
  />
);

export default (/* store */) => ({
  path: '*',
  component: () => NotFoundPage,
});
