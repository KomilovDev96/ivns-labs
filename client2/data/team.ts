export type TeamMember = {
  id: string;
  nameKey: string;         // translation key for name
  avatar?: string;         // "/images/team/azizbek.jpg" — add from admin panel
  initials: string;        // shown when no avatar
  color1: string;
  color2: string;
  socials?: {
    linkedin?: string;
    github?: string;
    telegram?: string;
  };
};

export const team: TeamMember[] = [
  {
    id: 'azizbek',
    nameKey: 'azizbek',
    initials: 'AI',
    color1: '#0ea5e9',
    color2: '#7c3aed',
    socials: { telegram: 'https://t.me/ivnlabs' },
  },
  {
    id: 'dev1',
    nameKey: 'dev1',
    initials: 'JK',
    color1: '#7c3aed',
    color2: '#ec4899',
    socials: { github: '#' },
  },
  {
    id: 'dev2',
    nameKey: 'dev2',
    initials: 'SK',
    color1: '#0ea5e9',
    color2: '#22d3ee',
    socials: { github: '#' },
  },
  {
    id: 'designer',
    nameKey: 'designer',
    initials: 'MR',
    color1: '#f59e0b',
    color2: '#f97316',
    socials: { linkedin: '#' },
  },
  {
    id: 'analyst',
    nameKey: 'analyst',
    initials: 'NU',
    color1: '#10b981',
    color2: '#0ea5e9',
    socials: { linkedin: '#' },
  },
  {
    id: 'pm',
    nameKey: 'pm',
    initials: 'ZA',
    color1: '#8b5cf6',
    color2: '#0ea5e9',
    socials: { telegram: '#' },
  },
];
