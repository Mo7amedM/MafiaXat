export interface GitHubFile {
  name: string;
  type: string;
  download_url: string;
}

export interface MediaStats {
  filename: string;
  views: number;
  likes: number;
}

export type Section = 'pcback' | 'movie' | 'chat' | 'profile' | 'avatar';

export interface GithubConfig {
  username: string;
  repo: string;
  folders: Record<Section, string>;
}
