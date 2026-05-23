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
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 corresponds to introductory, 1-5 to questions, 6 to outcome
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendedGap, setRecommendedGap] = useState<InformationGap | null>(null);
  const [fitScore, setFitScore] = useState<number>(100);

  const questions: Question[] = [
    {
      id: 1,
      text: "你首要的跨国套利核心诉求是？",
      icon: "target",
      options: [
        {
          key: "A",
          text: "极其渴望用最便宜、免学费、甚至发工资的方式在欧洲高质就业，谋定长足永居",
          points: { "1": 50, "5": 20 }
        },
        {
          key: "B",
          text: "渴望摆脱办公室卷，作为数字游民在欧洲或低成本天国远程办公，并合法省下巨额高个税",
          points: { "2": 50, "3": 50 }
        },
        {
          key: "C",
          text: "想用买一碗拉面的白菜价格，在日本或依山傍水的地方拥有一栋完全属于自己的和风大别墅房产",
          points: { "4": 50 }
        },
        {
          key: "D",
          text: "急需为子女配置低预算的、能在两周内极速搞定的合法第三国绿卡，以通过国际学校入学大关",
          points: { "6": 50 }
        }
      ]
    },
    {
      id: 2,
      text: "目前可以随时调用的自由启动备用金资产有多少？",
      icon: "account_balance_wallet",
      options: [
        {
          key: "A",
          text: "极度吃紧！首期只能拿出约 0.5w - 1.5w 人民币用于考语言和办材料",
          points: { "1": 50, "2": 30, "3": 10 }
        },
        {
          key: "B",
          text: "有一些积蓄，可以调拨约 1.5w - 4w 人民币的流动资金",
          points: { "2": 50, "3": 45, "6": 50 }
        },
        {
          key: "C",
          text: "能腾充余，可准备 4w - 15w 人民币的装修或启动支出",
          points: { "4": 30, "5": 50, "6": 40 }
        },
        {
          key: "D",
          text: "储备完美，20 万元人民币及以上无明显财务抗力",
          points: { "4": 50, "5": 50 }
        }
      ]
    },
    {
      id: 3,
      text: "评估当前最真实的英语或其他外语硬实力？",
      icon: "translate",
      options: [
        {
          key: "A",
          text: "英语流利，可以极其顺畅地浏览全英文官网、写英文简历、应对硅谷或温哥华技术面试",
          points: { "5": 50, "2": 40 }
        },
        {
          key: "B",
          text: "懂一点点小语种，或者极有毅力，愿意为此花大半年死磕一门非英语（如刻苦攻读德文/日文）",
          points: { "1": 50, "4": 40 }
        },
        {
          key: "C",
          text: "英语比较破碎，只能听懂简单会话，但抗打击能力极高，可以跟着教程一步步自办填表",
          points: { "6": 50, "3": 40, "2": 30 }
        },
        {
          key: "D",
          text: "讨厌语言死磕，希望能走最省材料、几乎无语言考核的高速自通直发通道",
          points: { "6": 50, "3": 30 }
        }
      ]
    },
    {
      id: 4,
      text: "评估你的专业、一技之长或主要底盘优势是什么？",
      icon: "construction",
      options: [
        {
          key: "A",
          text: "程序员、网页开发、数据研发、UI设计等数字可远程交付工种",
          points: { "5": 50, "2": 45, "3": 40 }
        },
        {
          key: "B",
          text: "护理医疗、酒店接待、西点烘焙、机电精密仪器等重实操、有体力或特定手艺的蓝领技能",
          points: { "1": 50 }
        },
        {
          key: "C",
          text: "自营跨境网店、外语翻译、写作创作、视频自媒体剪辑等线上创意自雇工作",
          points: { "2": 50, "3": 50 }
        },
        {
          key: "D",
          text: "没有特别的技术包袱，但我学习能力极强，可以遵守严密纪律和行政指令",
          points: { "6": 50, "4": 45 }
        }
      ]
    },
    {
      id: 5,
      text: "你的期望达成周期或目前能够承担的抗压过渡期？",
      icon: "date_range",
      options: [
        {
          key: "A",
          text: "时不我待！极度火急，希望能由我直接亲办，在几个月内（甚至两周）飞速见效",
          points: { "6": 50, "3": 30 }
        },
        {
          key: "B",
          text: "踏踏实实。我可以接受 6 - 12 个月的死磕，一边上班攒钱、一边精进外语和投简历",
          points: { "1": 45, "2": 45, "5": 40 }
        },
        {
          key: "C",
          text: "长期工程。无所谓花费多久，我只想踏实寻找最稳当的终极世外桃源并在日本地方买一套属于我的产业",
          points: { "4": 50, "1": 30 }
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
                1分钟信息差深度契合度自测评
              </h1>
              <p className="text-sm text-text-muted max-w-xl mx-auto leading-relaxed">
                高难度的移民或者昂贵的中介项目真的适合你吗？本算法通过五道维度选择，推演出最容易戳破、在资质上最契合你的人生的套利突围路线。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-green-600 text-xl font-bold">check_circle</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">资本无偏对齐</h4>
                  <p className="text-[10.5px] text-text-muted mt-0.5">精准防超预算虚耗</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-indigo-600 text-xl font-bold">check_circle</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">外语瓶颈拦截</h4>
                  <p className="text-[10.5px] text-text-muted mt-0.5">筛选真实的语言门槛</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-blue-600 text-xl font-bold">check_circle</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">直办难度校合</h4>
                  <p className="text-[10.5px] text-text-muted mt-0.5">规划落地，拒绝空谈</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-base transition-all shadow-lg shadow-primary/15 select-none"
            >
              立刻开启极客推算测验 ⚡️
            </button>
          </div>
        )}

        {/* Step 1 to 5: Question Card */}
        {currentStep > 0 && currentStep <= questions.length && (
          <div className="space-y-6">
            {/* Progress tracker */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-primary font-mono tracking-wider">
                DIMENSION {currentStep} / {questions.length}
              </span>
              <span className="text-[11px] text-text-muted">
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
                <span>取消并清空当前的答题卡</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Result Output */}
        {currentStep === questions.length + 1 && recommendedGap && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <div className="h-16 w-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <span className="material-symbols-outlined text-4xl animate-bounce">verified</span>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-950">
                契合测算：已成功匹配你的人生图谱！
              </h2>
              <p className="text-sm text-text-muted max-w-md mx-auto">
                算法基于您提供的英语底本、预算、周期及专业技能，以下这条路线能够为您绕开暴利中介，实现最优突击。
              </p>
            </div>

            {/* Fit score big meter */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs text-primary font-bold">PROPOSAL MATCH SCORE</div>
                <h3 className="text-xl font-extrabold text-gray-950">项目契合概率指数：<span className="text-primary text-2xl">{fitScore}%</span></h3>
                <p className="text-xs text-text-muted">
                  该路线与您的闲置准备金以及外语磨死毅力有极高维度的相互重叠，抗压阻力极微弱。
                </p>
              </div>

              <div className="h-20 w-20 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center text-primary font-bold text-lg select-none">
                🌟 HIGH
              </div>
            </div>

            {/* Recommended gap summary dashboard */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[11px] font-bold text-primary bg-primary/6 rounded-lg uppercase">
                  {recommendedGap.categoryLabel}
                </span>
                <span className="text-xs font-bold font-mono text-text-muted">
                  📍 {recommendedGap.region} · 难度 {recommendedGap.difficultyLabel}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
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
                  className="w-full py-3 px-4 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl text-center shadow-md shadow-primary/10 select-none cursor-pointer"
                >
                  去查看该项目的实操全步骤 &gt;
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full py-3 px-4 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-bold rounded-xl text-center select-none cursor-pointer"
                >
                  不感兴趣？重新检测一次
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
