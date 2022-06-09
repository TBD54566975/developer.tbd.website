/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Divider } from '../Divider';
export default function EventCard({
  title,
  dateEvent,
  timeEvent,
  location,
  description,
  author,
  image,
  url,
  type,
  time,
  isExternalLink,
}) {
  let icon = null;
  if (type === 'video') {
    icon = '/img/video-media-icon.svg';
  } else if (type === 'audio') {
    icon = '/img/audio-media-icon.svg';
  } else if (type === 'article') {
    icon = '/img/article-media-icon.svg';
  }
  const [seconds, minutes, hours] = `${time}`
    .split(':')
    .reverse()
    .map((el) => parseInt(el));
  let DurationText = '';
  if (hours || minutes || seconds) DurationText += ' Duration:';
  if (hours) DurationText += ` ${hours}h`;
  if (minutes) DurationText += ` ${minutes}min`;
  if (seconds) DurationText += ` ${seconds}sec`;

  const linkLabel = `${
    isExternalLink ? 'Opens in a new tab: ' : ''
  } ${title}.${DurationText}`;

  return (
    <div>
      <div className="border-2 border-solid border-accent-cyan w-fit shadow-button-sh-cyan hover:shadow-button-sh-hv-cyan hover:translate-x-[4px] hover:translate-y-[4px] mb-8">
        <a
          href={url}
          aria-label={linkLabel}
          target={isExternalLink ? '_blank' : ''}
          rel={isExternalLink ? 'noopener noreferrer' : ''}
        >
          <img src={image} alt="" className="max-w-[27.25rem] w-full" />
        </a>
        <div className="flex h-0 justify-between">
          <div className="relative -top-9 left-3 h-6 w-6 bg-primary-black">
            <img
              src={icon}
              alt=""
              aria-hidden="true"
              className="media-icon h-6 w-6 fill-primary-black dark:fill-primary-yellow "
            />
          </div>
          {type !== 'article' ? (
            <div className="relative -top-9 -left-3 h-7 w-fit bg-primary-black text-accent-cyan px-[6px] py-[4px]">
              <p className="copy-sm">{time}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="mb-4 tablet:mb-6">
        <h2 className="h2 font-medium text-primary-yellow">{title}</h2>
      </div>

      <div className="copy-sm text-primary-yellow mb-6">
        <p>
          {dateEvent} | {timeEvent}
        </p>
        <p>{location}</p>
        <p>Posted by {author}</p>
      </div>
      <div className="mb-6">
        <p className="copy text-primary-yellow">{description}</p>
      </div>
      <div className=" mb-12 desktop:mb-18">
        <a
          href={url}
          target={isExternalLink ? '_blank' : ''}
          rel={isExternalLink ? 'noopener noreferrer' : ''}
          className="flex gap-x-2"
        >
          <p className=" text-accent-cyan nav-links underline underline-offset-2">
            Learn More
          </p>
          <img
            src="/img/arrow-blue.svg"
            alt=""
            className="relative top-[2px]"
          />
        </a>
      </div>
      <Divider type="dotted" />
    </div>
  );
}
