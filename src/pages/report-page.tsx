import { useRequireLogin } from "@/hooks/useRequireLogin";
import { useEffect, useRef, useState } from "react";
import A4Layout from "@/components/layouts/A4-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function ReportPage() {
  useRequireLogin();

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 스크롤 항상 최신 메시지로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/api/chatbot/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          product1: "3",
          product2: "4",
        }),
      });
      const data = await res.json();
      const aiMessage = { role: "ai", content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "ai", content: "에러가 발생했습니다." }]);
    }
  };

  //return <div className="bg-slate-50 p-2 min-h-[calc(100vh-4rem)]"></div>;
  return (
    <main className="flex h-screen">
      {/* 좌측 A4 리포트 영역 */}
      <section className="w-1/2 h-screen overflow-y-auto bg-gray-100 p-4">
        <A4Layout>
          {/* 리포트 내용 */}
        </A4Layout>
      </section>

      {/* 우측 챗봇 */}
      <section className="w-1/2 h-screen flex flex-col border-l bg-white mt-10">
        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-6">
          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div className="flex flex-col items-start max-w-[70%]">
                  {/* 🤖 AI 꼬리 태그 */}
                  {!isUser && (
                    <div className="mb-1 bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full shadow-sm">
                      🤖 AI
                    </div>
                  )}
                  {/* 말풍선 */}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-line break-words shadow-sm
                      ${isUser
                        ? "bg-blue-500 text-white self-end"
                        : "bg-white text-gray-900 border border-gray-200 self-start"
                      }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            );})}
          <div ref={messagesEndRef} />
        </div>
          
        {/* 입력창 */}
        <div className="border-t pt-4 pb-4 px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요"
              className="flex-1 rounded-full bg-gray-100 border border-gray-300 px-4 py-2"
            />
            <Button type="submit" className="rounded-full px-6">
              전송
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
