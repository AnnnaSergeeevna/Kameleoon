import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3100",
  headers: {
    "Content-Type": "application/json",
  },
});


export const getTests = () => {
  return api.get("/tests");
};

export const getSites = () => {
  return api.get("/sites");
};
