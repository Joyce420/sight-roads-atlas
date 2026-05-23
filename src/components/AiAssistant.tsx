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
      text: "您好！我是『看见更多路』全球信息套利AI领航小秘书。我可以帮您极速精准研判全球带薪免学徒留学、离岸1%企业税筹、日本白菜价空房置办，以及规避十万元暴利中介防坑指南。您目前持有几万流动资金，最想打破哪方面的信息垄断？",
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
    { label: "如何零资金肉身移居欧洲？", q: "如何零资金、靠发工资的形式去欧洲合法工作生活并快拿绿卡？" },
    { label: "远程自雇1%微税底牌？", q: "数字游民有哪些年营业额十几万美元、税率只有0%-1%的开户自雇方案？" },
    { label: "防十万中介黑箱绿卡坑？", q: "如何自办几千块工本的瓦国/墨西哥绿卡？中介要八万坑在哪？" }
  ];

  const getAiResponse = (userQ: string): string => {
    const q = userQ.toLowerCase();
    
    if (q.includes("零资金") || q.includes("发工资") || q.includes("欧洲") || q.includes("德") || q.includes("双元制") || q.includes("留")) {
      return `【AI 精算结论 · 带薪突围欧洲航线】\n\n您看中的正是大名鼎鼎的 **德国“双元制” (Ausbildung)**。该路线最大的信息死角是：国人盲目以为留欧必须有雅司高分和百万银行担保。\n\n实际上，双元制的底层政策极度朴素：\n1. 免除全部职业学校学费；\n2. 德国大厂或协作企业每月直接给学生划发 **1000 - 1400 欧元的带薪学徒津贴**，完全可覆盖您的吃住生活开销；\n3. 毕业100%兜底劳动合同。毕业起薪通常在税前 2800-3800 欧。\n\n【唯一的铁门槛】：将德语死磕扎实到 B1 或 B2 等级，直接通过 Ausbildung.de 无中介直投，无需支付中介任何一分黑箱套利费。这是极少数大专与技术青年实现白手连通欧洲的黄金方案！`;
    }
    
    if (q.includes("税") || q.includes("数字游民") || q.includes("离岸") || q.includes("自雇") || q.includes("格鲁吉亚") || q.includes("爱沙尼亚")) {
      return `【AI 离岸财富精算 · 游民低税走廊】\n\n对于远程全栈开发者、外包接单团队及 Shopify 跨境电商，最恐怖的损耗是 **20%-45%阶梯个税和跨境结汇重重盘查**。目前业内老手普遍采用以下两个黄金模型自办节税：\n\n1. **格鲁吉亚小微自雇 (Small Business)**：只要您年营业额在大约 18 万美元（50万拉里）以下，且属于自雇非受限行业，在首都司法大厅仅需一张护照+百元开户规费，所得税率直接暴减至 **微不足道的 1%**！甚至部分微型自营还是 **0%**！\n2. **爱沙尼亚 e-Residency 盾卡**：120欧开户在华领事馆录指纹取卡，可在各大游民胜地（巴厘岛、巴塞罗那等）在线打理合规的欧盟有限公司，实行**未分配利润0%企业税**，无缝对接国际 Wise 银行和 Stripe 结算，直接降降降！`;
    }

    if (q.includes("绿卡") || q.includes("中介") || q.includes("自办") || q.includes("瓦努阿图") || q.includes("墨西哥") || q.includes("跳板")) {
      return `【AI 身份避坑公示 · 廉价直自发跳板】\n\n您问到了暴利中介最怕被挑明的死角：**“瓦努阿图绿卡” or “墨西哥居留”**。\n\n大批涉外机构专门诱骗为了孩子入国际学校在沪深奔走的家长，喊出 **8w 至 12万人民币** 的高昂全套代办费。\n\n但大盘核算的真相是：**瓦国永久居留卡（小白卡）其政府直接官办规费只需要千元左右！**\n\n【如何零中介自封直办】：\n只要亲自备妥国内公证处盖章的“无犯罪记录证明”和银行能打印出的“十万活期理财存款信”，直接带着全套原件邮寄致电给瓦努阿图驻香港总领事馆的公署柜台并按白纸黑字缴纳政府官印规费。领馆处理极速，甚至在 **24 小时当场即可给你制出正本钢印绿卡及领事长确认蓝信**。坚决不接受任何非法加层！`;
    }

    if (q.includes("房") || q.includes("日本") || q.includes("空家") || q.includes("免费") || q.includes("民宿")) {
      return `【AI 置业盘算 · 日本空闲老宅避坑】\n\n网上常有“外国人在日本买乡村超大独栋老修补屋（Akiya）只要几块钱”的夸张报道。这的确是真的，日本少子高龄社会导致大量继承人倒贴转让房产。\n\n但是你一定要预防三大高能隐性黑洞：\n1. **给排水及下水净化槽改造费**：许多老空屋处于乡镇山谷，没有连接现代市政排污管，自行安装合并净化槽的人工施工费可高达 **3万 - 5万人民币**。\n2. **固定资产清算持有税**：虽然房子本身 0 日元，但是每年固都税和清理杂税需要长期向当地役所续缴。\n3. **融入壁垒**：乡村自治社会极为看重邻里除草、扫积雪等社区义务，对不精通日语的外籍人社交极度敏感。\n\n【AI 建议】：如果想开启，务必通过各县官网合规核准的 “Akiya Bank” 直联役所职员，并自学日语到基本日常沟通线，再去实地考察。`;
    }

    return `【AI 领航精算 · 打破规则阶层认知】\n\n世界上只有 1% 的高阶精算玩家，在一边享受高合规的国际套利。因为 **“规则并非不可打破，而是需要看透其底部的运行原理”**。\n\n根据大数据，由于信息壁垒的存在，普通人往往一头扎入黑中介包装的昂贵非法路径中，最后两头落空。其实：\n1. 如果预算只有 2 万：主攻 **德语+德国双元制职业学徒**，零开支带薪登陆欧洲、全家在手艺中立存。\n2. 如果您是远程 IT 开发者：死磕海外英文，直攻 **加拿大 BC Tech PNP 直通车**，或是办一个 **格鲁吉亚 1% 税率自雇号**。\n3. 如果需要身份跳板：带着无犯罪和理财单，直奔官办公署办理 **瓦国/墨国自办直通**，省下昂贵中介溢价。\n\n建议您首先前往本平台的 **【兴趣发现测验】**，输入您持有的能动资金，我们将智能给您匹配出最具操作空间的全球路径！`;
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
          <span className="text-sm font-extrabold pr-1">问问智能自办 AI</span>
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
                <h3 className="text-sm font-extrabold tracking-wide">AI 领航大盘研判长</h3>
                <p className="text-[10px] text-primary-fixed/80 font-mono">Sight roads · Agentive Expert</p>
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
          <div className="p-3 bg-white border-t border-gray-100 flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar">
            {quickQuestions.map((qq, i) => (
              <button
                key={i}
                onClick={() => handleSend(qq.q)}
                className="px-3 py-1.5 bg-gray-100 ring-1 ring-gray-200 hover:ring-primary/20 text-gray-700 hover:text-primary rounded-full text-[11px] font-bold tracking-wide transition-all select-none whitespace-nowrap inline-block shrink-0 cursor-pointer"
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
              placeholder="请输入任何你想打破的行业自办自策提问..."
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
