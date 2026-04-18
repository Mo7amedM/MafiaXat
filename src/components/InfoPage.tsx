import { MessageCircle, Facebook, Instagram, Music } from 'lucide-react';

export default function InfoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12 text-center">
      <div className="w-28 h-28 rounded-full border-4 border-red-600 overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.6)] mb-6 bg-gray-900 flex items-center justify-center">
        <svg className="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
      </div>

      <h2 className="text-3xl font-black text-white tracking-widest mb-1">MAFIA</h2>
      <p className="text-red-400 mb-8 tracking-wider">تصميمات احترافية</p>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full mb-8 text-right" dir="rtl">
        <h3 className="text-red-500 font-bold text-lg mb-3">عنّي</h3>
        <p className="text-gray-300 text-sm leading-7">
          مرحباً! أنا مصمم محترف متخصص في تصميمات البروفايل، الخلفيات، والمحتوى الإبداعي.
          أقدم أعمالاً احترافية بجودة عالية.
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 max-w-md w-full mb-8">
        <p className="text-gray-500 text-sm mb-3 text-center">موسيقى</p>
        <div className="flex items-center justify-center gap-3">
          <Music size={20} className="text-red-500" />
          <audio controls className="w-full max-w-[250px]">
            <source src="music.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <a
          href="https://wa.me/201000000000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-3 bg-green-900/40 hover:bg-green-800/60 border border-green-800 hover:border-green-600 text-green-400 hover:text-green-300 py-3 px-6 rounded-xl transition-all font-semibold"
        >
          <MessageCircle size={18} />
          واتساب
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-3 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-900 hover:border-blue-700 text-blue-400 hover:text-blue-300 py-3 px-6 rounded-xl transition-all font-semibold"
        >
          <Facebook size={18} />
          فيسبوك
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-3 bg-pink-950/40 hover:bg-pink-900/60 border border-pink-900 hover:border-pink-700 text-pink-400 hover:text-pink-300 py-3 px-6 rounded-xl transition-all font-semibold"
        >
          <Instagram size={18} />
          انستقرام
        </a>
      </div>
    </div>
  );
}
