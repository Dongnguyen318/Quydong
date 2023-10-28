import { config } from "./config.js";

const { SERVER_API } = config;

export const client = {
  token: null,

  setToken: function (tk) {
    this.token = tk;
  },

  send: async function (url, method = "GET", body = null) {
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;

    const option = {
      method,
      headers,
    };
    if (body) option.body = JSON.stringify(body);

    const response = await fetch(`${SERVER_API}${url}`, option);
    const data = await response.json();
    return { response: response, data: data };
  },

  get: function (url) {
    return this.send(url);
  },

  post: function (url, body) {
    return this.send(url, "POST", body);
  },

  put: function (url, body) {
    return this.send(url, "PUT", body);
  },

  patch: function (url, body) {
    return this.send(url, "PATCH", body);
  },

  delete: function (url) {
    return this.send(url, "DELETE");
  },
};
