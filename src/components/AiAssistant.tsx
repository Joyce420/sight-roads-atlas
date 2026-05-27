import React, { useState, useRef, useEffect } from "react";
import { InformationGap } from "../data";

interface Message {
  sender: "user" | "assistant";
  text: string;
  time: string;
}

interface AssistantMatch {
  gap: InformationGap;
  score: number;
}

interface AssistantResult {
  text: string;
  matchedIds: string[];
}

interface AiAssistantProps {
  gaps: InformationGap[];
  openSignal?: number;
  onSelectGap?: (id: string) => void;
}

const normalize = (text: string) => text.toLowerCase().trim();

const extractKeywords = (question: string, gaps: InformationGap[]) => {
  const baseWords = normalize(question)
    .split(/[\s,，。！？?;；:：、/\\|]+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 2);

  const categoryWords = gaps.flatMap((gap) => [gap.categoryLabel, gap.category, gap.region]);
  const shortChineseTokens = ["福利", "政策", "资源", "城市", "出国", "赚钱", "职业", "生活", "工具", "比赛", "申请", "费用", "年龄", "材料"];

  return Array.from(
    new Set([...baseWords, ...categoryWords, ...shortChineseTokens].filter((word) => question.includes(word)))
  ).slice(0, 8);
};

export const askAtlasAssistant = (question: string, gaps: InformationGap[]): AssistantResult => {
  const query = normalize(question);
  if (!query) {
    return {
      text: "你可以输入一个想了解的方向，例如：青年驿站、免费文献、AI工具、出国交流、城市补贴。",
      matchedIds: [],
    };
  }

  const matches: AssistantMatch[] = gaps
    .map((gap) => {
      const searchableText = normalize(
        [
          gap.title,
          gap.category,
          gap.categoryLabel,
          gap.tagline,
          gap.description,
          gap.appliedTo,
          gap.risksAndWarmings,
          gap.region,
        ].join(" ")
      );

      const terms = Array.from(new Set([
        query,
        ...query.split(/[\s,，。！？?;；:：、/\\|]+/).filter((term) => term.length >= 2),
      ]));

      const score = terms.reduce((total, term) => {
        if (!term) return total;
        if (gap.title.toLowerCase().includes(term)) return total + 5;
        if (gap.categoryLabel.toLowerCase().includes(term) || gap.category.toLowerCase().includes(term)) return total + 4;
        if (gap.tagline.toLowerCase().includes(term)) return total + 3;
        if (searchableText.includes(term)) return total + 1;
        return total;
      }, 0);

      return { gap, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  if (matches.length === 0) {
    return {
      text: "当前图谱中暂未找到高度相关内容，你可以换个关键词搜索，或等待后续数据扩展。",
      matchedIds: [],
    };
  }

  const directions = Array.from(new Set(matches.map((item) => item.gap.categoryLabel))).slice(0, 3);
  const nextKeywords = extractKeywords(question, gaps);

  return {
    matchedIds: matches.map((item) => item.gap.id),
    text: [
      "你可能想了解的方向",
      directions.map((direction) => `- ${direction}`).join("\n"),
      "",
      "推荐查看的信息卡片",
      matches.map((item) => `- ${item.gap.title}`).join("\n"),
      "",
      "下一步可以搜索的关键词",
      (nextKeywords.length > 0 ? nextKeywords : directions).map((keyword) => `- ${keyword}`).join("\n"),
    ].join("\n"),
  };
};

export const AiAssistant: React.FC<AiAssistantProps> = ({ gaps, openSignal = 0, onSelectGap }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "当前为 V0.1 本地搜索助手，暂未接入真实 AI。它会根据站内已有信息卡片，为你推荐相关方向。",
      time: "刚刚",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [lastMatchedIds, setLastMatchedIds] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openSignal > 0) setIsOpen(true);
  }, [openSignal]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickQuestions = [
    { label: "青年驿站", q: "青年人才驿站申请条件和费用" },
    { label: "免费文献", q: "公共图书馆免费文献资源" },
    { label: "AI工具", q: "AI工具官方来源和风险" },
    { label: "出国方式", q: "低成本出国交流项目" },
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const result = askAtlasAssistant(userText, gaps);
    setLastMatchedIds(result.matchedIds);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText.trim(), time: now },
      { sender: "assistant", text: result.text, time: now },
    ]);
    setInputVal("");
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center justify-between gap-2.5 px-4 py-3.5 rounded-full bg-primary text-white shadow-xl hover:bg-primary-container active:scale-95 transition-all outline-hidden tracking-wide font-extrabold"
          title="问问图谱助手"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[23px]">travel_explore</span>
            <span className="absolute -top-1.5 -right-1 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-primary"></span>
          </div>
          <span className="text-sm font-extrabold pr-1">问问图谱助手</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[420px] h-[550px] rounded-3xl border border-gray-100 shadow-2xl flex flex-col justify-between overflow-hidden animate-scale-up">
          <div className="px-5 py-4 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-white">travel_explore</span>
              </div>
              <div>
                <h3 className="text-sm font-extrabold tracking-wide">问问图谱助手</h3>
                <p className="text-[10px] text-primary-fixed/80 font-mono">V0.1 本地搜索助手</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all select-none"
              aria-label="关闭图谱助手"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 custom-scrollbar">
            {messages.map((item, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${
                  item.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                  item.sender === "user" ? "bg-primary text-white" : "bg-primary-fixed text-primary"
                }`}>
                  {item.sender === "user" ? "用户" : "助手"}
                </div>

                <div className="space-y-1">
                  <div
                    className={`p-3.5 rounded-2xl text-[12.5px] leading-relaxed shadow-xs whitespace-pre-line font-medium ${
                      item.sender === "user"
                        ? "bg-primary text-white rounded-tr-xs"
                        : "bg-white border border-gray-150 text-text-main rounded-tl-xs"
                    }`}
                  >
                    {item.text}
                  </div>
                  <p className="text-[9px] text-text-muted font-mono">{item.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {lastMatchedIds.length > 0 && onSelectGap && (
            <div className="px-3 pt-3 bg-white border-t border-gray-100 flex flex-wrap gap-2">
              {lastMatchedIds.slice(0, 3).map((id) => {
                const gap = gaps.find((item) => item.id === id);
                if (!gap) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onSelectGap(id);
                    }}
                    className="px-3 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10 text-[11px] font-bold hover:bg-primary hover:text-white transition-all max-w-full truncate"
                  >
                    {gap.title}
                  </button>
                );
              })}
            </div>
          )}

          <div className="p-3 bg-white border-t border-gray-100 flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar overflow-y-hidden">
            {quickQuestions.map((qq) => (
              <button
                key={qq.label}
                onClick={() => handleSend(qq.q)}
                className="px-3 py-1.5 bg-gray-100 ring-1 ring-gray-200 hover:ring-primary/20 text-gray-700 hover:text-primary rounded-full text-[11px] font-bold tracking-wide transition-all select-none whitespace-nowrap inline-block shrink-0 cursor-pointer text-ellipsis overflow-hidden"
              >
                {qq.label}
              </button>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend(inputVal);
              }}
              placeholder="搜索方向，如：青年驿站、免费文献、AI工具"
              className="flex-1 bg-gray-50 border border-gray-200 text-xs px-4 py-2.5 rounded-xl focus:outline-hidden focus:border-primary/50 text-text-main font-semibold"
            />

            <button
              type="button"
              onClick={() => handleSend(inputVal)}
              className="h-9 w-9 bg-primary hover:bg-primary-container text-white rounded-xl flex items-center justify-center transition-all select-none cursor-pointer"
              aria-label="发送问题"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
