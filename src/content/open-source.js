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
      description: [
        {
          type: 'text',
          data: 'Anyone with the capacity to contribute: can. We are proactive in welcoming a diverse contributor base for our code, documentation, developer relations, education, and communication efforts. Bad actors will be met with a published ',
        },
        {
          type: 'tooltip',
          data: {
            trigger: 'governance model',
            text: 'describes the roles that project participants can take on and the process for decision making within the project',
          },
        },
        {
          type: 'text',
          data: ' and enforced ',
        },
        {
          type: 'tooltip',
          data: {
            trigger: 'code of conduct',
            text: 'lays out tprinciples, standards, and the moral and ethical expectations',
          },
        },
        {
          type: 'text',
          data: '. Our users deserve representation in our development communities, and we promote varied perspectives and respectful debate.',
        },
      ],
    },
    {
      img: '/img/transparency-icon.svg',
      title: 'Transparency',
      alt: '',
      description: [
        {
          type: 'text',
          data: 'Decision-making is open by default, with rare exceptions made for security, compliance, personnel, or other sensitive issues. Projects under TBD’s stewardship will conduct design, roadmap, issues, bugs, and code reviews in public. This is critical for accountability and to promote the inclusive environment necessary for project success.',
        },
      ],
    },
    {
      img: '/img/clarity-icon.svg',
      title: 'Clarity',
      alt: '',
      description: [
        {
          type: 'text',
          data: 'Projects need well-defined scope to succeed. They also need accessible, comprehensive documentation, a stellar Getting Started experience, and well-defined expectations. TBD fosters an environment built for contribution without personal intervention. Newcomers should be able to follow the project status on their own without additional explanation.',
        },
      ],
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
