import type { Gemini_Prompt } from "@/components/non-streaming-prompt";
import type { LoginSchema } from "@/pages/login-page";
import type { RegisterSchema } from "@/pages/register-page";
import axiosInstance from "@/axios";
import { toast } from "sonner";
import groupByReviewer from "@/components/utils/groupPromptByReviewer";
import axios from "axios";

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
  const res = await fetch("/api/register/", {
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
  try {
    const res = await axiosInstance.post("/api/login/", args);

    return {
      success: true,
      status: res.status,
      data: res.data,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status || 500,
      data: null,
      error: error.response?.data || error.message,
    };
  }
};

export const chat_with_gemini = async (args: Gemini_Prompt) => {
  try {
    const res = await axiosInstance.post("/api/ai/", args);

    return {
      success: true,
      status: res.status,
      data: res.data,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status || 500,
      data: null,
      error: error.response?.data || error.message,
    };
  }
};

export const logout = async (
  refreshToken: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await axiosInstance.post("/api/logout/", {
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

export const getPromptsByCode = async ({
  promptCode,
}: {
  promptCode: string;
}) => {
  if (promptCode == "no_part") return;
  try {
    // console.log(promptCode);
    const res = await axiosInstance.get(`/api/prompts-tests/${promptCode}`);

    const groupedPrompts = groupByReviewer(res.data.data);
    return groupedPrompts;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.data?.detail == "No PromptTest matches the given query."
      ) {
        toast.warning("수정할 페이지가 아닙니다.");
        return;
      }
    }
    console.log(error);
    toast.error("프롬프트 불러오기 실패");
  }
};

export const getProjectList = async () => {
  try {
    const res = await axiosInstance.get("/api/projects/");

    return res.data.data;
  } catch (error) {
    console.log(error);
    toast.error("프로젝트를 받아오는데 실패했습니다.");
    return [];
  }
};

export type ReportSectionPayload = {
  report: string;
  page_title: string;
  content: {
    [key: string]: string;
  };
  c_code: string;
  constraint_snapshot: string;
};

export const saveReport = async (payload: ReportSectionPayload) => {
  try {
    console.log(payload);
    const res = await axiosInstance.post("/api/report-sections-result/", {
      ...payload,
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    toast.error("리포트 저장에 실패했습니다.");
  }
};
