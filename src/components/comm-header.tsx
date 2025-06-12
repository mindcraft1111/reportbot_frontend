import logo from "/assets/logo.png";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "@/contexts/AuthContext";

export default function Commheader() {
  const navivate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 w-25" />
        </Link>

        <ul className="flex gap-2">
          <li className="">
            <Link
              to={"/test"}
              className="hover:text-blue-400 text-blue-700 block font-medium text-[15px]"
            >
              테스트
            </Link>
          </li>
          <li className="">
            <Link
              to={"/prompt-test/1?category_name_ko=헤드폰"}
              className="hover:text-blue-400 text-blue-700 block font-medium text-[15px]"
            >
              테스트2
            </Link>
          </li>
          <li className="">
            <Link
              to={"/report"}
              className="hover:text-blue-400 text-blue-700 block font-medium text-[15px]"
            >
              리포트
            </Link>
          </li>
        </ul>

        <div className="flex space-x-4">
          {auth?.isLoggedIn ? (
            <>
              <button id="toggleOpen" className="lg:hidden cursor-pointer">
                <svg
                  className="w-7 h-7"
                  fill="#000"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all"
              onClick={() => navivate("/auth/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
