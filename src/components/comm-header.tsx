import logo2 from "/assets/logo2.png";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "@/contexts/AuthContext";
import HeaderAvatar from "./avatar";
import AuthButton from "./auth-button";
import { Menu, X } from "lucide-react"; // optional icon package
import { useGeneralContext } from "@/contexts/GeneralContext";

export default function Commheader() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { toggleSidebar, isSidebarOpen } = useGeneralContext();

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        {/* Hamburger Button (visible only on small screens) */}
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => toggleSidebar()}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Logo */}
        <Link to="/">
          <img src={logo2} alt="logo" className="h-10 w-25" />
        </Link>

        {/* Desktop Menu */}
        <ul className="sm:flex gap-4 hidden">
          <li>
            <Link
              to="/prompt-test/1?category_name_ko=헤드폰"
              className="hover:text-blue-400 text-blue-700 font-medium text-[15px]"
            >
              테스트
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="hover:text-blue-400 text-blue-700 font-medium text-[15px]"
            >
              리포트
            </Link>
          </li>
        </ul>

        {/* Mobile Menu (dropdown style)
        {menuOpen && (
          <ul className="sm:hidden flex flex-col absolute top-[70px] left-0 w-full bg-white shadow-md z-50 px-4 py-3 space-y-2">
            <li>
              <Link
                to="/prompt-test/1?category_name_ko=헤드폰"
                className="block text-blue-700 hover:text-blue-400 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                테스트
              </Link>
            </li>
            <li>
              <Link
                to="/report"
                className="block text-blue-700 hover:text-blue-400 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                리포트
              </Link>
            </li>
          </ul>
        )} */}

        {/* Auth Buttons */}
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
