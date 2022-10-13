import React from 'react';
import {
  Illustration,
  SmallSocialButton,
  TextLink,
} from '@site/src/components';

export function Footer() {
  const footer = {
    logoSrc: '/img/tbd-logo-square.svg',
    copyrightSignSrc: '/img/copyright-image.svg',
    year: 2022,
    links: [
      {
        text: 'Legal',
        href: 'https://www.tbd.website/legal',
      },
      {
        text: 'Code of Conduct',
        href: '/code-of-conduct',
      },
    ],
    socialText: 'Connect with us',
    socialButtons: [
      {
        src: '/img/twitter-icon.svg',
        url: 'https://twitter.com/tbd54566975?lang=en',
        altText: 'Twitter button',
        title: 'Go to Twitter',
      },
      {
        src: '/img/linkedin-icon.svg',
        url: 'https://www.linkedin.com/company/tbd54566975',
        altText: 'LinkedIn button',
        title: 'Go to LinkedIn',
      },
      {
        src: '/img/youtube-icon.svg',
        url: 'https://www.youtube.com/channel/UCRAYhEkp3fEuYQAzteNqHsA/featured',
        altText: 'YouTube button',
        title: 'Go to YouTube',
      },
      {
        src: '/img/vimeo-icon.svg',
        url: 'https://vimeo.com/tbd54566975',
        altText: 'Vimeo button',
        title: 'Go to Vimeo',
      },
      {
        src: '/img/instagram-icon.svg',
        url: 'https://instagram.com/tbd54566975?igshid=YmMyMTA2M2Y=',
        altText: 'Instagram button',
        title: 'Go to Instagram',
      },
      {
        src: '/img/discord-icon.svg',
        url: 'https://discord.gg/tbd',
        altText: 'Discord button',
        title: 'Go to Discord',
      },
      {
        src: '/img/twitch-icon.svg',
        url: 'https://www.twitch.tv/tbd54566975',
        altText: 'Twitch button',
        title: 'Go to Twitch',
      },
      {
        src: '/img/tiktok-icon.svg',
        url: 'https://vm.tiktok.com/ZTdx4L1Ft/',
        altText: 'TikTok button',
        title: 'Go to TikTok',
      },
      {
        src: '/img/discourse-icon.svg',
        url: 'https://forums.tbd.website/',
        altText: 'TBD Forum button',
        title: 'Go to TBD Forum',
      },
      {
        src: '/img/github-icon.svg',
        url: 'https://github.com/TBD54566975/',
        altText: 'GitHub button',
        title: 'Go to GitHub',
      }
    ],
    isLegal: false,
  };

  return (
    <footer>
      <div className="pt-12 tablet:pt-14 desktop:pt-18 pb-14 desktop:pb-24 max-w-container desktop:mx-auto">
        <div className="relative h-auto overflow-hidden invertDarkMode bg-primary-yellow p-0.5">
          <Illustration
            className="relative h-[14px] w-full"
            imgStyle="absolute top-0 left-0 bottom-0 m-auto object-cover max-h-full max-w-full min-h-full min-w-full"
            img="/img/marquee-d-1440.svg"
            accentClass="tbd-white-illustration"
            alt=""
          />
        </div>

        <div className="flex h-[116px] tablet:h-[132px] desktop:h-[236px] items-center text-primary-black px-4 tablet:px-6 desktop:px-12 bg-primary-yellow">
          <div className="flex items-center align-middle">
            <span className="mr-1 tablet:mr-3">
              <Illustration
                className="relative w-[50px] h-[50px]"
                img={footer.logoSrc}
                alt="TBD"
              />
            </span>
            <span className="mx-3">
              <Illustration
                className="relative h-[84px] w-[84px] desktop:w-[140px] desktop:h-[140px] "
                img={footer.copyrightSignSrc}
                alt="copyright"
              />
            </span>
            <span className="copy">{footer.year}</span>
          </div>
          <ul className="flex justify-end flex-auto nav-links">
            {footer.links &&
              footer.links.map((link, index) => (
                <li key={index} className="ml-12 flex items-center py-0.5">
                  <TextLink
                    className="py-3 text-primary-black hover:text-primary-black"
                    href={link.href}
                    text={link.text}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col bg-black mt-9 tablet:h-18 desktop:h-30 tablet:px-6 desktop:px-12 tablet:mt-0 tablet:flex-row tablet:items-center desktop:flex-row">
          <div className="flex-1">
            <p className={'copy text-primary-yellow'}>{footer.socialText}</p>
          </div>
          <div className="flex-1 block h-full tablet:flex tablet:justify-end">
            <div className="grid grid-cols-4 my-10 place-items-center gap-9 tablet:gap-3 desktop:gap-6 tablet:my-0 tablet:flex tablet:justify-end">
              {footer.socialButtons.map((socialButton, idx) => (
                <SmallSocialButton
                  key={`sb-${idx}`}
                  src={socialButton.src}
                  url={socialButton.url}
                  altText={socialButton.altText}
                  title={socialButton.title}
                  isBlackWhite={false}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-repeat-x h-[10px] bg-[url('/img/footer-bottom-dark.svg')]"></div>
      </div>
    </footer>
  );
}

export default Footer;
