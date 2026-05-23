import React, { useState } from "react";
import { InformationGap } from "../data";

interface ContributeViewProps {
  onAddGap: (newGap: InformationGap) => void;
  onNavigate: (view: string) => void;
}

export const ContributeView: React.FC<ContributeViewProps> = ({ onAddGap, onNavigate }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<any>("welfare");
  const [region, setRegion] = useState("全国/线上");
  const [difficulty, setDifficulty] = useState<any>("low");
  const [rating, setRating] = useState(4);
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [coreGap, setCoreGap] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [costEstimation, setCostEstimation] = useState("");
  const [timeline, setTimeline] = useState("");
  
  // Dynamic step array
  const [steps, setSteps] = useState<string[]>([
    "核实官方政策门槛，准备前期学籍、身份等验证材料",
    "通过官网合规入口进行实名制资格申请或投递方案"
  ]);

  const [linkTitle1, setLinkTitle1] = useState("");
  const [linkUrl1, setLinkUrl1] = useState("");
  const [scenarios, setScenarios] = useState("");
  const [risksAndWarmings, setRisksAndWarmings] = useState("");
  
  // Submit state triggers
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length === 1) return;
    const updated = steps.filter((_, idx) => idx !== index);
    setSteps(updated);
  };

  const handleStepChange = (index: number, val: string) => {
    const updated = [...steps];
    updated[index] = val;
    setSteps(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (title.trim().length < 4) {
      alert("信息差项目名称需要至少包含 4 个字。");
      return;
    }
    if (tagline.trim().length < 8) {
      alert("信息差亮点需要至少包含 8 个字。");
      return;
    }

    // Format categoryLabel
    const catLabelMap: { [key: string]: string } = {
      welfare: "权益福利",
      public_resource: "公共资源",
      city_opportunity: "城市机会",
      policy_service: "政策服务",
      see_world: "看世界",
      go_abroad: "出国方式",
      competition: "比赛项目",
      monetization: "赚钱探索",
      ai_tools: "AI工具",
      career: "职业体验",
      growth: "能力成长",
      lifestyle: "生活方式"
    };

    const diffLabelMap: { [key: string]: string } = {
      low: "简单",
      medium: "中等",
      high: "高难度"
    };

    // Filter out empty steps
    const filteredSteps = steps.filter(s => s.trim() !== "");
    if (filteredSteps.length === 0) {
      filteredSteps.push("按照官方指定政务窗口或官方网络指引提交全套实名认证。");
    }

    const newGap: InformationGap = {
      id: `custom_${Date.now()}`,
      title: title.trim(),
      category,
      categoryLabel: catLabelMap[category] || "权益福利",
      region,
      difficulty,
      difficultyLabel: diffLabelMap[difficulty] || "简单",
      rating,
      tagline: tagline.trim(),
      description: description.trim() || `${title}的全套信息差自建自办方案。`,
      coreGap: coreGap.trim() || "许多人因信息闭塞常支付过高代理服务费。事实上，通过官方公布流程自主申请，公开、安全、且大部分不设额外手续费用。",
      appliedTo: appliedTo.trim() || "寻求自主探索学识和求学求职的普通高校学子、创作者及有再学习需求的普通市民。",
      costEstimation: costEstimation.trim() || "官方自办通常免费，仅需自负路费与简单工本复核款",
      timeline: timeline.trim() || "自主填备并提交（1-5分钟） + 官方复核（3-10个工作日）",
      practicalSteps: filteredSteps,
      relatedLinks: linkTitle1.trim() && linkUrl1.trim() ? [{ title: linkTitle1.trim(), url: linkUrl1.trim() }] : [{ title: "地方一网通办及官方保障服务入口", url: "https://www.gov.cn" }],
      scenarios: scenarios.trim() || `市民小李（化名），之前不知道能够线上免费申办此福利。阅读信息差指引后，自己线上直达国家认证窗口，足不出户便顺利办成了全部资质、省去了中介代办开销。`,
      risksAndWarmings: risksAndWarmings.trim() || "1. 必须绝对保证申请材料真实、合规，禁止弄虚作假。 2. 部分补助具有区域及限时限额，请申请前向有关官方热线咨询核定。",
      author: "独立贡献家",
      date: new Date().toISOString().split("T")[0],
      views: 120,
      stars: 8
    };

    onAddGap(newGap);
    setIsSuccess(true);
  };

  const handleGoToAtlas = () => {
    setIsSuccess(false);
    onNavigate("atlas");
  };

  return (
    <div className="pb-24 pt-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Title */}
      <div className="space-y-1 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 flex items-center justify-center md:justify-start gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">polyline</span>
          <span>共享世界信息差！加入贡献序列</span>
        </h1>
        <p className="text-sm text-text-muted">
          发现并共享您实际体验或自检成功的公共权益、福利资源、官方补贴、实用AI工具、免费职业体验及极简生活方式。
        </p>
      </div>

      {isSuccess ? (
        /* Success Dialog page */
        <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xs text-center max-w-xl mx-auto space-y-5 animate-scale-up">
          <div className="h-20 w-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <span className="material-symbols-outlined text-5xl">check_box</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-950">共享发布成功！</h2>
          <p className="text-xs md:text-sm text-text-muted leading-relaxed">
            感谢您！您贡献的高能信息差已汇入世界信息差图谱底层数据库中。系统已自动在极客板块进行了加盖公示，现在去“信息差图谱”中就能赫然筛选查看到它啦！
          </p>
          <div className="pt-2">
            <button
              onClick={handleGoToAtlas}
              className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-sm shadow-md shadow-primary/10 transition-all select-none cursor-pointer"
            >
              去图谱里检索我的项目 ⚡️
            </button>
          </div>
        </div>
      ) : (
        /* Form Dashboard */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6">
          <div className="p-4 rounded-2xl bg-primary/4 border border-primary/10 text-xs text-primary font-semibold flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>出于对公共利益和公信力的重视，请拒绝虚假、夸大或无凭据的投稿。所有上报条目应对应具体的官方信息公告或办事指南。</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Title */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-700 block">📝 信息差项目名称与代表地区</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="如：“某省高校毕业生首套住房补贴申办” 或 “免押金电子阅览证查文献”"
                required
                className="w-full text-xs font-semibold px-4 py-3 border border-gray-200 bg-gray-50/40 hover:bg-white focus:bg-white rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>

            {/* Category dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">📁 领域维度分类</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs font-bold px-3 py-2.5 border border-gray-200 bg-white rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              >
                <option value="welfare">权益福利 (官方生活补贴、免票或折扣特权...)</option>
                <option value="public_resource">公共资源 (全国数字图书馆、学术资源公共通道...)</option>
                <option value="city_opportunity">城市机会 (青年人才驿站免费借宿、过渡保障...)</option>
                <option value="policy_service">政策服务 (人事档案免费存放、一网通办指引...)</option>
                <option value="see_world">看世界 (低门槛探幽、国际 YHA 通卡优惠福利...)</option>
                <option value="go_abroad">出国方式 (校方全额短期访学交流、免伙食海外夏令营...)</option>
                <option value="competition">比赛项目 (低代码人文社创设计赛、文创创意投送赛...)</option>
                <option value="monetization">赚钱探索 (兼职对外翻译众包、技能远程分包协作...)</option>
                <option value="ai_tools">AI工具 (利用官方开发者 API 免费限额进行科研翻译...)</option>
                <option value="career">职业体验 (生态有机农场劳动体验、著名精品换宿交换...)</option>
                <option value="growth">能力成长 (失业保险技能再学习返款、官方线上培训大厅...)</option>
                <option value="lifestyle">生活方式 (闲置老屋空置房转让、低持营营建慢生活美学...)</option>
              </select>
            </div>

            {/* Region dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">🌐 代表落脚国家与地区大洲</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full text-xs font-bold px-3 py-2.5 border border-gray-200 bg-white rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              >
                <option value="全国/线上">全国/线上 (不受地域物理限值)</option>
                <option value="华东沿海">华东沿海 (如江浙沪皖高技术生态区...)</option>
                <option value="华南大湾区">华南大湾区 (如粤港澳特区青年双轨发展...)</option>
                <option value="西南西北">西南西北 (如云南大理、甘陕川原野生态体验...)</option>
                <option value="华北中部">华北中部 (如京津冀、华中沿长江名区...)</option>
                <option value="全球/海外">全球/海外 (如东亚日韩、新加坡、欧美及东南半岛...)</option>
              </select>
            </div>

            {/* Difficulty dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">⚙️ 操办与执行难度评定</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full text-xs font-bold px-3 py-2.5 border border-gray-200 bg-white rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              >
                <option value="low">简单 (材料极简，规费仅需数千人民币内，自办友好)</option>
                <option value="medium">中等 (需要攻读外语、投简历或一定抗压能力)</option>
                <option value="high">高难度 (需要极强的毅力或较坚实的专业背景技能)</option>
              </select>
            </div>

            {/* Recommendation Rating value */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">🌟 推荐评估分度 (1.0 - 5.0)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value) || 4.5)}
                required
                className="w-full text-xs font-bold px-4 py-2.5 border border-gray-200 bg-white rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>

            {/* Focus Tagline highlights */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-700 block">💡 一句话硬核亮点描述</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="如：“零学费，自带企业补贴，多渠道直达，告别不透明服务包揽陷阱。”"
                required
                className="w-full text-xs font-semibold px-4 py-3 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>

            {/* Basic Descriptive */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-700 block">📘 项目大盘背景介绍</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="详细科普该项目的宏观现状，例如本制度起源于何处、对哪些群体极为利好、该国官办基础机制是什么等..."
                rows={4}
                required
                className="w-full text-xs font-semibold p-4 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              ></textarea>
            </div>

            {/* The Information Gap core Truth */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-700 block">🔷 表盘对比：常人不知道的底层真相信息差</label>
              <textarea
                value={coreGap}
                onChange={(e) => setCoreGap(e.target.value)}
                placeholder="说出该信息差最爆棚的反差！例如：大多普通家庭被某中介索要10万元高额包办费，其实自己到领事馆预约仅需一千元印纸工本；或是德语是唯一硬门槛，企业根本只看语言面试..."
                rows={4}
                required
                className="w-full text-xs font-semibold p-4 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              ></textarea>
            </div>

            {/* Targeted demo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">👴 针对与适用人群</label>
              <input
                type="text"
                value={appliedTo}
                onChange={(e) => setAppliedTo(e.target.value)}
                placeholder="如：学历有限、零家底的刚毕工作青年群"
                required
                className="w-full text-xs font-semibold px-4 py-3 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>

            {/* Cost estimate */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">💰 总预算评估描述</label>
              <input
                type="text"
                value={costEstimation}
                onChange={(e) => setCostEstimation(e.target.value)}
                placeholder="如：前期工本公证费 1500w 人民币"
                required
                className="w-full text-xs font-semibold px-4 py-3 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>

            {/* Timeline */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">⌛️ 正常操作达成周期</label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="如：准备材料与审查在 3 个月到 9 个月内"
                required
                className="w-full text-xs font-semibold px-4 py-3 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>

            {/* Case scen */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">💬 素人还原场景案例（可模拟）</label>
              <input
                type="text"
                value={scenarios}
                onChange={(e) => setScenarios(e.target.value)}
                placeholder="如：小张（名号），毕业于三专，德语拼了半年后申请，目前已被录用..."
                required
                className="w-full text-xs font-semibold px-4 py-3 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>

            {/* Practical Steps dynamic input lists */}
            <div className="space-y-1.5 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700">📌 实操核心执行步骤 (动态添加列表)</label>
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="px-3.5 py-1.5 bg-primary/8 hover:bg-primary/15 text-primary text-[11px] font-extrabold rounded-lg flex items-center gap-1 select-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px] font-bold">add</span>
                  <span>添加一步新实操</span>
                </button>
              </div>

              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 animate-scale-up">
                    <span className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-cool-gray font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => handleStepChange(idx, e.target.value)}
                      placeholder={`请输入第 ${idx + 1} 步：如 注册官网、准备德语等详细说明。`}
                      required
                      className="w-full text-xs font-semibold px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-primary/45 text-text-main"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      disabled={steps.length === 1}
                      className="h-9 w-9 border border-red-100 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center shrink-0 disabled:opacity-50 select-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">📎 官方指引网址标题</label>
              <input
                type="text"
                value={linkTitle1}
                onChange={(e) => setLinkTitle1(e.target.value)}
                placeholder="如：“德国联邦雇工学徒注册中心”"
                className="w-full text-xs font-semibold px-4 py-3 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">🔗 官方指引核定网址 URL</label>
              <input
                type="text"
                value={linkUrl1}
                onChange={(e) => setLinkUrl1(e.target.value)}
                placeholder="如：“https://www.ausbildung.de”"
                className="w-full text-xs font-semibold px-4 py-3 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              />
            </div>

            {/* Risks */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-700 block">⚠️ 避坑、法律红线及硬核温馨提示</label>
              <textarea
                value={risksAndWarmings}
                onChange={(e) => setRisksAndWarmings(e.target.value)}
                placeholder="一针见血说出该项目的生存抗力，如：德语是铁律，零基础容易遭遇严重孤立；或是空闲房屋周边设施破漏严重，生活不便等红线..."
                rows={3}
                required
                className="w-full text-xs font-semibold p-4 border border-gray-200 rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 text-right">
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-sm shadow-md shadow-primary/10 transition-all cursor-pointer select-none"
            >
              提交共享 · 正式发布到真实图谱中
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
