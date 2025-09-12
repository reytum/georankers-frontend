export const BASE_URL = "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
  // Auth
  login: `${BASE_URL}/users/login`,
  register: `${BASE_URL}/users/register-with-app`,

  // Products
  createProductWithKeywords: `${BASE_URL}/products/with-keywords`,

  // Analytics
  generateKeywordAnalytics: `${BASE_URL}/analytics/keywords/generate`,
  getKeywordAnalytics: (keywordId: string, date: string) =>
    `${BASE_URL}/analytics/keywords/${keywordId}?date=${date}`,
  getKeywordAnalyticsById: (analyticsId: string) =>
    `${BASE_URL}/analytics/keywords/id/${analyticsId}`,
  getKeywordAnalyticsHistory: (keywordId: string, page = 1, limit = 10) =>
    `${BASE_URL}/analytics/keywords/${keywordId}/history?page=${page}&limit=${limit}`,

  generateProductAnalytics: `${BASE_URL}/analytics/products/generate`,
  getProductAnalytics: (productId: string, date: string) =>
    `${BASE_URL}/analytics/products/${productId}?date=${date}`,
  getProductAnalyticsById: (analyticsId: string) =>
    `${BASE_URL}/analytics/products/id/${analyticsId}`,
  getProductAnalyticsHistory: (productId: string, page = 1, limit = 10) =>
    `${BASE_URL}/analytics/products/${productId}/history?page=${page}&limit=${limit}`,

  // Generic analytics
  getAnalyticsById: (analyticsId: string) => `${BASE_URL}/analytics/${analyticsId}`,
  getAnalyticsHistory: (type: "keyword" | "product", entityId: string, page = 1, limit = 10) =>
    `${BASE_URL}/analytics/history?type=${type}&id=${entityId}&page=${page}&limit=${limit}`,
};
