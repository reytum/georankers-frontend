// src/apiHelpers.tsx
import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "./api";
import { encryptPasswordSimple } from "@/lib/password-utils";

/* =====================
   TYPES
   ===================== */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  user?: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    owned_applications?: { id: string; company_name: string; project_token: string }[];
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  app_name: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  application: {
    id: string;
    user_id: string;
    company_name: string;
    project_token: string;
  };
  access_token: string;
  refresh_token: string;
}

export interface ProductPayload {
  name: string;
  description: string;
  website: string;
  business_domain: string;
  application_id: string;
  search_keywords: string[];
}

/* =====================
   AXIOS CONFIG
   ===================== */
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://georankers.co/api/v1",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.headers) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

/* =====================
   AUTH HELPERS
   ===================== */
export const login = async (payload: LoginRequest): Promise<LoginResponse | null> => {
  try {
    // Encrypt the password before sending
    const encryptedPayload = {
      email: payload.email,
      password: encryptPasswordSimple(payload.password)
    };

    const res: AxiosResponse<LoginResponse> = await API.post(API_ENDPOINTS.login, encryptedPayload);

    if (res.data.access_token) {
      localStorage.setItem("access_token", res.data.access_token);

      const appId = res.data.user?.owned_applications?.[0]?.id;
      if (appId) {
        localStorage.setItem("application_id", appId);
      }
    }

    return res.data;
  } catch (error) {
    return null;
  }
};

export const register = async (payload: RegisterRequest): Promise<RegisterResponse | null> => {
  try {
    // Encrypt the password before sending
    const encryptedPayload = {
      email: payload.email,
      password: encryptPasswordSimple(payload.password),
      first_name: payload.first_name,
      last_name: payload.last_name,
      app_name: payload.app_name
    };

    const res: AxiosResponse<RegisterResponse> = await API.post(API_ENDPOINTS.register, encryptedPayload);

    if (res.data.access_token) {
      localStorage.setItem("access_token", res.data.access_token);
    }
    if (res.data.application?.id) {
      localStorage.setItem("application_id", res.data.application.id);
    }

    return res.data;
  } catch (error) {
    return null;
  }
};

/* =====================
   PRODUCT HELPERS
   ===================== */
export const createProductWithKeywords = async (payload: ProductPayload): Promise<any> => {
  try {
    const appId = payload.application_id || localStorage.getItem("application_id") || "";

    let body;
    if ((payload as any).brand) {
      const brandTrimmed = (payload as any).brand.trim();
      body = {
        name: brandTrimmed,
        description: brandTrimmed,
        website: brandTrimmed,
        business_domain: brandTrimmed,
        application_id: appId,
        search_keywords: (payload as any).search_keywords?.filter((k: string) => k.trim() !== "") || [],
      };
    } else {
      body = {
        name: payload.name,
        description: payload.description,
        website: payload.website,
        business_domain: payload.business_domain,
        application_id: appId,
        search_keywords: (payload.search_keywords || []).filter((k) => k.trim() !== ""),
      };
    }

    const res = await API.post(API_ENDPOINTS.createProductWithKeywords, body);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const fetchProductsWithKeywords = async (payload: ProductPayload): Promise<any> => {
  try {
    const res = await API.post(API_ENDPOINTS.createProductWithKeywords, payload);
    return res.data;
  } catch (error) {
    return null;
  }
};

/* =====================
   ANALYTICS HELPERS
   ===================== */
export const getProductAnalytics = async (
  productId: string,
  date: string,
  accessToken: string
): Promise<any> => {
  try {
    const res = await API.get(API_ENDPOINTS.getProductAnalytics(productId, date), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res?.data || null;
  } catch (error) {
    return null;
  }
};

export const getKeywordAnalytics = async (
  keywordId: string,
  date: string,
  accessToken: string
): Promise<any> => {
  try {
    const res = await API.get(API_ENDPOINTS.getKeywordAnalytics(keywordId, date), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res?.data || null;
  } catch (error) {
    return null;
  }
};

export const getProductsByApplication = async (
  applicationId: string,
  accessToken: string
): Promise<any> => {
  try {
    const res = await API.get(API_ENDPOINTS.getProductsByApplication(applicationId), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res?.data || null;
  } catch (error) {
    return null;
  }
};