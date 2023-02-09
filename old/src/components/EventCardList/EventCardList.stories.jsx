/* eslint-disable quotes */
import React from 'react';
import EventCardList from './EventCardList';
export default {
  title: 'EventCardList',
  component: EventCardList,
};

const Template = (args) => (
  <div className="max-w-[45.75rem]">
    <EventCardList {...args} />
  </div>
);
export const Events = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Events.args = {
  items: [
    {
      customProps: {
        description:
          'An open discussion about the architecture of various blockchains and why experienced software architects are concerned. ',
        duration: '9:22',
        timeEvent: '3:30 PM/EST',
        dateEvent: 'Wed May 30 2022',

        locationEvent: 'San Francisco, CA',
        thumbnail: '/img/placeholder-media-image.png',
        type: 'video',
      },
      docId: 'test',
      href: '/events/events/event-name',
      label: 'Event name lorem ipsum dolor emiatas',
      type: 'link',
    },
    {
      customProps: {
        description:
          'An open discussion about the architecture of various blockchains and why experienced software architects are concerned. ',
        duration: '9:22',
        timeEvent: '3:30 PM/EST',
        dateEvent: 'Wed May 30 2022',

        locationEvent: 'San Francisco, CA',
        thumbnail: '/img/placeholder-media-image.png',
        type: 'video',
      },
      docId: 'test',
      href: '/events/events/event-name',
      label: 'Event name lorem ipsum dolor emiatas',
      type: 'link',
    },
    {
      customProps: {
        description:
          'An open discussion about the architecture of various blockchains and why experienced software architects are concerned. ',
        duration: '9:22',
        timeEvent: '3:30 PM/EST',
        dateEvent: 'Wed May 30 2022',

        locationEvent: 'San Francisco, CA',
        thumbnail: '/img/placeholder-media-image.png',
        type: 'video',
      },
      docId: 'test',
      href: '/events/events/event-name',
      label: 'Event name lorem ipsum dolor emiatas',
      type: 'link',
    },
  ],
};
