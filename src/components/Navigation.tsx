import { Section } from '../types';

interface NavigationProps {
  active: Section | 'info';
  onSelect: (section: Section | 'info') => void;
}

const navItems: { key: Section | 'info'; label: string }[] = [
  { key: 'pcback', label: 'Pcback' },
  { key: 'movie', label: 'Movie' },
  { key: 'chat', label: 'Chat' },
  { key: 'profile', label: 'Profile' },
  { key: 'avatar', label: 'Avatar' },
  { key: 'info', label: 'Info' },
];

export default function Navigation({ active, onSelect }: NavigationProps) {
  return (
    <nav className="flex flex-wrap justify-center gap-2 bg-gray-950 border-b border-red-900 px-4 py-3">
      {navItems.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
            active === key
              ? 'bg-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.7)]'
              : 'bg-gray-900 text-gray-300 border border-gray-800 hover:bg-red-900 hover:border-red-700 hover:text-white hover:shadow-[0_0_10px_rgba(220,38,38,0.4)]'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
