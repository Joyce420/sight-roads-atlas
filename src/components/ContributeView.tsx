import React, { useState } from "react";
import { InformationGap } from "../data";

interface ContributeViewProps {
  onAddGap: (newGap: InformationGap) => void;
  onNavigate: (view: string) => void;
}

export const ContributeView: React.FC<ContributeViewProps> = ({ onAddGap, onNavigate }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<any>("study_work");
  const [region, setRegion] = useState("欧洲");
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
    "准备前期材料、进行背景核准及语言死死磕",
    "选择意向企业/机构进行简历直投对决"
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
      alert("信息差亮点需要至少包含 8 个字以保持硬核度。");
      return;
    }

    // Format categoryLabel
    const catLabelMap: { [key: string]: string } = {
      study_work: "留学就业",
      digital_nomad: "数字游民",
      tax_arbitrage: "低税资产",
      niche_property: "小众置业",
      identity_visa: "规划身份",
      lifestyle_travel: "生活旅行"
    };

    const diffLabelMap: { [key: string]: string } = {
      low: "简单",
      medium: "中等",
      high: "高难度"
    };

    // Filter out empty steps
    const filteredSteps = steps.filter(s => s.trim() !== "");
    if (filteredSteps.length === 0) {
      filteredSteps.push("按照官方移民局或役所官网要求提交全套公证材料。");
    }

    const newGap: InformationGap = {
      id: `custom_${Date.now()}`,
      title: title.trim(),
      category,
      categoryLabel: catLabelMap[category] || "留学就业",
      region,
      difficulty,
      difficultyLabel: diffLabelMap[difficulty] || "简单",
      rating,
      tagline: tagline.trim(),
      description: description.trim() || `${title}的全套信息差自办通关方案。`,
      coreGap: coreGap.trim() || "传统常人由于对底层法令的不了解，过度依赖非法雇主或中介包打听买卖，蒙受大额资金损失。自办全材料仅需数千官币规费即可直发无盖。",
      appliedTo: appliedTo.trim() || "追求精细化开销、具有极高执行力的青年极客群。",
      costEstimation: costEstimation.trim() || "前期规费约 1.5 万元左右",
      timeline: timeline.trim() || "准备与审批共需 6 个月左右",
      practicalSteps: filteredSteps,
      relatedLinks: linkTitle1.trim() && linkUrl1.trim() ? [{ title: linkTitle1.trim(), url: linkUrl1.trim() }] : [{ title: "该项目官方合规公示入口", url: "https://google.com" }],
      scenarios: scenarios.trim() || `素人李某（化名），之前由于信息偏差被某些中介索要高额巨款。后来根据官方指引一步步筹备材料，最终在完全没有找中介的情况下通过了审核、省下了近10万的智商溢价。`,
      risksAndWarmings: risksAndWarmings.trim() || "1. 必须完全以真实无误的材料原件递交。 2. 注意跟进官方规则的政策窗口，避免遭遇停摆。",
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
          发现并写下您亲自踏勘成功的跨境套利、带薪留学、离岸资产或捷径自办指南。抹平信息黑洞。
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
            <span>由于本图谱极度推崇硬核真实性，请拒绝虚假、夸大或没有真凭实据的内容上报。所有的步骤须包含官网或具体的官方行文逻辑支撑。</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Title */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-700 block">📝 信息差项目名称与国家/地区</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="如：“德国双元制职业学徒申请” 或 “格鲁吉亚小微企业0税实操”"
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
                <option value="study_work">留学就业 (Ausbildung/工作签...)</option>
                <option value="digital_nomad">数字游民 (跨境公司/DNV居留...)</option>
                <option value="tax_arbitrage">低税资产 (微型企业1%所得税...)</option>
                <option value="niche_property">小众置业 (日本空屋/白菜价地...)</option>
                <option value="identity_visa">规划身份 (捷径绿卡、自办身份...)</option>
                <option value="lifestyle_travel">生活旅行 (免签白卡、极低环游...)</option>
              </select>
            </div>

            {/* Region dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">🌐 代表国家和地区大洲</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full text-xs font-bold px-3 py-2.5 border border-gray-200 bg-white rounded-xl focus:outline-hidden focus:border-primary/50 text-gray-800"
              >
                <option value="欧洲">欧洲 (如德/英/法/爱沙尼亚/欧盟...)</option>
                <option value="北美">北美 (如加/美/墨西哥...)</option>
                <option value="亚洲">亚洲 (如日/韩/新加坡/泰国...)</option>
                <option value="中东/中亚">中东/中亚 (如格鲁吉亚/迪拜...)</option>
                <option value="大洋洲">大洋洲 (如新西兰/澳洲/瓦努阿图...)</option>
                <option value="拉丁美洲">拉丁美洲 (如巴西/阿根廷...)</option>
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
                placeholder="如：“零学费，自带大企业薪水，3年直达永居，告别黑中介包揽陷阱。”"
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
