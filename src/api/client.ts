import type { Gemini_Prompt } from "@/components/non-streaming-prompt";
import type { LoginSchema } from "@/pages/login-page";
import type { RegisterSchema } from "@/pages/register-page";

export const register = async (args: RegisterSchema) => {
  const res = await fetch("http://localhost:8000/api/register/", {
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

export const login = async (args: LoginSchema) => {
  const res = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });

  const result = await res.json();

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
