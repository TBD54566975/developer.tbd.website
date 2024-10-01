import Heading from './heading.mdx';
import ListOfProjects from './project-list.mdx';
import Column1 from './column-1.mdx';
import Column2 from './column-2.mdx';

export const content = {
  meta: {
    title: 'Projects | TBD',
    path: 'projects',
  },
  Heading: Heading,
  ListOfProjects: ListOfProjects,
  projects: [
    {
      icon: '/img/article-icon.svg',
      title: 'Web5',
      description:
        'Builds a decentralized web that returns control over your data and identity',
      textButton: 'View Project',
      url: '/projects/web5',
    },
    {
      icon: '/img/article-icon.svg',
      title: 'tbDEX',
      description:
        'Connects the world of legacy money to the world of digital money',
      textButton: 'View Project',
      url: '/projects/tbdex',
    },
  ],

  Column1: Column1,
  Column2: Column2,
};
