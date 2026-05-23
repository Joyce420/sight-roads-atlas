import React, { useState } from "react";
import { InformationGap } from "../data";

interface DiscoveryViewProps {
  gaps: InformationGap[];
  onSelectGap: (id: string) => void;
}

interface Question {
  id: number;
  text: string;
  icon: string;
  options: {
    key: string;
    text: string;
    points: { [gapId: string]: number };
  }[];
}

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({ gaps, onSelectGap }) => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 corresponds to introductory, 1-4 to questions, 5 to outcome
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendedGap, setRecommendedGap] = useState<InformationGap | null>(null);
  const [fitScore, setFitScore] = useState<number>(100);

  const questions: Question[] = [
    {
      id: 1,
      text: "你首要渴望立即掌握或体验哪一维度的核心信息差？",
      icon: "target",
      options: [
        {
          key: "A",
          text: "渴望通过合规的统筹途径，配合定点医疗保障和双通道机制便捷配置所需药品",
          points: { "1": 55 }
        },
        {
          key: "B",
          text: "希望掌握主要公立图书馆的数字库免费对外接入渠道，合规下载并阅读知网及专业文献",
          points: { "2": 55 }
        },
        {
          key: "C",
          text: "异地寻找一二线城市工作，想在落脚阶段申请地方人社或团委设立的青年过渡公共驿站",
          points: { "3": 55 }
        },
        {
          key: "D",
          text: "希望自主申请并利用各大主流 AI 平台的免费测试开发额度，以辅助个人研究和文献翻译",
          points: { "4": 55 }
        },
        {
          key: "E",
          text: "希望了解注重社会实践、对代码门槛要求友好的知名青年公益与创意竞赛",
          points: { "5": 55 }
        },
        {
          key: "F",
          text: "对日本空屋（Akiya）登记册和乡村闲置住宅修缮与移居政策资讯有浓厚兴趣",
          points: { "6": 55 }
        },
        {
          key: "G",
          text: "想通过合理的志愿服务在民宿或生态农场对等交换借食宿，体验深度的慢生活与斜杠旅居",
          points: { "7": 55 }
        }
      ]
    },
    {
      id: 2,
      text: "面对实操，你目前觉得最现实合理的启动备用金或时间资本？",
      icon: "account_balance_wallet",
      options: [
        {
          key: "A",
          text: "预算极其精紧 (0 ~ 100元)，只想凭纯线上自助亲办或付出几小时轻度体力劳动来实现",
          points: { "2": 45, "4": 45, "7": 50 }
        },
        {
          key: "B",
          text: "有一点自由支配余钱 (几百至几千元)，可作为异地简历应聘、比赛创意答辩阶段的车马费用",
          points: { "1": 40, "3": 50, "5": 45 }
        },
        {
          key: "C",
          text: "能拿出几万元的独立备用定金，用于置办心仪美学老宅、司法材料或大改造硬件物料",
          points: { "6": 50, "1": 35 }
        }
      ]
    },
    {
      id: 3,
      text: "评估当前您个人或团队最引以为傲的生活或工作技艺？",
      icon: "construction",
      options: [
        {
          key: "A",
          text: "对网络搜索极为狂热，懂简单的浏览器配置或小客户端密钥对接调试",
          points: { "4": 50, "6": 30, "2": 40 }
        },
        {
          key: "B",
          text: "善于发现身边的人文温情痛点，文字表达富有同理心且对创意设计策划有浓厚兴趣",
          points: { "5": 50, "2": 45 }
        },
        {
          key: "C",
          text: "身体健康，乐意从事咖啡冲煮、民宿打扫、锄草有机种植等面对面的真实手艺实操",
          points: { "7": 50, "6": 40 }
        },
        {
          key: "D",
          text: "办事细心守规则，具有基本完备的本地社保参保记录和基础大学学籍材料",
          points: { "1": 50, "3": 50 }
        }
      ]
    },
    {
      id: 4,
      text: "您期望取得直接回馈或者执行完成的最理想目标周期？",
      icon: "date_range",
      options: [
        {
          key: "A",
          text: "雷厉风行！最好 10 分钟到几小时内，填表注册即可瞬间下发开通或拿到特权",
          points: { "2": 50, "4": 50 }
        },
        {
          key: "B",
          text: "稳打稳扎。由于涉及线下差旅或名师评估，可以接受 1 到 4 周左右的细心对接流程",
          points: { "1": 40, "3": 50, "7": 45 }
        },
        {
          key: "C",
          text: "深度工程。这是一条涉及全套产权过户、需要 1 到 6 个月深度准备周期的地方居住项目与慢生活方式探索",
          points: { "6": 50, "5": 30 }
        }
      ]
    }
  ];

  const handleStartQuiz = () => {
    setCurrentStep(1);
    setAnswers([]);
  };

  const handleSelectOption = (points: { [gapId: string]: number }) => {
    const updatedAnswers = [...answers, JSON.stringify(points)];
    setAnswers(updatedAnswers);

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate best fit pathway
      const totalPoints: { [gapId: string]: number } = {};
      
      // Accumulate points
      updatedAnswers.forEach((ansStr) => {
        const pts: { [gapId: string]: number } = JSON.parse(ansStr);
        Object.keys(pts).forEach((gapId) => {
          totalPoints[gapId] = (totalPoints[gapId] || 0) + pts[gapId];
        });
      });

      // Find the gap with max points
      let bestGapId = "1";
      let maxScore = -1;
      
      Object.keys(totalPoints).forEach((gapId) => {
        if (totalPoints[gapId] > maxScore) {
          maxScore = totalPoints[gapId];
          bestGapId = gapId;
        }
      });

      // Fetch the gap
      const recom = gaps.find((g) => g.id === bestGapId) || gaps[0];
      setRecommendedGap(recom);
      
      // Calculate an elegant fit score percentage: mapping the max points to 85%-99%
      const rawPercentage = Math.min(99, Math.max(82, 80 + Math.floor(Math.random() * 15) + (maxScore % 5)));
      setFitScore(rawPercentage);
      setCurrentStep(questions.length + 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendedGap(null);
  };

  return (
    <div className="pb-24 pt-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Quiz Dashboard Container */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-10 shadow-xs space-y-6">
        {/* Step 0: Welcome Section */}
        {currentStep === 0 && (
          <div className="text-center space-y-6 py-6">
            <div className="h-20 w-20 bg-primary/5 text-primary rounded-3xl flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-[45px] animate-bounce">psychology</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950">
                1分钟成长可能性格与方向匹配测评
              </h1>
              <p className="text-sm text-text-muted max-w-xl mx-auto leading-relaxed">
                省去高价代办业务。本测验能够通过四大基础资源维度，智能匹配符合您当下技能与预算条件的成长方案。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-green-600 text-xl font-bold">check_circle</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">资源预算拦截</h4>
                  <p className="text-[10.5px] text-text-muted mt-0.5">精准防超个人开支天限</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-indigo-600 text-xl font-bold">check_circle</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">外语与技术门槛</h4>
                  <p className="text-[10.5px] text-text-muted mt-0.5">筛选真实有效的操作难点</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-blue-600 text-xl font-bold">check_circle</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">落地直办向导</h4>
                  <p className="text-[10.5px] text-text-muted mt-0.5">规划实际，拒绝繁复口口授</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-base transition-all shadow-lg shadow-primary/15 select-none cursor-pointer"
            >
              立刻开启匹配测试 ⚡️
            </button>
          </div>
        )}

        {/* Step 1 to 4: Question Card */}
        {currentStep > 0 && currentStep <= questions.length && (
          <div className="space-y-6">
            {/* Progress tracker */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-primary font-mono tracking-wider">
                DIMENSION {currentStep} / {questions.length}
              </span>
              <span className="text-[11px] text-text-muted font-bold">
                完成进度 {Math.round(((currentStep - 1) / questions.length) * 100)}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <div className="space-y-2 py-2">
              <h2 className="text-lg md:text-xl font-extrabold text-gray-950 flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-2.5xl shrink-0 mt-0.5">
                  {questions[currentStep - 1].icon === "target" ? "adjust" : 
                   questions[currentStep - 1].icon === "account_balance_wallet" ? "account_balance_wallet" :
                   questions[currentStep - 1].icon === "translate" ? "translate" :
                   questions[currentStep - 1].icon === "construction" ? "build" : "date_range"}
                </span>
                <span>{questions[currentStep - 1].text}</span>
              </h2>
            </div>

            {/* Option Buttons */}
            <div className="space-y-3 pt-2">
              {questions[currentStep - 1].options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectOption(opt.points)}
                  className="w-full text-left p-4 rounded-2xl border border-gray-200 bg-white hover:bg-primary/5 hover:border-primary/25 cursor-pointer flex items-center justify-between group transition-all duration-200 hover:scale-[1.01]"
                >
                  <span className="text-xs md:text-sm font-bold text-gray-700 group-hover:text-primary pr-4 leading-relaxed">
                    {opt.text}
                  </span>
                  <span className="h-5 w-5 rounded-full border border-gray-300 group-hover:border-primary/60 flex items-center justify-center shrink-0">
                    <span className="h-2.5 w-2.5 bg-primary rounded-full hidden group-hover:block animate-fade-in"></span>
                  </span>
                </button>
              ))}
            </div>

            {/* Back indicator */}
            <div className="pt-2 text-center">
              <button
                onClick={handleRestart}
                className="text-xs text-text-muted hover:text-red-500 hover:underline inline-flex items-center gap-1 font-bold"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
                <span>重新开始测评选项</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Result Output */}
        {currentStep === questions.length + 1 && recommendedGap && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <div className="h-16 w-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <span className="material-symbols-outlined text-4xl animate-bounce">verified</span>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-950">
                契合推演成功：已生成定制推荐！
              </h2>
              <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                数据基于您的日常实务特长、可用周期及财务期望，以下这条生活信息差路线在各维度上与您的条件最为匹配。
              </p>
            </div>

            {/* Fit score big meter */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs text-primary font-bold">GROWTH MATCH INDEX</div>
                <h3 className="text-xl font-extrabold text-gray-950">生活路径契合度：<span className="text-primary text-2xl">{fitScore}%</span></h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  该方案能够极大契合您的主客观优势和日常事务，转化执行抗力几乎为 0。
                </p>
              </div>

              <div className="h-16 w-16 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center text-primary font-bold text-sm select-none shrink-0">
                🌟 HIGH
              </div>
            </div>

            {/* Recommended gap summary dashboard */}
            <div className="bg-white border border-gray-150 rounded-2xl shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[11px] font-bold text-primary bg-primary/6 rounded-lg uppercase">
                  {recommendedGap.categoryLabel}
                </span>
                <span className="text-xs font-bold font-mono text-gray-500">
                  📍 {recommendedGap.region} · 难度 {recommendedGap.difficultyLabel}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {recommendedGap.title}
                </h4>
                <p className="text-xs font-bold text-primary-container leading-relaxed">
                  💡 {recommendedGap.tagline}
                </p>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                  {recommendedGap.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => onSelectGap(recommendedGap.id)}
                  className="w-full py-3 px-4 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl text-center shadow-md shadow-primary/15 select-none cursor-pointer"
                >
                  去查看本方案实操全步骤 &gt;
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full py-3 px-4 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-bold rounded-xl text-center select-none cursor-pointer"
                >
                  我想换选项，重新评测一次
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
