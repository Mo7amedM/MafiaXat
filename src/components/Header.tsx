interface HeaderProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
}

export default function Header({ searchValue, onSearchChange }: HeaderProps) {
  return (
    <header className="relative overflow-hidden">
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{
          background: 'linear-gradient(135deg, #000 0%, #1a0000 50%, #8b0000 100%)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-red-600 overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.8)] bg-gray-900 flex items-center justify-center">
              <svg className="w-14 h-14 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">M</span>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(220,38,38,1)]">
            MAFIA
          </h1>
          <p className="text-red-400 text-sm font-light tracking-wider">تصميمات احترافية</p>
        </div>
      </div>

      <div className="bg-black flex justify-center py-3 border-b border-red-900">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="بحث..."
          dir="rtl"
          className="w-64 sm:w-96 px-4 py-2 rounded-xl bg-gray-900 border border-red-800 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-all text-sm"
        />
      </div>
    </header>
  );
}
