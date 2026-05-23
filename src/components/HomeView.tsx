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
    { label: "免费文献查阅", query: "知网" },
    { label: "青年免费驿站", query: "驿站" },
    { label: "AI提效大模型", query: "AI" },
    { label: "日本空村老宅", query: "日本" },
    { label: "二级双通道报销", query: "双通道" },
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
            <span>打破世界信息差 · 汇聚成长探索路径</span>
          </div>
          
          <h1 className="text-3.5xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            我们不替你选择人生，<span className="text-primary bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">我们只是帮你看见更多路。</span>
          </h1>
          
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            我们整理普通人可能不知道的权益、资源、工具、项目、优惠、政策和生活方式，把它们变成看得懂的信息卡片。
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative pt-4">
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-primary/30 transition-all p-1.5 pl-4">
              <span className="material-symbols-outlined text-gray-400 mr-2 text-2.5xl">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索公共资源与生活提效：“数字证书” “青年驿站” “测试API”..."
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
          📊 核心智囊数据分析面板
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100/60 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-muted text-sm font-medium">公共教育与文献查阅</span>
              <div className="h-8 w-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">trending_down</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">免押数字借阅证</div>
            <div className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-0.5">
              <span>全国数字图书馆合规免费查阅</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-150 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-muted text-sm font-medium">智慧 AI 生产力提效</span>
              <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">官方 API 密钥</div>
            <div className="text-xs text-indigo-600 font-semibold mt-1 flex items-center gap-0.5">
              <span>善用自带免费额度，实现安全降本</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-150 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-muted text-sm font-medium">青年求职落脚保障</span>
              <div className="h-8 w-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">home</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">地方青年之家</div>
            <div className="text-xs text-yellow-600 font-semibold mt-1 flex items-center gap-0.5">
              <span>可申 7-15 天免费短期过渡借宿</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-150 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-muted text-sm font-medium">精选探索成长路径</span>
              <div className="h-8 w-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{gaps.length + 32} 条实践数</div>
            <div className="text-xs text-primary font-semibold mt-1 flex items-center gap-0.5">
              <span>大门类 100% 免费公开，随时自主查阅</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-2.5xl font-bold text-gray-900">十二大成长探索领域</h2>
            <p className="text-text-muted text-sm">选择适合您当前生活拼图的突破视角，进入细分图谱深入盘点</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-3">
            {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate(`atlas?category=${cat.id}`)}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-100 hover:border-primary/20 bg-gray-50/50 hover:bg-white cursor-pointer group transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                  <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
                </div>
                <span className="text-xs font-bold text-gray-800 tracking-wide text-center">{cat.label}</span>
                <span className="text-[10px] text-text-muted mt-1 font-mono">
                  {gaps.filter(g => g.category === cat.id).length || 1} 选
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
              <span>1分钟成长可能性格匹配测试</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              探寻属于您的多元成长出口
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              根据您当前的资源权重（背景专长、可用时间预算、个人成长偏好），AI图谱能够智能推荐出最契合您落地发掘的那套高性价比公共与学习方案！
            </p>
          </div>

          <button
            onClick={() => onNavigate("discovery")}
            className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-base transition-all shadow-lg shadow-primary/20 select-none z-10 whitespace-nowrap cursor-pointer"
          >
            开始匹配我的成长方案 ⚡️
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
            <h4 className="font-bold text-gray-900">正规途径·绿色合法</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              本站整理项目来源于全球及地方人社人保机构、公立图书馆和官方认证的换宿大联盟名录细则，确保全部正规合法。
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shadow-xs">
              02
            </div>
            <h4 className="font-bold text-gray-900">整合路径·解释清楚信息来源</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              把原本对普通公众公开、无需中介代理的官方申请渠道整合编排，方便大家核验与操作。掌握主动，理顺人生。
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg shadow-xs">
              03
            </div>
            <h4 className="font-bold text-gray-900">开放连接·青年共享</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              信息本无界，人生多可能。你分享出的真实实践历程就是他人前行的一盏明灯。一起参与，丰富图谱生态。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
