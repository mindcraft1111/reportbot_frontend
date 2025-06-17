import SpinnerOverlay from "../spinner-overlay";

type Props = {
  department_execution_roles: {
    solution: string;
    ownerDept: string;
    coopDept: string;
    role: string;
  }[];
  isCurrentWorkingPage?: boolean; // 추가된 prop
};

function ExecutionPlanPage_10({
  department_execution_roles,
  isCurrentWorkingPage = false,
}: Props) {
  return (
    <section className="relative page-container">
      {isCurrentWorkingPage && <SpinnerOverlay />}

      <h1>실행 계획 및 KPI</h1>
      <p>
        앞서 제안된 솔루션을 효과적으로 구현하기 위한 단계별 실행 계획과 성과
        측정을 위한 핵심 성과 지표(KPI)를 수립했습니다. 체계적인 실행 계획은
        리소스의 효율적 배분과 프로젝트의 성공적인 완수를 위해 필수적입니다.
      </p>

      <h2>솔루션 이행을 위한 단계별 실행 계획</h2>
      <div className="execution-plan">
        <div className="plan-step">
          <div className="plan-icon">
            <img
              src="https://img.icons8.com/ios-filled/32/search--v1.png"
              alt="상세 분석"
            />
          </div>
          <div className="plan-content">
            <strong>상세 분석</strong>
            <p>주요 개선 영역에 대한 깊이 있는 분석 및 요구사항 정의</p>
          </div>
        </div>

        <div className="plan-step">
          <div className="plan-icon">
            <img
              src="https://img.icons8.com/ios-filled/32/000000/airplane-take-off.png"
              alt="계획 수립"
            />
          </div>
          <div className="plan-content">
            <strong>계획 수립</strong>
            <p>우선순위 설정, 리소스 할당 및 상세 일정 계획</p>
          </div>
        </div>

        <div className="plan-step">
          <div className="plan-icon">
            <img
              src="https://img.icons8.com/ios-filled/32/000000/source-code.png"
              alt="개발 실행"
            />
          </div>
          <div className="plan-content">
            <strong>개발/실행</strong>
            <p>솔루션 개발 및 구현 (단계별 접근)</p>
          </div>
        </div>

        <div className="plan-step">
          <div className="plan-icon">
            <img
              src="https://img.icons8.com/ios-filled/32/000000/test-tube.png"
              alt="테스트 검증"
            />
          </div>
          <div className="plan-content">
            <strong>테스트/검증</strong>
            <p>품질 보증 테스트 및 초기 사용자 피드백 수집</p>
          </div>
        </div>

        <div className="plan-step">
          <div className="plan-icon">
            <img
              src="https://img.icons8.com/ios-filled/32/000000/rocket.png"
              alt="출시 모니터링"
            />
          </div>
          <div className="plan-content">
            <strong>출시/모니터링</strong>
            <p>솔루션 출시 및 지속적인 성과 모니터링</p>
          </div>
        </div>
      </div>

      <h2>담당 부서 및 역할 분담</h2>
      <table className="role-table">
        <thead>
          <tr>
            <th>솔루션</th>
            <th>주관 부서</th>
            <th>협업 부서</th>
            <th>주요 역할</th>
          </tr>
        </thead>
        <tbody>
          {department_execution_roles.map((item, index) => (
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
        <span className="page-number">- 10 -</span>
      </div>
    </section>
  );
}

export default ExecutionPlanPage_10;
