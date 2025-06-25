import { useRequireLogin } from "@/hooks/useRequireLogin";
import React, { useEffect, useRef, useState } from "react";
import A4Layout from "@/components/layouts/A4-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import PageSeparator from "@/components/page-separator";
import CoverPage_00 from "@/components/report/00-report-cover";
import ContentsPage_01 from "@/components/report/01-contents";
import OverviewPage_02 from "@/components/report/02-overview";
import SwotPage_03 from "@/components/report/03-swot";
import SelfProductPage_04 from "@/components/report/04-my-product";
//import SelfProductPage_04_2 from "@/components/report/04-my-product2";
import CompetitorPage_05 from "@/components/report/05-competitor";
import ComparisonPage_06 from "@/components/report/06-comparison";
import ImprovementPage_07 from "@/components/report/07-improve";
import ExpectationGapPage_08 from "@/components/report/08-expectation";
import SolutionPage_09 from "@/components/report/09-solution";
import ExecutionPlanPage_10 from "@/components/report/10-execution-plan";
import ExecutionKPIPage_11 from "@/components/report/11-execution-kpi";
import ConclusionPage_12 from "@/components/report/12-conclusion";
import ExecutiveSummaryPage_13 from "@/components/report/13-executive-summary";

import type { ChunkType } from "@/components/streaming_prompt_container";
import { useAIData } from "@/contexts/AiResponseContext";

const chunkPageComponents: [ChunkType, React.ComponentType<any>][] = [
  ["coverPage", CoverPage_00],
  ["contentsPage", ContentsPage_01],
  ["overviewPage", OverviewPage_02],
  ["swotPage", SwotPage_03],
  ["selfProductPage", SelfProductPage_04],
  //  ["selfProductPage_2", SelfProductPage_04_2],
  ["competitorPage", CompetitorPage_05],
  ["comparisonPage", ComparisonPage_06],
  ["improvementPage", ImprovementPage_07],
  ["expectationGapPage", ExpectationGapPage_08],
  ["solutionPage", SolutionPage_09],
  ["executionPlanPage", ExecutionPlanPage_10],
  ["executionKPIPage", ExecutionKPIPage_11],
  ["conclusionPage", ConclusionPage_12],
  ["executiveSummaryPage", ExecutiveSummaryPage_13],
];

export default function ReportPage() {
  useRequireLogin();
  const sectionRefs = useRef<Record<ChunkType, HTMLDivElement | null>>({
    coverPage: null,
    contentsPage: null,
    overviewPage: null,
    swotPage: null,
    selfProductPage: null,
    //    selfProductPage_2: null,
    competitorPage: null,
    comparisonPage: null,
    improvementPage: null,
    expectationGapPage: null,
    solutionPage: null,
    executionPlanPage: null,
    executionKPIPage: null,
    conclusionPage: null,
    executiveSummaryPage: null,
  });
  const { state, currentlyWorkingPage } = useAIData();

  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
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
          product1: "1",
          product2: "2",
        }),
      });
      const data = await res.json();
      const aiMessage = { role: "ai", content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "에러가 발생했습니다." },
      ]);
    }
  };

  return (
    <main className="flex" style={{ height: "calc(100vh - 70px)" }}>
      {/* 좌측 A4 리포트 영역 */}

      <div
        id="pdf-content"
        className="space-y-4 bg-gray-100 overflow-auto flex-1"
      >
        {chunkPageComponents.map(([chunkType, PageComponent], index) => (
          <React.Fragment key={chunkType}>
            <A4Layout
              ref={(el) => {
                sectionRefs.current[chunkType] = el;
              }}
              chunkType={chunkType}
            >
              <PageComponent
                {...state[chunkType]}
                isCurrentWorkingPage={currentlyWorkingPage === chunkType}
              />
            </A4Layout>
            {index < chunkPageComponents.length - 1 && <PageSeparator />}
          </React.Fragment>
        ))}
      </div>

      {/* 우측 챗봇 */}
      <section className="w-1/3 flex flex-col border-l bg-white mt-10">
        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-6">
          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={i}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
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
                      ${
                        isUser
                          ? "bg-blue-500 text-white self-end"
                          : "bg-white text-gray-900 border border-gray-200 self-start"
                      }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}
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
              placeholder="노이즈캔슬링에 대한 리뷰 몇개만 보여줘"
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
