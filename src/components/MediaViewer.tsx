import { X } from 'lucide-react';
import { useEffect } from 'react';

interface MediaViewerProps {
  src: string | null;
  onClose: () => void;
}

export default function MediaViewer({ src, onClose }: MediaViewerProps) {
  const isVideo = src?.endsWith('.mp4');

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-red-500 hover:text-red-400 hover:bg-red-950/50 p-2 rounded-full transition-all z-10"
      >
        <X size={28} />
      </button>

      <div
        className="max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            controls
            autoPlay
            src={src}
            className="max-w-[90vw] max-h-[90vh]"
          />
        ) : (
          <img
            src={src}
            alt="preview"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        )}
      </div>
    </div>
  );
}
