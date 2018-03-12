import React from 'react';

import { Tabs } from 'controls/rrstd/Tabs';


export class AboutTabs extends React.Component {
  static propTypes = {
  }
  render() {
    return (
      <div className='appointment__tabs'>
        <Tabs items={[
          {
            to: '/about/info',
            text: '[info]',
          },
          {
            to: '/about/contacts',
            text: '[contacts]',
          },
        ]} />
      </div>
    );
  }
}

export default AboutTabs;
