import React from "react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, savedCount }) => {
  const navItems = [
    { id: "home", label: "首页", icon: "home" },
    { id: "atlas", label: "信息差图谱", icon: "travel_explore" },
    { id: "discovery", label: "兴趣发现测验", icon: "psychology" },
    { id: "contribute", label: "贡献信息差", icon: "polyline" },
    { id: "my-map", label: "我的收藏图谱", icon: "map" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav border-b border-gray-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => onNavigate("home")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-[22px] animate-pulse">compass_calibration</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-1">
                <span>看见更多路</span>
                <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  世界信息差图谱
                </span>
              </h1>
              <p className="text-[10px] text-text-muted hidden sm:block tracking-widest font-mono">
                SIGHT ROADS · GLOBAL ATLAS
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id || (item.id === "atlas" && currentView === "detail");
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "text-gray-600 hover:text-primary hover:bg-gray-100/60"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.id === "my-map" && savedCount > 0 && (
                    <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                      {savedCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section / Mobile Menu trigger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100/80 border border-gray-200/40">
              <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[12px] text-white font-bold">check</span>
              </div>
              <span className="text-xs text-text-main font-medium">数据资源服务已就绪</span>
            </div>

            {/* Simulated Avatar / Link to My Map */}
            <div 
              className={`h-9 w-9 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-sm cursor-pointer border-2 transition-all duration-200 ${
                currentView === "my-map" ? "border-primary scale-105" : "border-transparent"
              } hover:border-primary-container`}
              onClick={() => onNavigate("my-map")}
              title="查看我的收藏"
            >
              U
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar (Bottom persistent for better mobile layout) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl px-2 py-1">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentView === item.id || (item.id === "atlas" && currentView === "detail");
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all ${
                  isActive ? "text-primary scale-110" : "text-gray-500"
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label === "兴趣发现测验" ? "测验" : item.label === "我的收藏图谱" ? "收藏" : item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
