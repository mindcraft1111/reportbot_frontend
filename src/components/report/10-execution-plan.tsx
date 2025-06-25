import SpinnerOverlay from "../spinner-overlay";

type Props = {
  r_10_1: {
    solution: string;
    ownerDept: string;
    coopDept: string;
    role: string;
  }[];
  isCurrentWorkingPage?: boolean; // 추가된 prop
};

function ExecutionPlanPage_10({ r_10_1, isCurrentWorkingPage = false }: Props) {
  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h1 className="content-h1">실행 계획 및 KPI</h1>
      <p>
      제안된 솔루션의 효과적 구현을 위해 단계별 실행 계획과 핵심 성과 지표(KPI)를 수립하였습니다. 이는 리소스를 효율적으로 배분하고 프로젝트를 성공적으로 완수하는 데 기여합니다.
      </p>

      <h2>솔루션 이행을 위한 단계별 실행 계획</h2>
      <div className="compact-step-grid">
        <div className="step-item">
          <img src="https://img.icons8.com/ios-filled/32/search--v1.png" alt="상세 분석" />
          <div>
            <strong>상세 분석</strong>
            <p>개선 영역 분석 및 요구사항 정의</p>
          </div>
        </div>
        <div className="step-item">
          <img src="https://img.icons8.com/ios-filled/32/000000/airplane-take-off.png" alt="계획 수립" />
          <div>
            <strong>계획 수립</strong>
            <p>우선순위 설정 및 일정 계획</p>
          </div>
        </div>
        <div className="step-item">
          <img src="https://img.icons8.com/ios-filled/32/000000/source-code.png" alt="개발 실행" />
          <div>
            <strong>개발 실행</strong>
            <p>솔루션 개발 및 단계별 구현</p>
          </div>
        </div>
        <div className="step-item">
          <img src="https://img.icons8.com/ios-filled/32/000000/test-tube.png" alt="테스트 검증" />
          <div>
            <strong>테스트 검증</strong>
            <p>테스트 및 사용자 피드백 수집</p>
          </div>
        </div>
      </div>
      <div className="step-item single">
        <img src="https://img.icons8.com/ios-filled/32/000000/rocket.png" alt="출시 모니터링" />
        <div>
          <strong>출시 모니터링</strong>
          <p>성과 측정 및 지속 개선</p>
        </div>
      </div>

      <h2>담당 부서 및 역할 분담</h2>
      <table className="role-table">
        <thead>
          <tr>
            <th>솔루션</th>
            <th style={{width: "100px"}}>주관 부서</th>
            <th>협업 부서</th>
            <th>주요 역할</th>
          </tr>
        </thead>
        <tbody>
          {r_10_1.map((item, index) => (
            <tr key={index}>
              <td>{item.solution}</td>
              <td>{item.ownerDept}</td>
              <td>{item.coopDept}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="page-footer">
        <span className="page-number">10</span>
      </div>
    </section>
  );
}

export default ExecutionPlanPage_10;
