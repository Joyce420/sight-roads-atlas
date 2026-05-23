import React, { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "ai";
  text: string;
  time: string;
}

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "您好！我是『看见更多路』世界信息差图谱的智能辅助助理。我可以帮您快速整理关于国家及地方医保大病双通道、公立网络学术文献免费免押获取、一二线城市青年人才驿站免费短期借宿福利、AI生产力提效、全国青年公益与创意竞赛以及生态义工换宿旅行的信息差。您想了解以上哪一方面，从而探索更广阔、更多样生命道路的底牌选项？",
      time: "刚刚"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest comment/message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const quickQuestions = [
    { label: "学术文献如何合规免费查阅？", q: "如何不用学校账号，完全合规、免费地查阅并下载知网与万方学术论文？" },
    { label: "应届毕业生免费短期住宿？", q: "异地找工作，一二线城市如何申请 7 至 15 天的政府免费青年人才驿站？" },
    { label: "AI工具如何获取开发者额度？", q: "如何合规申请主流的大模型 API 密钥免费测试限额，并辅助高质翻译文献？" },
    { label: "义工换宿和慢生活怎么玩？", q: "斜杠或空窗期，如何通过每天几小时的轻劳动对等兑换各地民宿与农场食宿？" }
  ];

  const getAiResponse = (userQ: string): string => {
    const q = userQ.toLowerCase();
    
    if (q.includes("知网") || q.includes("学术") || q.includes("文献") || q.includes("论文") || q.includes("图书馆") || q.includes("免费下载")) {
      return `【图谱解答 · 智能学术公共资源】\n\n您看中的正是 **“公立图书馆数字资源共享网络”**。这也是面向公众免费开放、通过国家公共财政保障的文献查阅途径：\n\n1. **全国大型公立图书馆已为您代付学术平台使用费**：国内众多省市级大型图书馆每年均拨付专项大额经费，采购知网（CNKI）、万方、维普和超星数字化图书等学术数据库的公共接入权限。\n2. **完全零门槛线上办理**：全国居民不论身处何地，大部分均可线上免费实名注册这些图书馆的虚拟读者卡，获取对应的数字账号。\n3. **合规直连、省电下载**：使用电子借阅卡登录图书馆的官网，并在其数字资源板块直接点入学术入口，即可享有每天的免费额度，无需另购共享账户，符合合规合理使用，即可免费查阅并下载所需论文，让科研、写手求学无压力！`;
    }
    
    if (q.includes("住宿") || q.includes("驿站") || q.includes("应届") || q.includes("找工作") || q.includes("宿舍") || q.includes("落脚")) {
      return `【图谱解答 · 城市机会人才驿站】\n\n对于刚从学校走出的学生或毕业生，异地应聘、线下面试时的短期租宿与房租押金，往往是个不折不扣的起步压力。官方已提供政策性住宿扶助计划：\n\n1. **地方团市委与人社部门开设有保障安全的“青年人才驿站”**：深圳、成都、上海区级、杭州等国内几十个城市，均设立了设施全备的免费青年人才驿站客栈。\n2. **提供短期借宿和托底过渡期**：通常单次可享受 3 至 15 天不等的免住宿费住宿、附设空调、无线网、卫生用品，环境安全，管理正规。\n3. **申请材料朴素求真**：凡具备大中专学历及应届毕业生资格，附带在该城市的求职简历投递记录、或者用人单位开给您的复试短信，即可通过官方小程序自行申请办理。驿站还经常有免费的名业内推等公益帮扶，能极佳地缓解毕业前的临时住房焦虑。`;
    }

    if (q.includes("ai") || q.includes("模型") || q.includes("翻译") || q.includes("密钥") || q.includes("额度") || q.includes("工具")) {
      return `【图谱解答 · 智能 AI 效率工具】\n\n想要在学术翻译、文档润色、自媒体编写上高效提速，如何绕过层层多余收费的转发镜像网站？\n\n【官方渠道提供的开发者额度方案】\n1. **大厂原生免费测试额度**：各大平台通常在开发者后台（如 Google AI Studio）向个人研发者及普通大众提供非商用的免费测试 API 额度，供学习与科研调试使用，免收申请费。\n2. **直接对接本地效率客户端**：只需在官方界面点击生成一个唯一的 API Key（密钥），将其复制填入主流的完全免费开源工具（如 Cherry Studio、Immersive Translate 沉浸式翻译插件或 Zotero 翻译插件），便能让整个浏览器、或者是个人科研文献一键对照翻译运行，免去第三方抽水和中间代办费用。\n3. **零代码部署自主测试终端**：可以配合开源社区现成的纯前端聊天界面模板，填入您個人的 Key，即可拥有一套适合您个人的纯净提效终端，稳定高效。`;
    }

    if (q.includes("宿") || q.includes("农场") || q.includes("换宿") || q.includes("义工") || q.includes("大理") || q.includes("旅居") || q.includes("体验")) {
      return `【图谱解答 · 绿色生态与自愿换宿体验】\n\n若您目前正值面临学期过渡、求职修整、或有心在空档期（Gap Year）体验全新生存视角以缓解焦虑，由 WWOOF 或 YHA 等知名国际绿色组织联合倡导的自愿义工换宿是极具厚度的选择：\n\n1. **基于互惠平等的绿色公益组织**：来自世界各省市与著名美学田园景区（大理、丽水、松阳、清迈等）的大量特色有机农场、手作工艺坊、艺术营馆和精品民宿，长期常态化接收互惠义工。\n2. **生活开销对等互换**：义工不需要交任何报名钱，每天只需要在农田志愿打理、前台接待、协助摄影或者冲煮热饮，平均每日付出合理工时（通常4至5小时），便可自愿对等交换健康的丰盛家常三餐和干净的床位住宿，具体由宿主按合规规则核验落实。\n3. **拓展见识并为职业生涯充电**：在完全免除异地高昂房租的情况下，您既能学习到诸如面包发酵、民宿运营、园艺管护、设计美学等专业技能，还更易结识同频的高校青年、甚至资深大厂离职的设计师跟工程师，碰撞出自主创业和自由开发的合作花火。`;
    }

    return `【图谱解答 · 世界信息差小助手】\n\n通过掌握具有温度的公共、福利、教育及智能提效等资源指南，每位求学者都能以极低的成本，探索和实践更广阔的生命途径，省去不必要的中介或代办开支：\n\n1. 重学求学提效：建议参阅并了解 **【公共资源 知网免费自办】** 或 **【AI工具 API密钥获取】**，让信息工具化繁为简。\n2. 舒缓求职异地住宿压力：通过当地官方小程序合规审办该区域的 **【一二线城市青年人才驿站】** 免费绿色住宿卡，度过起跑线过渡期。\n3. 探索广阔生活形态：可去了解 **【对等换宿生态农场研学】** 和 **【日本乡村 Akiya 计划房屋置产置业移居资讯】** 中游览一番！\n\n建议您首先点击参与我们主页上面的 **【1分钟可能性和偏好事前测验】** 进行模拟匹配！`;
  };

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    // Append user message
    const updatedMessages = [
      ...messages,
      {
        sender: "user" as const,
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ];

    setMessages(updatedMessages);
    setInputVal("");
    setIsTyping(true);

    // Simulate reactive AI typing decay
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        ...updatedMessages,
        {
          sender: "ai" as const,
          text: getAiResponse(userText),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50">
      {/* Minimized Pill ball */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center justify-between gap-2.5 px-4 py-3.5 rounded-full bg-primary text-white shadow-xl hover:bg-primary-container active:scale-95 transition-all outline-hidden tracking-wide font-extrabold"
          title="问问 AI 信息差"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[23px] animate-spin">compass_calibration</span>
            <span className="absolute -top-1.5 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-primary animate-ping"></span>
          </div>
          <span className="text-sm font-extrabold pr-1">问问智能图谱 AI</span>
        </button>
      )}

      {/* Maximized interactive window dashboard */}
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[420px] h-[550px] rounded-3xl border border-gray-100 shadow-2xl flex flex-col justify-between overflow-hidden animate-scale-up">
          {/* Header */}
          <div className="px-5 py-4 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-white animate-pulse">compass_calibration</span>
              </div>
              <div>
                <h3 className="text-sm font-extrabold tracking-wide">信息图谱智能向导</h3>
                <p className="text-[10px] text-primary-fixed/80 font-mono">Sight roads · Helpful Expert</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all select-none"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages scroll zone */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 custom-scrollbar">
            {messages.map((item, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${
                  item.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Simulated Avatars */}
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                  item.sender === "user" ? "bg-primary text-white" : "bg-primary-fixed text-primary"
                }`}>
                  {item.sender === "user" ? "用户" : "AI"}
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

            {/* Simulated typing status */}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="h-8 w-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0 font-bold text-xs">
                  AI
                </div>
                <div className="bg-white border border-gray-150 p-3.5 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-1">
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick recommendations question buttons board */}
          <div className="p-3 bg-white border-t border-gray-100 flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar overflow-y-hidden">
            {quickQuestions.map((qq, i) => (
              <button
                key={i}
                onClick={() => handleSend(qq.q)}
                className="px-3 py-1.5 bg-gray-100 ring-1 ring-gray-200 hover:ring-primary/20 text-gray-700 hover:text-primary rounded-full text-[11px] font-bold tracking-wide transition-all select-none whitespace-nowrap inline-block shrink-0 cursor-pointer text-ellipsis overflow-hidden"
              >
                {qq.label}
              </button>
            ))}
          </div>

          {/* Message inputs form bar */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend(inputVal);
              }}
              placeholder="对图谱有何疑问？如『青年人才驿站』..."
              className="flex-1 bg-gray-50 border border-gray-200 text-xs px-4 py-2.5 rounded-xl focus:outline-hidden focus:border-primary/50 text-text-main font-semibold"
            />
            
            <button
              onClick={() => handleSend(inputVal)}
              className="h-9 w-9 bg-primary hover:bg-primary-container text-white rounded-xl flex items-center justify-center transition-all select-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
