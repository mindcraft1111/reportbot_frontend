import axios from "axios";
import { toast } from "sonner";

const mode = import.meta.env.MODE;
export const baseURL =
  mode == "development"
    ? import.meta.env.VITE_BASE_URL_DEV
    : import.meta.env.VITE_BASE_URL_PROD;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response?.data?.code === "token_not_valid"
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      const userAndToken = localStorage.getItem("userAndToken");
      if (!userAndToken) return Promise.reject(error);

      let refreshToken: string | null = null;

      try {
        const parsed = JSON.parse(userAndToken);
        refreshToken = parsed?.tokens?.refreshToken;

        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const { data } = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = data.access;
        const newRefreshToken = data.refresh;

        const newUserAndToken = {
          tokens: {
            accessToken: data.access,
            newRefreshToken,
          },
          user: { ...parsed.user },
        };

        localStorage.setItem("userAndToken", JSON.stringify(newUserAndToken));
        axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        // 🔁 If the original request was logout, re-attach refreshToken in body
        if (originalRequest.url?.includes("/api/logout/")) {
          originalRequest.data = JSON.stringify({ refresh: newRefreshToken });
        }

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Attach token to all requests
axiosInstance.interceptors.request.use((config) => {
  const userAndTokenRaw = localStorage.getItem("userAndToken");

  if (!userAndTokenRaw) {
    return config;
  }

  try {
    const parsed = JSON.parse(userAndTokenRaw);
    const accessToken = parsed?.tokens?.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      toast.error("Access Token이 존재하지 않습니다.");
    }
  } catch (e) {
    console.error("userAndToken JSON 파싱 실패:", e);
    toast.error("로그인 정보가 올바르지 않습니다.");
  }

  return config;
});

export default axiosInstance;
