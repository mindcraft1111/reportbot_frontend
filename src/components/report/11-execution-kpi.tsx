type Props = {
  r_11_1: {
    title: string;
    items: string[];
  }[];
  r_11_2: string;
  r_11_3: string;
};



function ExecutionKPIPage_11({ r_11_1, r_11_2, r_11_3 }: Props) {
  return (
    <section className="page-container">
      <h2>성과 측정을 위한 핵심 성과 지표(KPI)</h2>

      <div className="kpi-grid">
        {r_11_1.map((kpi, index) => (
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
      <p>{r_11_2}</p>
      <p>{r_11_3}</p>

      <div className="page-footer">
        <span className="page-number">- 11 -</span>
      </div>
    </section>
  );
}

export default ExecutionKPIPage_11;
