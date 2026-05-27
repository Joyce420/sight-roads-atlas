import React, { useState, useMemo, useEffect } from "react";
import { InformationGap, CATEGORIES, REGIONS, getSourceStatusLabel, isDemoGap } from "../data";

interface AtlasViewProps {
  gaps: InformationGap[];
  onSelectGap: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export const AtlasView: React.FC<AtlasViewProps> = ({
  gaps,
  onSelectGap,
  savedIds,
  onToggleSave,
  initialCategory = "all",
  initialSearch = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState("全部地区");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  // Sync initial state if router state changes
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialSearch]);

  const filteredAndSortedGaps = useMemo(() => {
    return gaps
      .filter((gap) => {
        // Search query filter
        const matchesSearch =
          gap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gap.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gap.coreGap.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
          selectedCategory === "all" || gap.category === selectedCategory;

        // Region filter
        const matchesRegion =
          selectedRegion === "全部地区" || gap.region === selectedRegion;

        // Difficulty filter
        const matchesDifficulty =
          selectedDifficulty === "all" || gap.difficulty === selectedDifficulty;

        return matchesSearch && matchesCategory && matchesRegion && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === "title") return a.title.localeCompare(b.title, "zh-Hans-CN");
        return 0;
      });
  }, [gaps, searchQuery, selectedCategory, selectedRegion, selectedDifficulty, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedRegion("全部地区");
    setSelectedDifficulty("all");
    setSortBy("date");
  };

  return (
    <div className="space-y-8 pb-20 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Page Title Header */}
      <div className="space-y-1 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 flex items-center justify-center md:justify-start gap-2">
          <span className="material-symbols-outlined text-primary text-3xl animate-spin">travel_explore</span>
          <span>世界信息差图谱</span>
        </h1>
        <p className="text-sm text-text-muted">
          汇集机会、权益、资源、工具、项目、政策与生活方式线索，帮助你进一步理解和核验。
        </p>
        <p className="text-xs text-primary font-bold">
          当前为 V0.1 演示数据，内容仍在持续核验和扩展。
        </p>
      </div>

      {/* Main Filter Control Board */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-6">
        {/* Search Input bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索信息卡片：如 公共资源、AI工具、城市机会..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 hover:bg-gray-50/50 focus:bg-white text-sm text-gray-900 border border-gray-150 rounded-xl focus:outline-hidden focus:border-primary/50 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-xs text-cool-gray"
            >
              ×
            </button>
          )}
        </div>

        {/* Category horizontal filters */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            📁 业务领域分类
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl border transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary border-primary text-white shadow-xs"
                    : "bg-white border-gray-200 text-gray-700 hover:border-primary/20 hover:text-primary active:scale-95"
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Multidimensional select row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {/* Region selector */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">🌐 国家与大洲</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-primary/40 focus:bg-white"
            >
              {REGIONS.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty selector */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">⚙️ 获取执行抗力</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-primary/40 focus:bg-white"
            >
              <option value="all">全部难度级别</option>
              <option value="low">简单 (低资金/零起步)</option>
              <option value="medium">中等 (需要外语考核/执行力)</option>
              <option value="high">高难度 (门槛高/需长期规划)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">🔃 排序方式</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "title")}
              className="w-full text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-primary/40 focus:bg-white"
            >
              <option value="date">按更新时间</option>
              <option value="title">按标题名称</option>
            </select>
          </div>

          {/* Active stats & clear */}
          <div className="flex items-end justify-center md:justify-end">
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-container hover:bg-primary/5 px-4 py-2.5 rounded-xl border border-dotted border-primary/30 transition-all select-none w-full md:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-[15px]">restart_alt</span>
              <span>重置全部过滤条件</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid count stats */}
      <div className="flex items-center justify-between px-2">
        <span className="text-xs text-text-muted font-bold font-mono">
          当前展示 {filteredAndSortedGaps.length} 条信息卡片，共收录 {gaps.length} 条 V0.1 数据
        </span>
      </div>

      {/* Main Grid List */}
      {filteredAndSortedGaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedGaps.map((gap) => {
            const isSaved = savedIds.includes(gap.id);
            return (
              <div
                key={gap.id}
                onClick={() => onSelectGap(gap.id)}
                className="opportunity-card bg-white rounded-2xl border border-gray-100 flex flex-col justify-between overflow-hidden cursor-pointer group hover:border-primary/25 relative"
              >
                {/* Badge Header */}
                <div className="p-6 pb-0 flex items-start justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-primary/5 text-primary text-xs font-bold">
                      {gap.categoryLabel}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      getSourceStatusLabel(gap) === "有来源" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      {getSourceStatusLabel(gap)}
                    </span>
                    {isDemoGap(gap) && (
                      <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-500 text-xs font-bold">
                        演示数据
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => onToggleSave(gap.id, e)}
                    className="h-8 w-8 rounded-full bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all border border-gray-100"
                    title={isSaved ? "取消收藏" : "加入收藏"}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isSaved ? "fill-current text-red-500 font-bold" : ""}`}>
                      favorite
                    </span>
                  </button>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-3 flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-text-muted font-semibold">
                    <span>{gap.region}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      难度
                      <span className={`px-1 rounded-sm text-[10px] lowercase font-bold ${
                        gap.difficulty === "low" ? "bg-green-100/80 text-green-600" :
                        gap.difficulty === "medium" ? "bg-amber-100/80 text-amber-600" :
                        "bg-rose-100/80 text-rose-600"
                      }`}>
                        {gap.difficultyLabel}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                    {gap.title}
                  </h3>
                  
                  <p className="text-xs font-bold text-primary-container leading-normal line-clamp-2">
                    💡 {gap.tagline}
                  </p>

                  <p className="text-[12.5px] text-text-muted line-clamp-3 leading-relaxed">
                    {gap.description}
                  </p>
                </div>

                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100/60 flex items-center justify-between text-[11px] text-text-muted font-bold">
                  <span>{gap.region}</span>
                  <span>更新时间：{gap.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty Plate */
        <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xs text-center max-w-xl mx-auto space-y-4">
          <div className="h-16 w-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-4xl">search_off</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">未检索到对应的信息差项目</h3>
          <p className="text-sm text-text-muted">
            没有找到与过滤条件相符的信息卡片。可以减少筛选条件，或清理当前搜索关键字。
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md shadow-primary/10 transition-all select-none"
          >
            清空所有过滤栏
          </button>
        </div>
      )}
    </div>
  );
};
