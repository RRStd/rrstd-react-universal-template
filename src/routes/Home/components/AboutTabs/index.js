import React from 'react';
import PropTypes from 'prop-types';

import { Tabs } from 'controls/rrstd/Tabs';

import './styles.styl';


export class AboutTabs extends React.Component {
  static propTypes = {
    lang: PropTypes.object,
  }
  render() {
    const { lang = {} } = this.props;
    return (
      <div className='about__tabs'>
        <Tabs
          items={[{
            to: '/about/planned',
            text: lang.planned,
          }, {
            to: '/about/previous',
            text: lang.previous,
          }]}
        />
      </div>
    );
  }
}

export default AboutTabs;
