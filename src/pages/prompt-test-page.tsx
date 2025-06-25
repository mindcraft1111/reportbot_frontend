import { useLocation, useParams } from "react-router";
import PromptSidebar from "@/components/prompt-sidebar";
import StreamingPromptContainer from "@/components/streaming_prompt_container";
import A4Layout from "@/components/layouts/A4-layout";
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
import { useAIData } from "../contexts/AiResponseContext";
import type { ChunkType } from "@/components/streaming_prompt_container";
import { useRequireLogin } from "@/hooks/useRequireLogin";
import { useEffect, useRef } from "react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api/client";

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

export default function PromptTestPage2() {
  const { project_id } = useParams<{
    project_id: string;
  }>();

  useRequireLogin();
  const { data: projectList, isLoading } = useQuery({
    queryKey: ["projectList"],
    queryFn: () => apiClient.getProjectList(),
    refetchOnWindowFocus: false,
  });

  const location = useLocation();
  const { state, currentFocusPage, currentlyWorkingPage } = useAIData();
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

  useEffect(() => {
    if (currentFocusPage) {
      const target = sectionRefs.current[currentFocusPage as ChunkType];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentFocusPage]);

  useEffect(() => {
    const pdf = document.getElementById("pdf-content");
    if (pdf) {
      pdf.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  if (!project_id) return null;

  return (
    <div className="flex" style={{ height: "calc(100vh - 70px)" }}>
      {project_id && (
        <PromptSidebar
          projectList={projectList}
          project_id={project_id}
          isLoading={isLoading}
        />
      )}

      <StreamingPromptContainer
        projectList={projectList}
        project_id={project_id}
        key={project_id}
      />

      <div
        id="pdf-content"
        className="space-y-4 bg-gray-100 overflow-auto flex-1"
        style={{ height: "calc(100vh - 70px)" }}
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
    </div>
  );
}
