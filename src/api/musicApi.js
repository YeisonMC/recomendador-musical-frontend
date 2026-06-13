import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ??
  "https://recomendador-musical-backend.onrender.com/api";
// const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

const musicApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 12000,
});

export const getHealth = async () => {
  const { data } = await musicApi.get("/health");
  return data;
};

export const getSongs = async () => {
  const { data } = await musicApi.get("/songs");
  return data;
};

export const getRecommendations = async (selectedSongs, topN) => {
  const { data } = await musicApi.post("/recommendations", {
    selected_songs: selectedSongs,
    top_n: topN,
  });

  return data;
};

export const getApiErrorDetail = (error) => {
  const detail = error?.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg ?? String(item)).join(" ");
  }

  if (detail) {
    return String(detail);
  }

  return "";
};
