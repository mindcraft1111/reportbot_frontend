import type { Gemini_Prompt } from "@/components/non-streaming-prompt";
import type { LoginSchema } from "@/pages/login-page";
import type { RegisterSchema } from "@/pages/register-page";
import axiosInstance from "@/axios";

export type UserAndToken = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    company: string;
    id: number;
    email: string;
    join_date: string;
    name: string;
    phone: string;
    postion: string;
  };
};

export type AuthResponse = {
  success: boolean;
  status: number;
  data: null | UserAndToken;
  error: null | {
    detail: string;
  };
};

export const register = async (args: RegisterSchema): Promise<AuthResponse> => {
  const res = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });

  const result = await res.json();

  console.log("result:", result);

  return {
    success: res.ok,
    status: res.status,
    data: res.ok ? result : null,
    error: res.ok ? null : result,
  };
};

export const login = async (args: LoginSchema): Promise<AuthResponse> => {
  const res = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });

  const result = await res.json();

  console.log(result);

  return {
    success: res.ok,
    status: res.status,
    data: res.ok ? result : null,
    error: res.ok ? null : result,
  };
};

export const chat_with_gemini = async (args: Gemini_Prompt) => {
  const res = await fetch("http://localhost:8000/api/ai/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });

  const result = await res.json();
  console.log(result);

  return {
    success: res.ok,
    status: res.status,
    data: res.ok ? result : null,
    error: res.ok ? null : result,
  };
};

export const logout = async (
  refreshToken: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await axiosInstance.post("http://localhost:8000/api/logout/", {
      refresh: refreshToken,
    });

    return {
      success: true,
      message: res.data.detail || "로그아웃 성공",
    };
  } catch (err: any) {
    const message =
      err.response?.data?.detail || err.message || "네트워크 오류";
    return {
      success: false,
      message,
    };
  }
};
