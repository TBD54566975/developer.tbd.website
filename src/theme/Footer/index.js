
   
import React, { useEffect, useState } from 'react';
import { Illustration } from '../../components/Illustration';
import { SmallSocialButton } from '../../components/SmallSocialButton';
import { Container } from '../../components/Container';
import { TextLink } from '../../components/TextLink/TextLink';

export function Footer() {
  const [bgColorDark, setBgColorDark] = useState('');
  const [footerBottomDark, setFooterBottomDark] = useState('');

  const footer = {
    logoSrc: '/img/tbd-logo-square.svg',
    copyrightSignSrc: '/img/copyright-image.svg',
    year: 2022,
    links: [
      {
        text: 'Legal',
        href: 'https://www.tbd.website/legal',
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
        url: 'https://discord.gg/MASAPKPYJM',
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
    ],
    isLegal: false
  }

  useEffect(() => {
    setFooterBottomDark("dark:bg-[url('/img/footer-bottom-dark.svg')]");
    setBgColorDark('bg-primary-yellow');

    if (footer.isLegal) {
      setBgColorDark('dark:bg-primary-white');
      setFooterBottomDark("dark:bg-[url('/img/footer-bottom-dark-bw.svg')]");
    }
  }, [footer.isLegal]);

  return (
    <footer>
      <Container className="pt-12 tablet:pt-14 desktop:pt-18 pb-14 desktop:pb-24">
        <div
          className={
            'relative h-[18px] invertDarkMode overflow-hidden ' +
            bgColorDark
          }
        >
          <Illustration
            className="relative h-[18px] w-full"
            img="/img/footer-top-marquee.svg"
            objectFit="cover"
            accentClass="tbd-white-illustration"
            alt=""
          />
        </div>

        <div
          className={
            'flex h-[116px] tablet:h-[132px] desktop:h-[236px] items-center invertDarkMode' +
            'text-primary-yellow text-primary-black px-4 tablet:px-6 desktop:px-12 ' +
            bgColorDark
          }
        >
          <div className="flex items-center align-middle">
            <span className="mr-1 tablet:mr-3">
              <Illustration
                className="relative w-[50px] h-[50px]"
                img={footer.logoSrc}
                accentClass="tbd-yellow-illustration"
                alt="TBD"
              />
            </span>
            <span className="mx-3">
              <Illustration
                className="relative h-[84px] w-[84px] desktop:w-[140px] desktop:h-[140px] "
                img={footer.copyrightSignSrc}
                accentClass="tbd-yellow-illustration"
                alt="copyright"
              />
            </span>
            <span className="copy">{footer.year}</span>
          </div>
          <ul className="nav-links flex flex-auto justify-end">
            {footer.links &&
              footer.links.map((link, index) => (
                <li
                  key={index}
                  className={`ml-12 flex items-center py-0.5 border-b-2 border-b-primary-black`}
                >
                  <TextLink
                    className={'py-3 border-b-2 border-b-primary-black text-primary-black'}
                    isInverse={true}
                    href={link.href}
                    text={link.text}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="mt-9 flex flex-col bg-black tablet:h-18 desktop:h-30 tablet:px-6 desktop:px-12 tablet:mt-0 tablet:flex-row tablet:items-center desktop:flex-row">
          <div className="flex-1">
            <p className={'copy text-primary-yellow'}>{footer.socialText}</p>
          </div>
          <div className="flex-1 h-full block tablet:flex tablet:justify-end">
            <div className="my-10 grid grid-cols-4 place-items-center gap-9 tablet:gap-3 desktop:gap-6 tablet:my-0 tablet:flex tablet:justify-end">
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
          className={
            "bg-repeat-x bg-[url('/img/footer-bottom-dark.svg')] h-[10px] " + 
            footerBottomDark
          }
        ></div>
      </Container>
    </footer>
  );
}

export default Footer