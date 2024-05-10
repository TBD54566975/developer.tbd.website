import React from 'react';
import Illustration from '../components/Illustration';
import SmallSocialButton from '../components/SmallSocialButton';
import TextLink from '../components/TextLink';

export function Footer() {
  const footer = {
    logoSrc: '/img/tbd-logo-square.svg',
    copyrightSignSrc: '/img/copyright-image.svg',
    year: new Date().getFullYear(),
    links: [
      {
        text: 'Legal',
        href: 'https://www.tbd.website/legal/terms',
      },
      {
        text: 'Code of Conduct',
        href: '/open-source/code-of-conduct',
      },
      {
        text: 'TBD Home',
        href: 'https://www.tbd.website',
      },
    ],
    socialText: 'Connect with us',
    socialButtons: [
      {
        src: '/img/github-icon.svg',
        url: 'https://github.com/TBD54566975/',
        altText: 'GitHub button',
        title: 'Go to GitHub',
      },
      {
        src: '/img/discord-icon.svg',
        url: 'https://discord.gg/tbd',
        altText: 'Discord button',
        title: 'Go to Discord',
      },
      {
        src: '/img/twitter-icon.svg',
        url: 'https://twitter.com/TBDevs',
        altText: 'Twitter button',
        title: 'Go to Twitter/X',
      },
      {
        src: '/img/youtube-icon.svg',
        url: 'https://www.youtube.com/@tbd.videos',
        altText: 'YouTube button',
        title: 'Go to YouTube',
      },
      {
        src: '/img/twitch-icon.svg',
        url: 'https://www.twitch.tv/tbdevs',
        altText: 'Twitch button',
        title: 'Go to Twitch',
      },
      {
        src: '/img/linkedin-icon.svg',
        url: 'https://www.linkedin.com/company/tbd54566975',
        altText: 'LinkedIn button',
        title: 'Go to LinkedIn',
      },
      {
        src: '/img/shopping-cart.svg',
        url: 'https://tbd.shop/',
        altText: 'TBD Shop',
        title: 'Go to TBD Shop',
      }
      /*

      Removed these social links until we'd like to be responsive to these mediums:
      https://github.com/TBD54566975/developer.tbd.website/issues/293
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
        src: '/img/tiktok-icon.svg',
        url: 'https://vm.tiktok.com/ZTdx4L1Ft/',
        altText: 'TikTok button',
        title: 'Go to TikTok',
      },
      */
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
          <ul className="flex justify-end flex-auto flex-wrap lg:flex-nowrap nav-links">
            {footer.links &&
              footer.links.map((link, index) => (
                <li key={index} className="ml-8 lg:ml-12 flex items-center py-0 mx-auto lg:mx-0">
                  <TextLink
                    className="py-0 text-primary-black hover:text-primary-black hoverLink"
                    href={link.href}
                    text={link.text}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col bg-black mt-9 tablet:h-18 desktop:h-32 tablet:px-6 desktop:px-12 tablet:mt-0 tablet:flex-row tablet:items-center desktop:flex-row">
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
        <div
          style={{
            background: `url('/img/footer-bottom-dark.svg'`,
            backgroundRepeat: 'repeat',
          }}
          className="bg-repeat-x h-6"
        ></div>
      </div>
    </footer>
  );
}

export default Footer;
