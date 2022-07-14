import PillarsInclusivity from './pillars-inclusivity.mdx';
import PillarsTransparency from './pillars-transparency.mdx';
import PillarsClarity from './pillars-clarity.mdx';

export const content = {
  meta: {
    title: 'Open Source | TBD',
    path: 'opensource',
  },
  title: 'Our Pillars',
  pillars: [
    {
      img: '/img/inclusivity-icon.svg',
      title: 'Inclusivity',
      alt: '',
      description: PillarsInclusivity,
    },
    {
      img: '/img/transparency-icon.svg',
      title: 'Transparency',
      alt: '',
      description: PillarsTransparency,
    },
    {
      img: '/img/clarity-icon.svg',
      title: 'Clarity',
      alt: '',
      description: PillarsClarity,
    },
  ],
  buttons: [
    {
      type: 'button',
      data: {
        label: 'Read More About Governance',
        url: 'https://github.com/TBD54566975/tbd-project-template/blob/main/GOVERNANCE.md',
        isExternalLink: true,
        imageURL: '/img/external-link-blue-icon.svg',
      },
    },
    {
      type: 'button',
      data: {
        label: 'View Our Code of Conduct',
        url: 'https://github.com/TBD54566975/tbd-project-template/blob/main/CODE_OF_CONDUCT.md',
        isExternalLink: true,
        imageURL: '/img/external-link-blue-icon.svg',
      },
    },
  ],
};
