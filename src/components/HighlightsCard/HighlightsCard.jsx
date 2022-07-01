/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
export default function HighlightsCard({
  title,
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
      <div className="border-2 border-solid border-accent-cyan w-fit shadow-button-sh-cyan hover:shadow-button-sh-hv-cyan hover:translate-x-[4px] hover:translate-y-[4px] mb-8">
        <a
          href={url}
          aria-label={linkLabel}
          className=""
          target={isExternalLink ? '_blank' : ''}
          rel={isExternalLink ? 'noopener noreferrer' : ''}
        >
          <img src={thumbnail} alt="" />
        </a>
        <div className="flex h-0 justify-between">
          <div className="relative -top-9 left-3 h-6 w-6 bg-primary-black">
            <img
              src={icon}
              alt=""
              aria-hidden="true"
              className="media-icon h-6 w-6 fill-primary-black dark:fill-primary-yellow"
            />
          </div>
          {type !== 'article' ? (
            <div className="relative -top-9 -left-3 h-7 w-fit bg-primary-black text-accent-cyan px-[6px] py-[4px]">
              <p className="copy-sm">{duration}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="h3 font-medium text-primary-yellow">{title}</h3>
      </div>
    </div>
  );
}
