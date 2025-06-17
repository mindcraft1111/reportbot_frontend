import logo from "/assets/logo.png";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "@/contexts/AuthContext";
import HeaderAvatar from "./avatar";
import AuthButton from "./auth-button";

export default function Commheader() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 w-25" />
        </Link>

        <ul className="flex gap-2">
          <li>
            <Link
              to={"/prompt-test/1?category_name_ko=헤드폰"}
              className="hover:text-blue-400 text-blue-700 block font-medium text-[15px]"
            >
              테스트
            </Link>
          </li>
          <li>
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
            <HeaderAvatar />
          ) : (
            <AuthButton onClick={() => navigate("/auth/login")}>
              Login
            </AuthButton>
          )}
        </div>
      </div>
    </header>
  );
}
