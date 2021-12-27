const axios = require("axios");

export const API = axios.create({
  // baseURL: "https://inspire-people.herokuapp.com/api",
  // baseURL: "http://localhost:5000/api",
  baseURL: "/api",
});

export const setToken = (token) => {
  if (token) {
    API.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete API.defaults.headers.common["x-auth-token"];
  }
};
