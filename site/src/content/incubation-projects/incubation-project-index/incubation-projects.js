import ListOfProjects from './incubation-project-list.mdx';

export const content = {
  meta: {
    title: 'Incubation Projects | TBD',
    path: 'incubation-projects',
  },

  ListOfProjects: ListOfProjects,
  projects: [
    {
      icon: '/img/article-icon.svg',
      title: 'Credential Selector',
      description:
        'Developers embed the VCS into their application to allow users to select and retrieve Verifiable Credentials (VCs)',
      textButton: 'View Project',
      url: 'https://github.com/TBD54566975/incubation-verifiable-credential-selector',
    },
    {
      icon: '/img/article-icon.svg',
      title: 'tbLEND',
      description:
        'A Web5 protocol that connects the lender and borrower to exchange money securely.',
      textButton: 'View Project',
      url: 'https://github.com/TBD54566975/incubation-tblend#web5service',
    },
  ],
};
