'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  getAllContent, getApiProjects, getApiBlogPosts, getApiServices, getApiTeam,
  type ContentSection, type ApiProject, type ApiBlogPost, type ApiService, type ApiTeamMember,
} from './api';

interface ContentContextValue {
  sections: Record<string, ContentSection>;
  projects: ApiProject[];
  blogPosts: ApiBlogPost[];
  services: ApiService[];
  team: ApiTeamMember[];
  loaded: boolean;
}

const ContentContext = createContext<ContentContextValue>({
  sections: {},
  projects: [],
  blogPosts: [],
  services: [],
  team: [],
  loaded: false,
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentContextValue>({
    sections: {}, projects: [], blogPosts: [], services: [], team: [], loaded: false,
  });

  useEffect(() => {
    Promise.all([
      getAllContent(),
      getApiProjects(),
      getApiBlogPosts(),
      getApiServices(),
      getApiTeam(),
    ]).then(([contentList, projects, blogPosts, services, team]) => {
      const sections: Record<string, ContentSection> = {};
      (contentList ?? []).forEach(s => { sections[s.section] = s; });
      setState({
        sections,
        projects: projects ?? [],
        blogPosts: blogPosts ?? [],
        services: services ?? [],
        team: team ?? [],
        loaded: true,
      });
    });
  }, []);

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

export function useSectionContent(section: string) {
  const { sections } = useContent();
  return sections[section] ?? null;
}
