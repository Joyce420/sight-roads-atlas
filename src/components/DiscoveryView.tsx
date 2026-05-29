import React, { useMemo, useState } from "react";
import { InformationGap, getSourceStatusLabel, isDemoGap } from "../data";

interface DiscoveryViewProps {
  gaps: InformationGap[];
  onSelectGap: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

const ENTRY_CATEGORIES: {
  id: InformationGap["category"];
  label: string;
  icon: string;
}[] = [
  { id: "welfare", label: "权益福利", icon: "card_membership" },
  { id: "public_resource", label: "公共资源", icon: "account_balance" },
  { id: "city_opportunity", label: "城市机会", icon: "location_city" },
  { id: "policy_service", label: "政策服务", icon: "description" },
  { id: "ai_tools", label: "AI工具", icon: "precision_manufacturing" },
  { id: "competition", label: "比赛项目", icon: "emoji_events" },
  { id: "go_abroad", label: "出国方式", icon: "flight_takeoff" },
  { id: "monetization", label: "赚钱探索", icon: "monetization_on" },
  { id: "career", label: "职业体验", icon: "work" },
  { id: "lifestyle", label: "生活方式", icon: "spa" },
];

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({ gaps, onSelectGap, savedIds, onToggleSave }) => {
  const [selectedCategory, setSelectedCategory] = useState<InformationGap["category"]>("welfare");

  const selectedEntry = ENTRY_CATEGORIES.find((entry) => entry.id === selectedCategory);
  const relatedGaps = useMemo(
    () => gaps.filter((gap) => gap.category === selectedCategory),
    [gaps, selectedCategory]
  );

  return (
    <div className="pb-24 pt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-10 shadow-xs space-y-8">
        <div className="text-center space-y-3">
          <div className="h-20 w-20 bg-primary/5 text-primary rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <span className="material-symbols-outlined text-[45px]">explore</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950">
              探索入口
            </h1>
            <p className="text-sm text-text-muted max-w-xl mx-auto leading-relaxed">
              选择你感兴趣的信息方向，先看到相关卡片，再自行判断是否需要继续核验。不做职业规划测试，也不替你决定人生路径。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {ENTRY_CATEGORIES.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setSelectedCategory(entry.id)}
              className={`p-4 rounded-2xl border text-left transition-all select-none ${
                selectedCategory === entry.id
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/10"
                  : "bg-gray-50 border-gray-100 text-gray-700 hover:border-primary/25 hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[24px] block mb-2">{entry.icon}</span>
              <span className="text-xs font-extrabold">{entry.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xl font-extrabold text-gray-950">
              {selectedEntry?.label || "相关信息"}
            </h2>
            <p className="text-xs text-text-muted mt-1">
              当前展示 {relatedGaps.length} 条 V0.1 演示数据，请进入详情页核验来源与条件。
            </p>
          </div>
        </div>

        {relatedGaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {relatedGaps.map((gap) => {
              const isSaved = savedIds.includes(gap.id);

              return (
              <div
                key={gap.id}
                onClick={() => onSelectGap(gap.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onSelectGap(gap.id);
                }}
                className="opportunity-card bg-white rounded-2xl border border-gray-100 p-6 text-left hover:border-primary/25 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between gap-3">
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
                    type="button"
                    onClick={(e) => onToggleSave(gap.id, e)}
                    className="h-8 w-8 rounded-full bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all border border-gray-100 shrink-0"
                    title={isSaved ? "取消收藏" : "加入收藏"}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isSaved ? "fill-current text-red-500 font-bold" : ""}`}>
                      favorite
                    </span>
                  </button>
                </div>

                <div className="space-y-2 mt-4">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-2">
                    {gap.title}
                  </h3>
                  <p className="text-xs font-bold text-primary-container leading-relaxed line-clamp-2">
                    {gap.tagline}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                    {gap.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-text-muted font-bold">
                  <span>难度：{gap.difficultyLabel}</span>
                  <span className="inline-flex items-center gap-1 text-primary">
                    查看详情
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </div>
            );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xs text-center space-y-3">
            <div className="h-14 w-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">inventory_2</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">该方向暂未补充卡片</h3>
            <p className="text-sm text-text-muted">
              当前为 V0.1 演示数据，后续会持续扩展。
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
