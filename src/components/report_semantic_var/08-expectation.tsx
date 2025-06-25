import SpinnerOverlay from "../spinner-overlay";

type Props = {
  expectation_gap_items: {
    label: string;
    expected: number;
    actual: number;
    gap: number;
  }[];
  expectation_gap_summary: string;
  isCurrentWorkingPage?: boolean;
};

function ExpectationGapPage_08({
  expectation_gap_items,
  expectation_gap_summary,
  isCurrentWorkingPage = false,
}: Props) {
  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h2>고객 기대치와 실제 경험 간 차이 분석</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>요소</th>
            <th>고객 기대치(5점 만점)</th>
            <th>실제 경험(5점 만점)</th>
            <th>GAP</th>
          </tr>
        </thead>
        <tbody>
          {expectation_gap_items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.label}</td>
              <td>{item.expected}</td>
              <td>{item.actual}</td>
              <td>{item.gap}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>{expectation_gap_summary}</p>

      <div className="page-footer">
        <span className="page-number">8</span>
      </div>
    </section>
  );
}

export default ExpectationGapPage_08;
