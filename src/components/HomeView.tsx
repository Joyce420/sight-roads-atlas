import React, { useState } from "react";
import { InformationGap, CATEGORIES } from "../data";

interface HomeViewProps {
  gaps: InformationGap[];
  onNavigate: (view: string) => void;
  onSelectGap: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  gaps,
  onNavigate,
  onSelectGap,
  savedIds,
  onToggleSave,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`atlas?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onNavigate("atlas");
    }
  };

  const hotTags = [
    { label: "免学费去德国", query: "德国" },
    { label: "数字游民签证", query: "数字游民" },
    { label: "低至0%税率", query: "税" },
    { label: "免费送日本老宅", query: "日本" },
    { label: "省10万自办跳板", query: "绿卡" },
  ];

  // Pick top 3 featured gaps
  const featuredGaps = gaps.slice(0, 3);

  return (
    <div className="space-y-12 pb-20 animate-fade-in hero-gradient">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-16 pb-12">
        <div className="text-center max-w-4xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 text-primary border border-primary/20 text-xs font-semibold animate-bounce">
            <span className="material-symbols-outlined text-[14px]">insights</span>
            <span>打破世界信息茧房 · 汇聚全球套利路径</span>
          </div>
          
          <h1 className="text-3.5xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            看见更多路，<span className="text-primary bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">人生不止一条轨道</span>
          </h1>
          
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            汇集全球1%精算玩家正规运作的低预算留学、数字游民避税、超低成本置业、快捷第三国绿卡自办指南。抹平信息盲区，重新掌握人生主动权。
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative pt-4">
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-primary/30 transition-all p-1.5 pl-4">
              <span className="material-symbols-outlined text-gray-400 mr-2 text-2.5xl">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="尝试搜搜：“德国” “免税” “数字游民”..."
                className="w-full text-base bg-transparent text-gray-900 focus:outline-hidden py-2"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-white font-medium text-sm transition-all shadow-md shadow-primary/15 shrink-0"
              >
                搜索图谱
              </button>
            </div>
            
            {/* Hot Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-text-muted font-medium">热门探索：</span>
              {hotTags.map((tag, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onNavigate(`atlas?search=${encodeURIComponent(tag.query)}`)}
                  className="px-3 py-1 rounded-full bg-white hover:bg-primary/5 hover:text-primary border border-gray-100 hover:border-primary/10 text-gray-600 transition-all"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Analytics Insight Widgets */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4 text-center md:text-left">
          📊 全球图谱关键指标面板
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100/60 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-muted text-sm font-medium">出境定居成本最低</span>
              <div className="h-8 w-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">trending_down</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">德国“双元制”</div>
            <div className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-0.5">
              <span>免学费 + 每月发千欧补贴</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100/60 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-muted text-sm font-medium">离岸降税效率最强</span>
              <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">credit_card</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">格鲁吉亚独资</div>
            <div className="text-xs text-indigo-600 font-semibold mt-1 flex items-center gap-0.5">
              <span>年入4.5万美元以内 0% 所得税</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100/60 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-muted text-sm font-medium">直办移民最高性价比</span>
              <div className="h-8 w-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">shield</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">自办第三国绿卡</div>
            <div className="text-xs text-yellow-600 font-semibold mt-1 flex items-center gap-0.5">
              <span>减免近十万高昂中介黑色款项</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100/60 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-muted text-sm font-medium">已汇集套利路径</span>
              <div className="h-8 w-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{gaps.length + 42} 条记录</div>
            <div className="text-xs text-primary font-semibold mt-1 flex items-center gap-0.5">
              <span>本周新增 3 条 · 每天极速勘析上报</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-2.5xl font-bold text-gray-900">六大信息差极客版图</h2>
            <p className="text-text-muted text-sm">选择适合你人生底牌的突破角度，进入细分图谱深入盘点</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate(`atlas?category=${cat.id}`)}
                className="flex flex-col items-center justify-center p-5 rounded-2xl border border-gray-100 hover:border-primary/20 bg-gray-50/50 hover:bg-white cursor-pointer group transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                </div>
                <span className="text-sm font-bold text-gray-800 tracking-wide">{cat.label}</span>
                <span className="text-[11px] text-text-muted mt-1 font-mono">
                  {gaps.filter(g => g.category === cat.id).length || 2} 个精选
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gaps Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs text-primary font-bold tracking-widest uppercase">FEATURED PATHWAYS</div>
            <h2 className="text-2.5xl font-bold text-gray-900">本周高分推荐·硬核路线</h2>
          </div>
          <button
            onClick={() => onNavigate("atlas")}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:text-white hover:bg-primary font-medium text-sm transition-all hover:border-primary"
          >
            <span>探索完整信息差图谱</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGaps.map((gap) => (
            <div
              key={gap.id}
              onClick={() => onSelectGap(gap.id)}
              className="opportunity-card bg-white rounded-2xl border border-gray-100 flex flex-col justify-between overflow-hidden cursor-pointer group relative"
            >
              {/* Card Badge Header */}
              <div className="p-6 pb-0 flex items-start justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-primary/5 text-primary text-xs font-semibold">
                  {gap.categoryLabel}
                </span>
                
                <button
                  onClick={(e) => onToggleSave(gap.id, e)}
                  className="h-8 w-8 rounded-full bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all border border-gray-100"
                  title={savedIds.includes(gap.id) ? "取消收藏" : "加入收藏"}
                >
                  <span className={`material-symbols-outlined text-[18.5px] ${savedIds.includes(gap.id) ? "fill-current text-red-500 font-bold" : ""}`}>
                    favorite
                  </span>
                </button>
              </div>

              {/* Card Body */}
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

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                  {gap.title}
                </h3>
                
                <p className="text-sm font-semibold text-primary line-clamp-1">
                  💡 {gap.tagline}
                </p>

                <p className="text-xs text-text-muted line-clamp-3 leading-relaxed">
                  {gap.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 bg-amber-500/8 text-amber-600 border border-amber-500/15 px-2 py-0.5 rounded-md font-bold">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  <span>{gap.rating.toFixed(1)} 推荐分</span>
                </div>
                <div className="flex items-center gap-3 text-text-muted font-mono">
                  <span>⚓️ {gap.stars + (savedIds.includes(gap.id) ? 1 : 0)} 关注</span>
                  <span>👁️ {gap.views} 阅</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discovery Quiz Call-out CTA banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
          {/* Subtle decoration dots representing nodes */}
          <div className="absolute top-10 right-20 h-40 w-40 rounded-full bg-primary/3 filter blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-indigo-500/5 filter blur-2xl pointer-events-none"></div>

          <div className="space-y-4 max-w-xl text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-primary border border-primary/20 text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">psychology</span>
              <span>1分钟世界潜力测试</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              总资金、语言与背景不够？
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              根据你持有的底本筹码（英语水平、能拿出的预算、家庭现状及个人职业方向），我们为你精确算法匹配最容易跨越的那条专属世界信息差路线！
            </p>
          </div>

          <button
            onClick={() => onNavigate("discovery")}
            className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-base transition-all shadow-lg shadow-primary/20 select-none z-10 whitespace-nowrap"
          >
            开始我的定制契合路线 ⚡️
          </button>
        </div>
      </section>

      {/* Guide of Concept Section */}
      <section className="max-w-7xl mx-auto px-4 bg-white/40 p-8 rounded-3xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-lg shadow-xs">
              01
            </div>
            <h4 className="font-bold text-gray-900">正规途径·坚实合法</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              本站整理项目来源于全球官方移民局、市政役所、联邦职业教育司在公共网域的法典和细则，坚决抵绝对冲与黑中介非法运作。
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shadow-xs">
              02
            </div>
            <h4 className="font-bold text-gray-900">去垄断化·拒绝暴利</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              把本应免费由政府和学校提供的直接办理路径从不法中介赚几十万元的黑盒子里拿出来。人人掌握，独立自助。
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg shadow-xs">
              03
            </div>
            <h4 className="font-bold text-gray-900">开源互助·即时共享</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              信息本无界，人人皆舵手。你踩过的坑就是别人的灯。加入世界贡献序列，点亮更繁茂的人生地图。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
