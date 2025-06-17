import type { Gemini_Prompt } from "@/components/non-streaming-prompt";
import type { LoginSchema } from "@/pages/login-page";
import type { RegisterSchema } from "@/pages/register-page";

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
  accessToken: string,
  refreshToken: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch("http://localhost:8000/api/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const result = await res.json();

    return {
      success: res.ok,
      message: result.detail || "로그아웃 실패",
    };
  } catch (err: any) {
    // For network or unexpected errors
    return {
      success: false,
      message: err.message || "네트워크 오류",
    };
  }
};
