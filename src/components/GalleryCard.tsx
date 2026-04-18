import { useState, useEffect } from 'react';
import { Eye, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MediaStats } from '../types';

interface GalleryCardProps {
  filename: string;
  downloadUrl: string;
  onView: (url: string) => void;
}

export default function GalleryCard({ filename, downloadUrl, onView }: GalleryCardProps) {
  const [stats, setStats] = useState<MediaStats>({ filename, views: 0, likes: 0 });
  const [liked, setLiked] = useState(false);
  const isVideo = filename.endsWith('.mp4');

  useEffect(() => {
    initStats();
  }, [filename]);

  async function initStats() {
    const { data } = await supabase
      .from('media_stats')
      .select('views, likes')
      .eq('filename', filename)
      .maybeSingle();

    if (data) {
      const newViews = data.views + 1;
      await supabase
        .from('media_stats')
        .update({ views: newViews })
        .eq('filename', filename);
      setStats({ filename, views: newViews, likes: data.likes });
    } else {
      await supabase
        .from('media_stats')
        .insert({ filename, views: 1, likes: 0 });
      setStats({ filename, views: 1, likes: 0 });
    }
  }

  async function handleLike() {
    if (liked) return;
    setLiked(true);
    const newLikes = stats.likes + 1;
    setStats((prev) => ({ ...prev, likes: newLikes }));
    await supabase
      .from('media_stats')
      .update({ likes: newLikes })
      .eq('filename', filename);
  }

  return (
    <div className="min-w-[240px] max-w-[260px] flex-shrink-0 bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 hover:scale-105 hover:border-red-700 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] group">
      <div className="relative overflow-hidden">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={downloadUrl}
            className="w-full h-44 object-cover"
          />
        ) : (
          <img
            src={downloadUrl}
            alt={filename}
            className="w-full h-44 object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
          <button
            onClick={() => onView(downloadUrl)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            عرض كامل
          </button>
        </div>
      </div>

      <div className="px-3 py-2">
        <p className="text-gray-300 text-xs truncate mb-2" dir="rtl">
          {filename}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Eye size={12} className="text-red-500" />
              {stats.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={12} className={liked ? 'text-red-500 fill-red-500' : 'text-gray-500'} />
              {stats.likes}
            </span>
          </div>
          <button
            onClick={handleLike}
            disabled={liked}
            className={`transition-all duration-200 ${
              liked
                ? 'text-red-500 scale-125'
                : 'text-gray-600 hover:text-red-500 hover:scale-110'
            }`}
          >
            <Heart size={16} className={liked ? 'fill-red-500' : ''} />
          </button>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent opacity-60" />
    </div>
  );
}
