import SpinnerOverlay from "../spinner-overlay";

type Props = {
  kpi_metrics: {
    title: string;
    items: string[];
  }[];
  execution_plan_summary: string;
  budget_allocation_summary: string;
  isCurrentWorkingPage?: boolean; // 추가된 prop
};

function ExecutionKPIPage_11({
  kpi_metrics,
  execution_plan_summary,
  budget_allocation_summary,
  isCurrentWorkingPage = false,
}: Props) {
  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h2>성과 측정을 위한 핵심 성과 지표(KPI)</h2>

      <div className="kpi-grid">
        {kpi_metrics.map((kpi, index) => (
          <div className="kpi-card" key={index}>
            <h3>{kpi.title}</h3>
            <ul>
              {kpi.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>타임라인 및 예산 계획</h2>
      <p>{execution_plan_summary}</p>
      <p>{budget_allocation_summary}</p>

      <div className="page-footer">
        <span className="page-number">- 11 -</span>
      </div>
    </section>
  );
}

export default ExecutionKPIPage_11;
