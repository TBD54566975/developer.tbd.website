import PillarsInclusivity from './pillars-inclusivity.mdx';
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
      description:
        'Decision-making is open by default, with rare exceptions made for security, compliance, personnel, or other sensitive issues. Projects under TBD’s stewardship will conduct design, roadmap, issues, bugs, and code reviews in public. This is critical for accountability and to promote the inclusive environment necessary for project success.',
    },
    {
      img: '/img/clarity-icon.svg',
      title: 'Clarity',
      alt: '',
      description:
        'Projects need well-defined scope to succeed. They also need accessible, comprehensive documentation, a stellar Getting Started experience, and well-defined expectations. TBD fosters an environment built for contribution without personal intervention. Newcomers should be able to follow the project status on their own without additional explanation.',
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
