import Heading from './heading.mdx';
import OurApproach from './our-approach.mdx';
import OurPhilosophy from './our-philosophy.mdx';
import OurProjects from './our-projects.mdx';
import OurProtocol from './our-protocol.mdx';
import tbdexCTA from './tbdex-cta';


export const content = {
  meta: { title: 'Developers | TBD'},
  tbdexCTA: tbdexCTA,
  heading: Heading,
  features: [
    {
      title: 'Our Philosophy',
      description: OurPhilosophy,
      cta: {
        label: 'Read More',
        url: '/open-source',
      },
    },
    {
      title: 'Our Protocol',
      description: OurProtocol,
      cta: {
        label: 'Learn More',
        url: '/projects/tbdex',
      },
    },
    {
      title: 'Our Projects',
      description: OurProjects,
      cta: {
        label: 'Get Involved',
        url: '/projects',
      },
    },
    {
      title: 'Our Approach',
      description: OurApproach,
      cta: {
        label: 'View',
        url: '/projects/web5#components',
      },
    },
  ],
};
