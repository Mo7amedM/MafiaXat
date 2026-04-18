import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery';
import MediaViewer from './components/MediaViewer';
import InfoPage from './components/InfoPage';
import { Section } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section | 'info'>('pcback');
  const [search, setSearch] = useState('');
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header searchValue={search} onSearchChange={setSearch} />
      <Navigation active={activeSection} onSelect={setActiveSection} />

      <main>
        {activeSection === 'info' ? (
          <InfoPage />
        ) : (
          <Gallery
            section={activeSection}
            search={search}
            onViewMedia={setViewerSrc}
          />
        )}
      </main>

      <MediaViewer src={viewerSrc} onClose={() => setViewerSrc(null)} />
    </div>
  );
}
