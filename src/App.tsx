import React, { useState, useEffect } from "react";
import { INITIAL_GAPS, InformationGap } from "./data";
import { Navbar } from "./components/Navbar";
import { HomeView } from "./components/HomeView";
import { AtlasView } from "./components/AtlasView";
import { DetailView } from "./components/DetailView";
import { DiscoveryView } from "./components/DiscoveryView";
import { ContributeView } from "./components/ContributeView";
import { MyMapView } from "./components/MyMapView";
import { AiAssistant } from "./components/AiAssistant";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [selectedGapId, setSelectedGapId] = useState<string>("");
  
  // Custom persistent database states
  const [gaps, setGaps] = useState<InformationGap[]>(INITIAL_GAPS);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [contributionCount, setContributionCount] = useState<number>(0);

  // Router initial filters parsing state
  const [atlasCategoryFilter, setAtlasCategoryFilter] = useState<string>("all");
  const [atlasSearchFilter, setAtlasSearchFilter] = useState<string>("");

  // Sync with local storage on startup
  useEffect(() => {
    // 1. Load bookmarked list
    const storedSaves = localStorage.getItem("saved_pathways_ids");
    if (storedSaves) {
      setSavedIds(JSON.parse(storedSaves));
    }

    // 2. Load contributed custom pathways
    const storedCustomGaps = localStorage.getItem("contributed_custom_gaps");
    if (storedCustomGaps) {
      const parsedCustom: InformationGap[] = JSON.parse(storedCustomGaps);
      setGaps([...parsedCustom, ...INITIAL_GAPS]);
      setContributionCount(parsedCustom.length);
    }
  }, []);

  const handleNavigate = (path: string) => {
    // Parse simulated router queries
    if (path.startsWith("atlas?")) {
      const paramsStr = path.split("?")[1];
      const params = new URLSearchParams(paramsStr);
      
      const cat = params.get("category");
      const search = params.get("search");

      setAtlasCategoryFilter(cat || "all");
      setAtlasSearchFilter(search || "");
      setCurrentView("atlas");
    } else {
      // Normal navigate
      setAtlasCategoryFilter("all");
      setAtlasSearchFilter("");
      setCurrentView(path);
    }
    // Automatically dismiss specific detail state on normal navbar navigation
    if (path !== "detail") {
      setSelectedGapId("");
    }
    
    // Smooth scroll to top on change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectGap = (id: string) => {
    setSelectedGapId(id);
    setCurrentView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card drilldown click
    
    let updated: string[];
    if (savedIds.includes(id)) {
      updated = savedIds.filter(savedId => savedId !== id);
    } else {
      updated = [...savedIds, id];
    }
    
    setSavedIds(updated);
    localStorage.setItem("saved_pathways_ids", JSON.stringify(updated));
  };

  const handleAddContributedGap = (newGap: InformationGap) => {
    // Merge to current lists
    const updatedGaps = [newGap, ...gaps];
    setGaps(updatedGaps);
    
    // Sync custom records separately to localStorage so database doesn't bloat
    const storedCustomGaps = localStorage.getItem("contributed_custom_gaps");
    let parsedCustom: InformationGap[] = [];
    if (storedCustomGaps) {
      parsedCustom = JSON.parse(storedCustomGaps);
    }
    const updatedCustom = [newGap, ...parsedCustom];
    localStorage.setItem("contributed_custom_gaps", JSON.stringify(updatedCustom));
    setContributionCount(updatedCustom.length);
  };

  // Render view router helper
  const renderViewContent = () => {
    switch (currentView) {
      case "home":
        return (
          <HomeView
            gaps={gaps}
            onNavigate={handleNavigate}
            onSelectGap={handleSelectGap}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        );
      case "atlas":
        return (
          <AtlasView
            gaps={gaps}
            onSelectGap={handleSelectGap}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            initialCategory={atlasCategoryFilter}
            initialSearch={atlasSearchFilter}
          />
        );
      case "detail":
        return (
          <DetailView
            gapId={selectedGapId}
            gaps={gaps}
            onBack={() => handleNavigate("atlas")}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        );
      case "discovery":
        return (
          <DiscoveryView
            gaps={gaps}
            onSelectGap={handleSelectGap}
          />
        );
      case "contribute":
        return (
          <ContributeView
            onAddGap={handleAddContributedGap}
            onNavigate={handleNavigate}
          />
        );
      case "my-map":
        return (
          <MyMapView
            gaps={gaps}
            savedIds={savedIds}
            onSelectGap={handleSelectGap}
            onToggleSave={handleToggleSave}
            onNavigate={handleNavigate}
            contributionCount={contributionCount}
          />
        );
      default:
        return (
          <HomeView
            gaps={gaps}
            onNavigate={handleNavigate}
            onSelectGap={handleSelectGap}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        );
    }
  };

  return (
    <div id="app-viewport-layout" className="min-h-screen bg-gray-50 flex flex-col justify-between selection:bg-primary/10 selection:text-primary">
      {/* Dynamic Naviation bar */}
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        savedCount={savedIds.length}
      />

      {/* Main Layout Area */}
      <main className="flex-1 w-full bg-gray-50/20">
        {renderViewContent()}
      </main>

      {/* High Fidelity Floating Live AI Assistant */}
      <AiAssistant />

      {/* High Contrast Modern White/Light-gray Footer, satisfying user requirement the background colors remain white/gray */}
      <footer id="app-global-footer" className="bg-white border-t border-gray-150 py-12 pb-24 md:pb-12 text-xs text-text-muted mt-auto z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">explore</span>
            </div>
            <span className="font-extrabold text-[#111822] text-sm tracking-wide">
              看见更多路 ｜ 世界信息差图谱
            </span>
          </div>

          <p className="max-w-md mx-auto leading-relaxed">
            信息本无界，人生的选择不止一条。以踏实的行动发掘公共及智能资源，探索更广阔宽广的生活与职业可能。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 font-bold">
            <button onClick={() => handleNavigate("home")} className="hover:text-primary transition-colors">平台首页</button>
            <span>·</span>
            <button onClick={() => handleNavigate("atlas")} className="hover:text-primary transition-colors">信息差图谱</button>
            <span>·</span>
            <button onClick={() => handleNavigate("discovery")} className="hover:text-primary transition-colors">探索测验</button>
            <span>·</span>
            <button onClick={() => handleNavigate("contribute")} className="hover:text-primary transition-colors">共享加入</button>
            <span>·</span>
            <button onClick={() => handleNavigate("my-map")} className="hover:text-primary transition-colors">收藏图谱</button>
          </div>

          <div className="pt-4 border-t border-gray-100 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-gray-400">
            <span>© 2026 See More Roads Atlas. Open-source under MIT.</span>
            <span className="flex items-center gap-1 font-mono">
              <span>STATUS: ATLAS SERVICE READY</span>
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

