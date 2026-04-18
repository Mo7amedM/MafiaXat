import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import GalleryCard from './GalleryCard';
import { GitHubFile, Section, GithubConfig } from '../types';

const CONFIG: GithubConfig = {
  username: 'YOUR_USERNAME',
  repo: 'YOUR_REPO',
  folders: {
    pcback: 'pcback',
    movie: 'movie',
    chat: 'chat',
    profile: 'profile',
    avatar: 'avatar',
  },
};

const DEMO_FILES: GitHubFile[] = [
  { name: 'design_01.jpg', type: 'file', download_url: 'https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'design_02.jpg', type: 'file', download_url: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'design_03.jpg', type: 'file', download_url: 'https://images.pexels.com/photos/1562477/pexels-photo-1562477.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'design_04.jpg', type: 'file', download_url: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'design_05.jpg', type: 'file', download_url: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'design_06.jpg', type: 'file', download_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'design_07.jpg', type: 'file', download_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'design_08.jpg', type: 'file', download_url: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

interface GalleryProps {
  section: Section;
  search: string;
  onViewMedia: (url: string) => void;
}

export default function Gallery({ section, search, onViewMedia }: GalleryProps) {
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadSection(section);
  }, [section]);

  async function loadSection(type: Section) {
    setLoading(true);
    setError(false);

    if (CONFIG.username === 'YOUR_USERNAME') {
      await new Promise((r) => setTimeout(r, 600));
      setFiles(DEMO_FILES);
      setLoading(false);
      return;
    }

    try {
      const url = `https://api.github.com/repos/${CONFIG.username}/${CONFIG.repo}/contents/${CONFIG.folders[type]}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed');
      const data: GitHubFile[] = await res.json();
      setFiles(data.filter((f) => f.type === 'file'));
    } catch {
      setError(true);
      setFiles(DEMO_FILES);
    } finally {
      setLoading(false);
    }
  }

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size={32} className="text-red-600 animate-spin" />
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-600">
        <p className="text-lg">لا توجد نتائج</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-5">
      {error && (
        <p className="text-center text-yellow-600 text-sm mb-4">
          GitHub غير مضبوط - يتم عرض صور تجريبية
        </p>
      )}
      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {filtered.map((file) => (
          <GalleryCard
            key={file.name}
            filename={file.name}
            downloadUrl={file.download_url}
            onView={onViewMedia}
          />
        ))}
      </div>
    </div>
  );
}
