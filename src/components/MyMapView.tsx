import React from "react";
import { InformationGap } from "../data";

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

  // Determine active continental hubs based on user favorites
  const hubs = [
    {
      id: "europe",
      name: "欧洲信息主航线 (Europe Terminal)",
      region: "欧洲",
      desc: "涵盖德国双元制学徒就职、爱沙尼亚DNV数字游民公司注册及税筹等政策通道。",
      icon: "flight_takeoff"
    },
    {
      id: "north_america",
      name: "北美高技术极速引渡 (North America Link)",
      region: "北美",
      desc: "涵盖加拿大 BC Tech Draw 指定岗位低分省提名直通枫叶卡自办全材料。",
      icon: "rocket"
    },
    {
      id: "eurasia",
      name: "高加索/中亚轻税走廊 (Eurasia Path)",
      region: "中东/中亚",
      desc: "格鲁吉亚第比利斯独立自雇年入18w美金以内，享0.1%到1%合法低额税率通道。",
      icon: "currency_exchange"
    },
    {
      id: "asia",
      name: "东亚白菜置业美学 (Asia Sanctuary)",
      region: "亚洲",
      desc: "长野、静冈等地0元或极低日元空置独栋老宅 Akiya 产权过户及修缮金补贴。",
      icon: "home"
    },
    {
      id: "latin_oceania",
      name: "离岸大洋中转枢纽 (Pacific & Latin Loop)",
      region: "拉丁美洲",
      desc: "瓦努阿图、墨西哥绿卡几千元纯官办规费24小时发件避坑中转配置跳盘。",
      icon: "explore"
    }
  ];

  // User Achievements badges based on state
  const achievements = [
    {
      title: "启航探索舵手 (The Navigator)",
      desc: "收藏保存至少 1 项世界套利信息差指南",
      unlocked: savedIds.length >= 1,
      icon: "compass_calibration"
    },
    {
      title: "理性精算玩家 (The Arbitrageur)",
      desc: "在发掘测验中进行了专属背景建模匹配",
      unlocked: true, // Auto unlocked as they have access to the app
      icon: "monitoring"
    },
    {
      title: "无私点灯使者 (The Pathfinder)",
      desc: "自主在共享板块编写并上报了至少 1 条真实信息差",
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
          <span>我的信息差图谱地图</span>
        </h1>
        <p className="text-sm text-text-muted">
          通过您收藏和关注的各洲项目，系统已智能帮您测算并打通对应的离岸信息流通航线网。
        </p>
      </div>

      {/* Connection Hub Radar Panel */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl animate-pulse">radar</span>
            <span>互动全球套利航道中心 (World Air-bridge Radar)</span>
          </h2>
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted font-mono bg-gray-50 px-3 py-1.5 rounded-lg border">
            <span>连接状态：</span>
            <span className="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
            <span className="text-green-600">离岸套利节点正常</span>
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
                      {h.icon === "flight_takeoff" ? "flight_takeoff" :
                       h.icon === "rocket" ? "rocket_launch" :
                       h.icon === "currency_exchange" ? "currency_exchange" :
                       h.icon === "home" ? "home" : "explore"}
                    </span>
                    
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActivated
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}>
                      {isActivated ? "🟢 激活" : "⚪️ 离线"}
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
                    <span className="text-primary font-bold">已连通 {matchesCount} 条突围路</span>
                  ) : (
                    <span className="text-gray-400">关注对应大洲项目后连结</span>
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
            <span>我的图谱精算成就</span>
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
            <span>我保存的定制世界路线 ({savedGaps.length})</span>
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
                      移除保存
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
              <h3 className="text-sm font-bold text-gray-800">您目前尚未保存任何定制航道</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                在“信息差图谱”或“首页”上游览时，点击卡片右上角的桃心，即可将该套利大项目一键永久保存并激活你的互动连接大洋路图哦。
              </p>
              <button
                onClick={() => onNavigate("atlas")}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md shadow-primary/10 transition-all select-none cursor-pointer"
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
