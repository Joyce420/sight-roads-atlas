import React, { useState, useEffect } from "react";
import { InformationGap } from "../data";

interface DetailViewProps {
  gapId: string;
  gaps: InformationGap[];
  onBack: () => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

interface Comment {
  author: string;
  avatar: string;
  content: string;
  date: string;
}

export const DetailView: React.FC<DetailViewProps> = ({
  gapId,
  gaps,
  onBack,
  savedIds,
  onToggleSave,
}) => {
  const gap = gaps.find((g) => g.id === gapId) || gaps[0];

  // Simulator State
  const [userCapital, setUserCapital] = useState("");
  const [userLanguages, setUserLanguages] = useState("English");
  const [simulationResult, setSimulationResult] = useState<any>(null);

  // Comments State
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");

  // Load custom simulation / comments on load
  useEffect(() => {
    // 1. Initialise mock comments based on pathway
    const customCommentsKey = `comments_${gap.id}`;
    const storedComments = localStorage.getItem(customCommentsKey);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      const defaultComments: Comment[] = [
        {
          author: "数字游侠·老高",
          avatar: "A",
          content: `这个是真的硬核，之前咨询国内一个知名大中介，张口就要15万人民币，幸亏在这里看到了，自己动手发了几封邮件，真的成了！`,
          date: "3天前"
        },
        {
          author: "海外避坑达人",
          avatar: "B",
          content: `提醒一下，作者写的第三条避坑指南非常准，一定要特别注意当地政策的潜在过渡期，别一时脑热就直接提离职，一定要谋定后动。`,
          date: "1周前"
        }
      ];
      setComments(defaultComments);
      localStorage.setItem(customCommentsKey, JSON.stringify(defaultComments));
    }
    // Scroll detail to top on navigate
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [gap.id]);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const capital = parseFloat(userCapital) || 0;
    
    // Simple custom simulation matching algorithm
    let IsEligible = false;
    let Score = 0;
    let Feedback = "";

    if (gap.id === "1") {
      // 德国双元制 (Ausbildung)
      if (userLanguages.includes("German") || userLanguages.includes("德语") || userLanguages === "Both") {
        Score = 95;
        Feedback = "完美的德语特质！只要你开始向官方企业投递简历，成功率极高，几乎免资金负担。";
        IsEligible = true;
      } else {
        Score = 60;
        Feedback = "唯一阻碍是德语。虽然您资金准备充分，但德国双元制 100% 绑定德语会话。建议花 6-10 个月将德语死磕至 B1 级。";
        IsEligible = false;
      }
    } else if (gap.id === "2") {
      // 爱沙尼亚 e-residency
      if (capital >= 0.5) {
        Score = 98;
        Feedback = "您当前的流转资金绰绰有余。爱沙尼亚电子居民全套自办仅需 3000 多人民币，配合英文开发能力，建议立刻官网自办！";
        IsEligible = true;
      } else {
        Score = 75;
        Feedback = "项目本身仅需百元欧资金，但考虑到欧盟成立公司后续的代理托管费用（约150-200欧/年），建议资金量达到4000元以上再正式开启。";
        IsEligible = true;
      }
    } else if (gap.id === "3") {
      // 格鲁吉亚小微企业
      if (capital >= 1.5) {
        Score = 95;
        Feedback = "极其契合！免签飞抵资本非常充沛。第比利斯的低生活成本以及 1% 的超低小微企业所得税可以为您省下巨额资产。";
        IsEligible = true;
      } else {
        Score = 70;
        Feedback = "主要是首期飞抵格鲁吉亚以及在第比利斯的短租落脚资金。若能筹备 1.5 万元及以上，随时可以走起，0%税一键到位。";
        IsEligible = true;
      }
    } else if (gap.id === "4") {
      // 日本老宅 Akiya
      if (capital >= 15) {
        Score = 90;
        Feedback = "您的预算非常完美，完全足够买下空屋并进行现代化给排水重装和精美装潢！建议学习基本日语后去长野或静冈役所直接预约。";
        IsEligible = true;
      } else if (capital >= 4 && capital < 15) {
        Score = 70;
        Feedback = "虽然买下空置屋只要几千元，但是日本二次装修改造人工昂贵，合并净化槽更新一般需要 4 万元以上，建议精打细算亲自设计。";
        IsEligible = false;
      } else {
        Score = 40;
        Feedback = "预算偏低。日本部分老空屋虽为 0 元，但有高额契税及固定资产治理税要垫付，且没有翻修费容易陷入烂尾，建议先攒钱或考虑其他低成本项目。";
        IsEligible = false;
      }
    } else if (gap.id === "5") {
      // 加拿大 BC Tech
      if (userLanguages === "English" || userLanguages === "Both") {
        Score = 85;
        Feedback = "英语水平及起步符合资质！这是不经过黑箱中介、完全凭借技术简历在 LinkedIn 上公开求职的最佳高技术移民路。请立刻优化英文简历！";
        IsEligible = true;
      } else {
        Score = 55;
        Feedback = "加拿大对英文（G类雅思）有硬性大门槛。虽然您资金充沛，但建议先花 3-6 个月将雅思稳定备考到 CLB 7 级。";
        IsEligible = false;
      }
    } else {
      // 瓦努阿图 & 墨西哥
      if (capital >= 1.5) {
        Score = 98;
        Feedback = "资产完美覆盖！不需要中介的 8 万黑箱代办费，直接带着材料赴香港领馆办理即可。几千块24小时即得卡。";
        IsEligible = true;
      } else {
        Score = 65;
        Feedback = "自办规费及公证费用在数千元左右，此外部分项目需要一定的定期银行活期存款核验流水。建议先保证活期里有一笔备用万级流动资。";
        IsEligible = false;
      }
    }

    setSimulationResult({
      score: Score,
      eligible: IsEligible,
      feedback: Feedback
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentContent.trim()) return;

    const newComment: Comment = {
      author: newCommentAuthor.trim(),
      avatar: newCommentAuthor.trim().charAt(0).toUpperCase(),
      content: newCommentContent.trim(),
      date: "刚刚"
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    setNewCommentAuthor("");
    setNewCommentContent("");

    // Persistent storage
    localStorage.setItem(`comments_${gap.id}`, JSON.stringify(updatedComments));
  };

  const isSaved = savedIds.includes(gap.id);

  return (
    <div className="pb-24 pt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      {/* Back & Breadcrumb Bar */}
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
          <span>{isSaved ? "已保存到我的地图" : "关注保存路线"}</span>
        </button>
      </div>

      {/* Main Core Detail Hero Heading Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 font-bold text-primary bg-primary/5 rounded-xl">
            {gap.categoryLabel}
          </span>
          <span className="text-text-muted">·</span>
          <span className="text-gray-600 font-bold">{gap.region}</span>
          <span className="text-text-muted">·</span>
          <span className="text-text-muted">发布：{gap.date}</span>
          <span className="text-text-muted">·</span>
          <span className="text-text-muted">主编：{gap.author}</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 leading-tight">
            {gap.title}
          </h1>
          <p className="text-base md:text-lg text-primary font-bold bg-primary/4 p-4 rounded-2xl border-l-[4px] border-primary leading-relaxed">
            💡 核心亮点：{gap.tagline}
          </p>
        </div>

        <p className="text-sm md:text-base text-text-main leading-relaxed">
          {gap.description}
        </p>

        {/* Objective parameters visual meters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">fitness_center</span>
            </div>
            <div>
              <div className="text-[11px] text-text-muted font-bold block">获取执行抗力 (难度)</div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-gray-800">{gap.difficultyLabel}</span>
                <div className="flex gap-0.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${gap.difficulty === "low" || gap.difficulty === "medium" || gap.difficulty === "high" ? "bg-amber-500" : "bg-gray-200"}`}></span>
                  <span className={`h-2.5 w-2.5 rounded-full ${gap.difficulty === "medium" || gap.difficulty === "high" ? "bg-amber-500" : "bg-gray-200"}`}></span>
                  <span className={`h-2.5 w-2.5 rounded-full ${gap.difficulty === "high" ? "bg-amber-500" : "bg-gray-200"}`}></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
            <div>
              <div className="text-[11px] text-text-muted font-bold block">前置自备资本预算</div>
              <div className="font-extrabold text-sm text-gray-800 line-clamp-1" title={gap.costEstimation}>
                {gap.costEstimation.split("（")[0]}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">schedule</span>
            </div>
            <div>
              <div className="text-[11px] text-text-muted font-bold block">实现转化周期</div>
              <div className="font-extrabold text-sm text-gray-800">{gap.timeline}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stereoscopic Contrast Section: Bias vs actual Gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Bias card */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-orange-600 font-extrabold text-sm">
            <span className="material-symbols-outlined text-[20px]">cancel</span>
            <span>传统局限固有认知 (大中介黑箱)</span>
          </div>
          <h4 className="text-lg font-extrabold text-gray-800">
            为什么95%的普通人被蒙在鼓里且花了高昂冤枉钱？
          </h4>
          <p className="text-[13px] md:text-sm text-gray-600 leading-relaxed">
            信息垄断暴利是传统的商业法则。中介故意制造复杂的行文障碍和资质盲点，将原本在国外极其普及、由政府开办和学校直招的免费/小微通道（如双元制、白菜价老屋及领事馆直办的小众白卡）进行层层黑金打包，向不了解跨国法律政策的买家开出动辄 8万、15万 的天价服务费。
          </p>
        </div>

        {/* The Real Truth Information Gap card */}
        <div className="bg-sky-50 border border-sky-100 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-extrabold text-sm">
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span>看见更多路底视视角 (真实信息差)</span>
          </div>
          <h4 className="text-lg font-extrabold text-gray-900">
            极客玩家如何利用规则直接省下几十万？
          </h4>
          <p className="text-[13px] md:text-sm text-text-main leading-relaxed">
            {gap.coreGap}
          </p>
        </div>
      </div>

      {/* Step-by-step Map Implementation Guide */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-gray-950 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[22px]">route</span>
            <span>正规自办：核心实操执行步骤图谱</span>
          </h2>
          <p className="text-xs text-text-muted">
            每一个路径都经过严格论证。请严格遵循官方机构步骤，稳扎稳打完成材料筹备。
          </p>
        </div>

        {/* Step List Container */}
        <div className="relative border-l-2 border-primary/10 ml-4 pl-6 space-y-8 py-2">
          {gap.practicalSteps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Step indicator dot */}
              <div className="absolute -left-[35px] top-0 h-6.5 w-6.5 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20 group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                  第 {idx + 1} 阶段：{step.split("：")[0]}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed pl-1">
                  {step.split("：")[1] || step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* True Story Case Scenario */}
      <div className="bg-amber-500/5 border border-amber-500/10 rounded-3xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-600 font-extrabold text-sm">
          <span className="material-symbols-outlined text-[20px]">rate_review</span>
          <span>素人自办成功案例还原</span>
        </div>
        <p className="text-xs md:text-sm text-text-main italic leading-relaxed pl-4 border-l-2 border-amber-500">
          “ {gap.scenarios} ”
        </p>
      </div>

      {/* Interactive Matchmaking Calculator Simulator */}
      <div id="calculator-section" className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-950 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[22px]">calculate</span>
            <span>模拟自测：我符合该路径的通关率吗？</span>
          </h3>
          <p className="text-xs text-text-muted">
            输入你的简单背景数据，系统将根据本路径客观参数（资金要求、语言瓶颈）计算通过概率并提供个性化通盘避坑建议。
          </p>
        </div>

        <form onSubmit={handleSimulate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-gray-50/50 p-5 rounded-2xl border border-gray-100/60">
          {/* User budget capital input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">💰 预计首期备用启动金 (万元)</label>
            <input
              type="number"
              value={userCapital}
              onChange={(e) => setUserCapital(e.target.value)}
              placeholder="如：5 （表示 5 万人民币）"
              step="any"
              required
              className="w-full text-xs font-semibold px-3 py-2 border border-gray-200 bg-white rounded-xl focus:outline-hidden focus:border-primary/50"
            />
          </div>

          {/* User major foreign language dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">🗣️ 你当前的外语优势</label>
            <select
              value={userLanguages}
              onChange={(e) => setUserLanguages(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 border border-gray-200 bg-white rounded-xl focus:outline-hidden focus:border-primary/50"
            >
              <option value="English">良好的英语水平 (雅思 6 分左右或以上)</option>
              <option value="Both">精通英文 + 同时自学/掌握意向小语种</option>
              <option value="German">掌握德语 (日常日常工作交流 B1/B2)</option>
              <option value="None">外语尚在极速死磕或零基础状态</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-container text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md shadow-primary/10 transition-all select-none"
          >
            开始模拟资格测评
          </button>
        </form>

        {/* Simulator Outcome Display Card */}
        {simulationResult && (
          <div className="p-5 rounded-2xl border flex flex-col md:flex-row items-center gap-5 slide-in" style={{
            backgroundColor: simulationResult.eligible ? "rgba(16, 185, 129, 0.04)" : "rgba(245, 158, 11, 0.04)",
            borderColor: simulationResult.eligible ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)"
          }}>
            <div className="relative h-18 w-18 flex items-center justify-center rounded-full border-4 font-extrabold text-xl font-mono shrink-0 select-none shadow-inner" style={{
              color: simulationResult.eligible ? "#10B981" : "#F59E0B",
              borderColor: simulationResult.eligible ? "#10B981" : "#F59E0B"
            }}>
              {simulationResult.score}%
              <div className="text-[8px] absolute bottom-1 font-bold">精准分值</div>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-1.5">
                <span className={`text-sm font-extrabold ${simulationResult.eligible ? 'text-green-600' : 'text-amber-600'}`}>
                  {simulationResult.eligible ? "符合资质 · 随时开启！" : "有待完善 · 稳步绸缪"}
                </span>
                <span className="text-[10px] bg-white border border-gray-200 rounded-md px-1.5 py-0.5 text-text-muted">
                  极客推演意见
                </span>
              </div>
              <p className="text-xs text-text-main leading-relaxed">
                {simulationResult.feedback}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Official Links Registry */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider block">
          🔗 官方政策、规费与直接申请渠道汇总
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gap.relatedLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
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
          ))}
        </div>
      </div>

      {/* Warnings & Risk Controls */}
      <div className="bg-red-50 border border-red-100 rounded-3xl p-6 md:p-8 space-y-3">
        <div className="flex items-center gap-2 text-red-600 font-extrabold text-sm">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          <span>⚠️ 避坑红线及地缘硬核警示</span>
        </div>
        <p className="text-xs md:text-sm text-red-700 leading-relaxed leading-relaxed pl-1">
          {gap.risksAndWarmings}
        </p>
      </div>

      {/* Comments section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-gray-950 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[22px]">forum</span>
          <span>共享研判评论 ({comments.length})</span>
        </h3>

        {/* Comment input form */}
        <form onSubmit={handleAddComment} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500">研判人昵称</label>
              <input
                type="text"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                placeholder="例如：数字游民·小李"
                required
                className="w-full text-xs font-semibold px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500">研判见解与实操反馈</label>
            <textarea
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              placeholder="写下您亲自踏勘或咨询该项目的真实体验、最新官方规费调整，帮助更多同行者..."
              required
              rows={3}
              className="w-full text-xs font-semibold p-3.5 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shadow-md shadow-primary/10 select-none cursor-pointer"
          >
            发表共享研判看法
          </button>
        </form>

        {/* Comment lists */}
        <div className="pt-4 border-t border-gray-100 space-y-6">
          {comments.map((comment, idx) => (
            <div key={idx} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
              <div className="h-9 w-9 rounded-full bg-primary/8 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                {comment.avatar}
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">{comment.author}</span>
                  <span className="text-[10px] text-text-muted font-mono">{comment.date}</span>
                </div>
                <p className="text-xs text-text-main leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
