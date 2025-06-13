import { useLocation, useParams } from "react-router";
import PromptSidebar from "@/components/prompt-sidebar";
import StreamingPromptContainer from "@/components/streaming_prompt_container";
import A4Layout from "@/components/layouts/A4-layout";
import PageSeparator from "@/components/page-separator";
import ReportCoverPage from "@/components/report/00-report-cover";
import ContentsPage_01 from "@/components/report/01-contents";
import OverviewPage_02 from "@/components/report/02-overview";
import SwotPage_03 from "@/components/report/03-swot";
import SelfProductPage_04 from "@/components/report/04-my-product";
import CompetitorPage_05 from "@/components/report/05-competitor";
import ComparisonPage_06 from "@/components/report/06-comparison";
import ImprovementPage_07 from "@/components/report/07-improve";
import ExpectationGapPage_08 from "@/components/report/08-expectation";
import SolutionPage_09 from "@/components/report/09-solution";
import ExecutionPlanPage_10 from "@/components/report/10-execution-plan";
import ExecutionKPIPage_11 from "@/components/report/11-execution-kpi";
import ConclusionPage_12 from "@/components/report/12-conclusion";
import ExecutiveSummaryPage_13 from "@/components/report/13-executive-summary";
import { useAIData } from "@/contexts/AIResponseContext";

const TOTAL_PROMPT = 30;

export default function PromptTestPage2() {
  const { category_id } = useParams<{
    category_id: string;
  }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryNameKo = searchParams.get("category_name_ko");
  const { state } = useAIData();

  return (
    <div className="flex h-screen">
      {category_id && <PromptSidebar category_id={category_id} />}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {category_id &&
          categoryNameKo &&
          Array.from({ length: TOTAL_PROMPT }).map((_, i) => (
            <StreamingPromptContainer
              key={i}
              category_name_ko={categoryNameKo}
              category_id={category_id}
              page={"coverPage"}
            />
          ))}
      </div>

      <div
        id="pdf-content"
        className="space-y-4 p-12 bg-gray-100 h-screen overflow-auto"
      >
        <A4Layout>
          <ReportCoverPage {...state.coverPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <ContentsPage_01 {...state.contentsPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <OverviewPage_02 {...state.overviewPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <SwotPage_03 {...state.swotPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <SelfProductPage_04 {...state.selfProductPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <CompetitorPage_05 {...state.competitorPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <ComparisonPage_06 {...state.comparisonPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <ImprovementPage_07 {...state.improvementPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <ExpectationGapPage_08 {...state.expectationGapPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <SolutionPage_09 {...state.solutionPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <ExecutionPlanPage_10 {...state.executionPlanPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <ExecutionKPIPage_11 {...state.executionKPIPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <ConclusionPage_12 {...state.conclusionPage} />
        </A4Layout>
        <PageSeparator />

        <A4Layout>
          <ExecutiveSummaryPage_13 {...state.executiveSummaryPage} />
        </A4Layout>
        <PageSeparator />
      </div>
    </div>
  );
}
