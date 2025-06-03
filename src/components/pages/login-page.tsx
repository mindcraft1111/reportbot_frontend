import { buttonBase, gradientBlueButton } from '@/styles/classnames';
import logo from "@assets/logo.png";

export default function LoginPage() {
  return (
    <div className="bg-[linear-gradient(90deg,_#ffffff_0%,_#e6f1ff_0%,_#fff5f2_61%)]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="/"><img
            src={logo} alt="logo" className="w-40 mb-8 mx-auto block" />
          </a>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-slate-900 text-center text-3xl font-semibold">로그인</h2>
            <form className="mt-12 space-y-6">
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">이메일</label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#bbb" viewBox="0 0 20 15">
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    </svg>
                  </div>
                  <input name="email" type="email" required className="w-full text-slate-800 text-sm border border-slate-300 ps-10 px-4 py-3 rounded-md outline-blue-600" placeholder="이메일을 입력해 주세요" />
                </div>
              </div>
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">비밀번호</label>
                <div className="relative flex items-center">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="none" viewBox="0 0 17 21">
                    <g stroke="#000" opacity=".2">
                      <rect width="15.301" height="11.905" x=".5" y="8.289" rx="1.5"></rect>
                      <circle cx="8.489" cy="14.244" r="1.877"></circle>
                      <path stroke-miterlimit="10" d="M4.754 8.471v-3.69C4.754 2.693 6.427 1 8.489 1c2.063 0 3.736 1.693 3.736 3.781v3.69"></path>
                    </g>
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                  </svg>
                </div>
                  <input name="password" type="password" required className="w-full text-slate-800 text-sm border border-slate-300 ps-10 px-4 py-3 rounded-md outline-blue-600" placeholder="비밀번호를 입력해 주세요" />
                  <div className="absolute cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                </div>
                <div className="text-sm">
                  <a href="jajvascript:void(0);" className="text-gray-400 hover:underline font-semibold">
                    비밀번호 재설정
                  </a>
                </div>
              </div>
              <div className="!mt-12">
                <button type="button" className={`${buttonBase} ${gradientBlueButton}`}>
                  로그인
                </button>
              </div>
              <p className="text-slate-800 text-sm !mt-6 text-center">회원이 아니신가요? <a href="javascript:void(0);" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">회원가입</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
