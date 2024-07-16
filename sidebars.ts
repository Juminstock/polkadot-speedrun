import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tutorials',
      items: ['tutorial-basics/inkathon-project'],
    },
  ],
};

export default sidebars;