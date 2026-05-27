import React from "react";
import { InformationGap, getSourceStatusLabel, isDemoGap } from "../data";

interface MyMapViewProps {
  gaps: InformationGap[];
  savedIds: string[];
  onSelectGap: (id: string) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onNavigate: (view: string) => void;
  contributionCount: number;
}

export const MyMapView: React.FC<MyMapViewProps> = ({
  gaps,
  savedIds,
  onSelectGap,
  onToggleSave,
  onNavigate,
  contributionCount
}) => {
  const savedGaps = gaps.filter((g) => savedIds.includes(g.id));

  // Determine active continental hubs based on user favorites matching new data regions
  const hubs = [
    {
      id: "national",
      name: "全局数字公共线 (National Online Link)",
      region: "全国/线上",
      desc: "包含全国公立图书馆免费免押畅读知网文献、AI 工具官方入口及大病特药双通道补助政策。",
      icon: "cloud_sync"
    },
    {
      id: "south",
      name: "华南大湾区连线 (South China Network)",
      region: "华南大湾区",
      desc: "涵盖一二线城市青年人才驿站免费短期借宿政策及大湾区新锐创意职业体验路线。",
      icon: "center_focus_strong"
    },
    {
      id: "west",
      name: "西南原野探路 (West China Trail)",
      region: "西南西北",
      desc: "整合大理、松阳等知名环保民宿及生态有机农场义工换宿计划，体验零刚需低开销慢生活。",
      icon: "forest"
    },
    {
      id: "east",
      name: "华东沿海环圈 (East China Circuit)",
      region: "华东沿海",
      desc: "包含江浙沪沿海及长三角科技生态园、青年社会实践、大学生公益创新网络。",
      icon: "emoji_nature"
    },
    {
      id: "global",
      name: "全球视野成长线 (Global Horizon Link)",
      region: "全球/海外",
      desc: "涵盖日本乡村闲置空屋 0 元移住美学房屋爆改计划与国际高质青年交流成长通道。",
      icon: "public"
    }
  ];

  // User Achievements badges based on state
  const achievements = [
    {
      title: "启航探索舵手 (The Navigator)",
      desc: "收藏保存至少 1 项实用生活信息差指南",
      unlocked: savedIds.length >= 1,
      icon: "compass_calibration"
    },
    {
      title: "理性分析行者 (The Analyst)",
      desc: "使用探索入口浏览过感兴趣的信息方向",
      unlocked: true,
      icon: "monitoring"
    },
    {
      title: "线索补充者 (The Pathfinder)",
      desc: "通过投稿 / 纠错入口在本机保存过至少 1 条补充线索",
      unlocked: contributionCount >= 1,
      icon: "campaign"
    }
  ];

  return (
    <div className="pb-24 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      {/* Page Heading */}
      <div className="space-y-1 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 flex items-center justify-center md:justify-start gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">map</span>
          <span>我的信息差图谱分析</span>
        </h1>
        <p className="text-sm text-text-muted">
          这里仅整理你收藏过的信息卡片，方便之后继续查阅、比较和核验。
        </p>
        <p className="text-xs text-primary font-bold">
          当前为本地收藏模式，数据仅保存在你的浏览器中。清除缓存或更换设备后可能丢失。
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl animate-pulse">radar</span>
            <span>收藏方向概览</span>
          </h2>
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted font-mono bg-gray-50 px-3 py-1.5 rounded-lg border">
            <span>本地收藏状态：</span>
            <span className="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
            <span className="text-green-600">浏览器本地保存</span>
          </div>
        </div>

        {/* The Hub List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {hubs.map((h) => {
            const matchesCount = savedGaps.filter((g) => g.region === h.region).length;
            const isActivated = matchesCount > 0;
            return (
              <div
                key={h.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isActivated
                    ? "bg-primary/[0.03] border-primary/25 shadow-xs"
                    : "bg-gray-50 border-gray-150 opacity-75"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-border text-[22px]" style={{
                      color: isActivated ? "#004191" : "#94A3B8"
                    }}>
                      {h.icon === "cloud_sync" ? "cloud_sync" :
                       h.icon === "center_focus_strong" ? "center_focus_strong" :
                       h.icon === "forest" ? "forest" :
                       h.icon === "emoji_nature" ? "emoji_nature" : "public"}
                    </span>
                    
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActivated
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}>
                      {isActivated ? "🟢 激活" : "⚪️ 未点亮"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-gray-900 line-clamp-1">{h.name.split(" (")[0]}</h4>
                    <p className="text-[10px] text-text-muted leading-relaxed line-clamp-3">
                      {h.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 mt-4 text-[10.5px] font-bold text-gray-600">
                  {isActivated ? (
                    <span className="text-primary font-bold">已收藏 {matchesCount} 张卡片</span>
                  ) : (
                    <span className="text-gray-400">收藏相关卡片后显示</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Unlocked Achievements list widget */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xs space-y-6 h-fit">
          <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
            <span>我的收藏状态</span>
          </h2>

          <div className="space-y-4">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                  item.unlocked
                    ? "bg-amber-500/[0.02] border-amber-500/15"
                    : "bg-gray-50/50 border-gray-100 opacity-60"
                }`}
              >
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.unlocked ? "bg-amber-500 text-white shadow-md shadow-amber-500/15" : "bg-gray-200 text-gray-500"
                }`}>
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-extrabold text-gray-800 leading-snug">{item.title.split(" (")[0]}</h4>
                    {item.unlocked && (
                      <span className="text-[9px] font-extrabold bg-amber-500 text-white rounded-sm px-1 py-0.1">已授</span>
                    )}
                  </div>
                  <p className="text-[10px] text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed custom saved bookmarked item grid list */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xs space-y-6">
          <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-xl">favorite</span>
            <span>我收藏的学习与实践路线 ({savedGaps.length})</span>
          </h2>

          {savedGaps.length > 0 ? (
            <div className="space-y-4">
              {savedGaps.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectGap(item.id)}
                  className="p-5 rounded-2xl border border-gray-150 hover:border-primary/25 bg-white hover:bg-gray-50/20 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[10px]">
                      <span className="text-primary font-bold px-1.5 py-0.5 bg-primary/5 rounded-md uppercase">
                        {item.categoryLabel}
                      </span>
                      <span className={`font-bold px-1.5 py-0.5 rounded-md ${
                        getSourceStatusLabel(item) === "有来源" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        {getSourceStatusLabel(item)}
                      </span>
                      {isDemoGap(item) && (
                        <span className="font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-md">
                          演示数据
                        </span>
                      )}
                      <span className="text-gray-500 font-medium">📍 {item.region}</span>
                      <span className="text-text-muted font-mono">难度: {item.difficultyLabel}</span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-text-muted line-clamp-1">
                      💡 {item.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(item.id, e);
                      }}
                      className="px-3.5 py-2 hover:bg-red-50 text-xs font-bold text-gray-400 hover:text-red-500 border border-gray-150 hover:border-red-200 rounded-xl transition-all select-none cursor-pointer"
                      title="取消保存"
                    >
                      移除收藏
                    </button>
                    
                    <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 group-hover:text-primary transition-transform text-lg">
                      arrow_forward_ios
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty Save prompt cards */
            <div className="p-10 border border-dotted border-gray-250 rounded-2xl text-center space-y-4 max-w-md mx-auto">
              <div className="h-12 w-12 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">favorite_border</span>
              </div>
              <h3 className="text-sm font-bold text-gray-800">您目前尚未收藏任何定制信息差</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                在“信息差图谱”或“首页”上游览时，点击卡片右上角的桃心，即可将该核心项目一键快速保存并激活你的多元生活实践路径图哦。
              </p>
              <button
                onClick={() => onNavigate("atlas")}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md shadow-primary/10 transition-all select-none"
              >
                立刻去图谱中探索精选
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
