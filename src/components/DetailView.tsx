import React, { useState, useEffect } from "react";
import { InformationGap, getSourceStatusLabel, isDemoGap } from "../data";
import {
  createPublicComment,
  fetchPublicComments,
  isSupabaseConfigured,
  type PublicComment,
} from "../supabase";

interface DetailViewProps {
  gapId: string;
  gaps: InformationGap[];
  onBack: () => void;
  onNavigate?: (view: string) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

type DetailLink = InformationGap["relatedLinks"][number] & { sourceUrl?: string };

const isValidExternalUrl = (url?: string) => /^https?:\/\//i.test(url || "");

export const DetailView: React.FC<DetailViewProps> = ({
  gapId,
  gaps,
  onBack,
  onNavigate,
  savedIds,
  onToggleSave,
}) => {
  const gap = gaps.find((g) => g.id === gapId) || gaps[0];
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [expandedCommentIds, setExpandedCommentIds] = useState<string[]>([]);
  const [saveNotice, setSaveNotice] = useState("");
  const [commentError, setCommentError] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentForm, setCommentForm] = useState({ nickname: "", content: "" });

  useEffect(() => {
    let isActive = true;
    const storedComments = localStorage.getItem(`comments_${gap.id}`);
    const localComments = storedComments ? JSON.parse(storedComments) : [];

    setShowAllComments(false);
    setExpandedCommentIds([]);
    setSaveNotice("");
    setCommentError("");
    setComments(localComments);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!isSupabaseConfigured()) {
      return () => {
        isActive = false;
      };
    }

    setIsLoadingComments(true);
    fetchPublicComments(gap.id)
      .then((remoteComments) => {
        if (!isActive) return;
        setComments(remoteComments);
        localStorage.setItem(`comments_${gap.id}`, JSON.stringify(remoteComments));
      })
      .catch(() => {
        if (!isActive) return;
        setCommentError("公开评论读取失败，当前暂时显示本机缓存。");
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoadingComments(false);
      });

    return () => {
      isActive = false;
    };
  }, [gap.id]);

  const showSaveNotice = (isRemote: boolean) => {
    setSaveNotice(
      isRemote
        ? "评论已公开保存。刷新页面或换设备后仍可看到。"
        : "评论已保存到本机。当前公开保存失败，内容暂不会公开发布。"
    );
  };

  const formatCommentTime = (createdAt: string) => {
    const createdTime = new Date(createdAt).getTime();
    if (Number.isNaN(createdTime)) return "刚刚";
    const diffMinutes = Math.floor((Date.now() - createdTime) / 60000);
    if (diffMinutes < 1) return "刚刚";
    if (diffMinutes < 60) return `${diffMinutes}分钟前`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}小时前`;
    if (diffMinutes < 2880) return "昨天";
    return `${Math.floor(diffMinutes / 1440)}天前`;
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = commentForm.content.trim();
    const nickname = commentForm.nickname.trim() || "匿名用户";
    if (!content || isSubmittingComment) return;

    setCommentError("");
    setIsSubmittingComment(true);

    const fallbackComment: PublicComment = {
      id: `${Date.now()}`,
      cardId: gap.id,
      nickname,
      content,
      createdAt: new Date().toISOString(),
    };

    try {
      const newComment = isSupabaseConfigured()
        ? await createPublicComment({ cardId: gap.id, nickname, content })
        : fallbackComment;
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      localStorage.setItem(`comments_${gap.id}`, JSON.stringify(updatedComments));
      setCommentForm({ nickname: "", content: "" });
      showSaveNotice(isSupabaseConfigured());
    } catch {
      const updatedComments = [fallbackComment, ...comments];
      setComments(updatedComments);
      localStorage.setItem(`comments_${gap.id}`, JSON.stringify(updatedComments));
      setCommentForm({ nickname: "", content: "" });
      setCommentError("公开评论保存失败，已暂存在本机。请稍后重试。");
      showSaveNotice(false);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const toggleCommentExpanded = (id: string) => {
    setExpandedCommentIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const isSaved = savedIds.includes(gap.id);
  const detailLinks = gap.relatedLinks as DetailLink[];
  const validLinks = detailLinks.filter((link) => isValidExternalUrl(link.sourceUrl || link.url));
  const visibleComments = showAllComments ? comments : comments.slice(0, 3);
  const sourceStatus = validLinks.length > 0 ? "有来源" : "待补充来源";

  return (
    <div className="pb-24 pt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-gray-700 bg-white hover:bg-gray-100/80 rounded-xl border border-gray-200 transition-all select-none"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>返回图谱列表</span>
        </button>

        <button
          onClick={(e) => onToggleSave(gap.id, e)}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-xl border transition-all ${
            isSaved
              ? "bg-red-50 border-red-200 text-red-600"
              : "bg-white border-gray-200 text-gray-600 hover:text-red-500 hover:bg-red-50/20"
          }`}
        >
          <span className={`material-symbols-outlined text-[18.5px] ${isSaved ? "fill-current star text-red-500 font-bold" : ""}`}>
            favorite
          </span>
          <span>{isSaved ? "已收藏" : "收藏"}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 font-bold text-primary bg-primary/5 rounded-xl">
            {gap.categoryLabel}
          </span>
          <span className={`px-3 py-1 font-bold rounded-xl ${
            getSourceStatusLabel(gap) === "有来源" ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50"
          }`}>
            {getSourceStatusLabel(gap)}
          </span>
          {isDemoGap(gap) && (
            <span className="px-3 py-1 font-bold text-gray-500 bg-gray-100 rounded-xl">
              演示数据
            </span>
          )}
          <span className="text-text-muted">·</span>
          <span className="text-gray-600 font-bold">{gap.region}</span>
          <span className="text-text-muted">·</span>
          <span className="text-text-muted">更新时间：{gap.date}</span>
          <span className="text-text-muted">·</span>
          <span className="text-text-muted">{sourceStatus}</span>
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-xs md:text-sm text-amber-700 font-bold leading-relaxed">
          本页用于帮助你理解和核验信息，不构成申请建议或成功承诺。
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 leading-tight">
            {gap.title}
          </h1>
          <p className="text-base md:text-lg text-primary font-bold bg-primary/4 p-4 rounded-2xl border-l-[4px] border-primary leading-relaxed">
            这是什么：{gap.tagline}
          </p>
        </div>

        <p className="text-sm md:text-base text-text-main leading-relaxed">
          {gap.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">rule</span>
            </div>
            <div>
              <div className="text-[11px] text-text-muted font-bold block">使用条件/申请条件</div>
              <div className="font-extrabold text-sm text-gray-800">{gap.difficultyLabel}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
            <div>
              <div className="text-[11px] text-text-muted font-bold block">成本</div>
              <div className="font-extrabold text-sm text-gray-800 line-clamp-1" title={gap.costEstimation}>
                {gap.costEstimation}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">schedule</span>
            </div>
            <div>
              <div className="text-[11px] text-text-muted font-bold block">时间窗口</div>
              <div className="font-extrabold text-sm text-gray-800 line-clamp-2">{gap.timeline}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-sky-50 border border-sky-100 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-extrabold text-sm">
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span>为什么值得知道</span>
          </div>
          <h4 className="text-lg font-extrabold text-gray-900">
            它可能补上哪类信息盲区
          </h4>
          <p className="text-[13px] md:text-sm text-text-main leading-relaxed">
            {gap.coreGap}
          </p>
        </div>

        <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-orange-600 font-extrabold text-sm">
            <span className="material-symbols-outlined text-[20px]">do_not_disturb_on</span>
            <span>不适合谁盲目跟风</span>
          </div>
          <h4 className="text-lg font-extrabold text-gray-800">
            不建议只凭卡片直接做决定
          </h4>
          <p className="text-[13px] md:text-sm text-gray-600 leading-relaxed">
            如果无法核验官方来源、无法承担成本与时间变化，或只是因为某个路径示例而冲动行动，都不适合盲目跟风。请先把政策状态、地区限制、资格条件和风险边界逐项核对清楚。
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-gray-950 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[22px]">groups</span>
          <span>适合谁先了解</span>
        </h3>
        <p className="text-xs md:text-sm text-text-main leading-relaxed">
          {gap.appliedTo}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-gray-950 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[22px]">route</span>
            <span>使用条件/申请条件</span>
          </h2>
          <p className="text-xs text-text-muted">
            以下仅作为核验清单与办理路径提示，实际要求以官方页面和当地最新口径为准。
          </p>
        </div>

        <div className="relative border-l-2 border-primary/10 ml-4 pl-6 space-y-8 py-2">
          {gap.practicalSteps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] top-0 h-6.5 w-6.5 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20 group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                  第 {idx + 1} 项：{step.split("：")[0]}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed pl-1">
                  {step.split("：")[1] || step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-500/5 border border-amber-500/10 rounded-3xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-600 font-extrabold text-sm">
          <span className="material-symbols-outlined text-[20px]">rate_review</span>
          <span>路径示例</span>
        </div>
        <p className="text-xs text-amber-700 font-bold">
          以下为演示示例，仅用于说明信息路径，不代表真实人物经历。
        </p>
        <p className="text-xs md:text-sm text-text-main italic leading-relaxed pl-4 border-l-2 border-amber-500">
          {gap.scenarios}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-950 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[22px]">checklist</span>
            <span>了解清单</span>
          </h3>
          <p className="text-xs text-text-muted">
            这里不判断你是否适合，只列出需要自行核对的条件。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["身份/年龄限制", gap.appliedTo],
            ["地区限制", gap.region],
            ["成本", gap.costEstimation],
            ["时间窗口", gap.timeline],
            ["官方来源", sourceStatus],
            ["风险提示", gap.risksAndWarmings],
          ].map(([label, value]) => (
            <div key={label} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-1">
              <div className="text-[11px] font-bold text-gray-500">{label}</div>
              <p className="text-xs text-text-main leading-relaxed line-clamp-3">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-3">
          <h3 className="text-lg font-bold text-gray-950 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[22px]">payments</span>
            <span>成本与时间</span>
          </h3>
          <p className="text-xs md:text-sm text-text-main leading-relaxed">成本：{gap.costEstimation}</p>
          <p className="text-xs md:text-sm text-text-main leading-relaxed">时间：{gap.timeline}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-3">
          <h3 className="text-lg font-bold text-gray-950 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[22px]">update</span>
            <span>更新时间</span>
          </h3>
          <p className="text-xs md:text-sm text-text-main leading-relaxed">{gap.date}</p>
          <p className="text-xs text-text-muted">
            V0.1 阶段仅展示有限演示数据，信息变化请以官方来源为准。
          </p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-3xl p-6 md:p-8 space-y-3">
        <div className="flex items-center gap-2 text-red-600 font-extrabold text-sm">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          <span>风险与误区</span>
        </div>
        <p className="text-xs md:text-sm text-red-700 leading-relaxed pl-1">
          {gap.risksAndWarmings}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider block">
          🔗 官方来源/待补充来源
        </h3>
        {detailLinks.length === 0 ? (
          <div
            className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed w-full"
          >
            <span className="text-xs font-bold">来源待补充</span>
            <span className="material-symbols-outlined text-[15px]">link_off</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {detailLinks.map((link, idx) => {
              const sourceUrl = link.sourceUrl || link.url;
              const isValid = isValidExternalUrl(sourceUrl);

              return isValid ? (
                <a
                  key={idx}
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-xl">language</span>
                    <span className="text-xs font-bold text-gray-800 group-hover:text-primary line-clamp-1">{link.title}</span>
                  </div>
                  <span className="material-symbols-outlined text-[15px] text-gray-400 group-hover:translate-x-1 transition-transform">open_in_new</span>
                </a>
              ) : (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed"
                >
                  <span className="text-xs font-bold">{link.title || "来源待补充"}</span>
                  <span className="material-symbols-outlined text-[15px]">link_off</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => onNavigate?.("contribute")}
          className="text-xs font-bold text-text-muted hover:text-primary transition-colors"
        >
          发现错误？投稿或纠错
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-950 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[22px]">forum</span>
              <span>评论区</span>
            </h3>
            <p className="text-xs md:text-sm text-text-muted leading-relaxed">
              看过、用过、申请过的人可以分享经历；还不清楚的人也可以直接提问。
            </p>
          </div>
          <span className="text-xs font-bold text-text-muted bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
            评论 {comments.length} 条
          </span>
        </div>

        {saveNotice && (
          <div className="rounded-2xl bg-green-50 border border-green-100 p-4 text-xs md:text-sm text-green-700 font-bold">
            {saveNotice}
          </div>
        )}
        {commentError && (
          <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-xs md:text-sm text-amber-700 font-bold">
            {commentError}
          </div>
        )}

        <form onSubmit={handleAddComment} className="space-y-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100/60">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500">昵称（可选）</label>
              <input
                type="text"
                value={commentForm.nickname}
                onChange={(e) => setCommentForm({ ...commentForm, nickname: e.target.value })}
                placeholder="匿名用户"
                className="w-full text-xs font-semibold px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500">评论内容</label>
              <textarea
                value={commentForm.content}
                onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                placeholder="写下你的经历、问题或提醒，例如：我申请过这个项目，实际需要…… / 大专生能不能申请？"
                required
                rows={3}
                className="w-full text-xs font-semibold p-3.5 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmittingComment}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shadow-md shadow-primary/10 select-none cursor-pointer"
          >
            {isSubmittingComment ? "发布中..." : "发布评论"}
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 space-y-4">
          {isLoadingComments ? (
            <p className="text-xs md:text-sm text-text-muted leading-relaxed bg-gray-50 rounded-2xl border border-gray-100 p-4">
              正在读取公开评论...
            </p>
          ) : visibleComments.length === 0 ? (
            <p className="text-xs md:text-sm text-text-muted leading-relaxed bg-gray-50 rounded-2xl border border-gray-100 p-4">
              暂无评论。你可以第一个补充经历、提问或提醒别人避坑。
            </p>
          ) : (
            visibleComments.map((item) => {
              const isExpanded = expandedCommentIds.includes(item.id);
              const canExpand = item.content.length > 110;
              const avatarText = item.nickname.slice(0, 1).toUpperCase() || "匿";

              return (
                <div key={item.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/40 flex gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/8 text-primary flex items-center justify-center text-xs font-extrabold shrink-0">
                    {avatarText}
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-extrabold text-gray-900">{item.nickname}</span>
                      <span className="text-[10px] text-text-muted font-mono">{formatCommentTime(item.createdAt)}</span>
                    </div>
                    <p className={`text-xs md:text-sm text-text-main leading-relaxed whitespace-pre-line ${isExpanded ? "" : "line-clamp-3"}`}>
                      {item.content}
                    </p>
                    {canExpand && (
                      <button
                        type="button"
                        onClick={() => toggleCommentExpanded(item.id)}
                        className="text-[11px] font-bold text-primary hover:text-primary-container"
                      >
                        {isExpanded ? "收起全文" : "展开全文"}
                      </button>
                    )}
                    <div className="flex items-center gap-4 text-[11px] text-text-muted font-bold">
                      <span>回复（暂未开放）</span>
                      <span>有用（暂未开放）</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {comments.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllComments((value) => !value)}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:border-primary/30 hover:text-primary transition-all"
            >
              {showAllComments ? "收起评论" : "查看全部评论"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
