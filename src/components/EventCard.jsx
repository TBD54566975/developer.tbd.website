/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
export default function EventCard({
  title,
  dateEvent,
  timeEvent,
  locationEvent,
  locationLink,
  description,
  thumbnail,
  url,
  type,
  duration,
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
  const [seconds, minutes, hours] = `${duration}`
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
    <div className="not-prose">
      {thumbnail ? (
        <div className="border-2 border-solid border-accent-cyan w-fit shadow-button-sh-cyan hover:shadow-button-sh-hv-cyan hover:translate-x-[4px] hover:translate-y-[4px] mb-8">
          <a
            href={url}
            aria-label={linkLabel}
            target={isExternalLink ? '_blank' : ''}
            rel={isExternalLink ? 'noopener noreferrer' : ''}
          >
            <img src={thumbnail} alt="" className="max-w-full w-full" />
          </a>
        </div>
      ) : null}
      <div className="mb-4 tablet:mb-6">
        <h2 className="h2 font-medium text-primary-yellow">{title}</h2>
      </div>

      <div className="text-primary-yellow mb-6">
        <span className="copy-sm block">
          {dateEvent} | {timeEvent}
        </span>
        <div className="flex">
          <span className="copy-sm block mr-2">Location:</span>
          {!locationLink ? (
            <span className="copy-sm block">{locationEvent}</span>
          ) : (
            <a
              href={locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-cyan underline hover:no-underline"
            >
              <span className="copy-sm block">{locationEvent}</span>
            </a>
          )}
        </div>
      </div>
      <div className="mb-6">
        <p className="copy text-primary-yellow">{description}</p>
      </div>
      <div>
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
            src="/img/blue-arrow-right.svg"
            alt=""
            className="relative top-[2px]"
          />
        </a>
      </div>
    </div>
  );
}
