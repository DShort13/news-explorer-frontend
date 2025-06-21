import { newsApiBaseUrl } from "./constants";
import { request } from "./api";

const register = (email, password, username) => {
  return request(`${newsApiBaseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  }).then((data) => ({ ...data, success: true }));
};

const authorize = (email, password) => {
  return request(`${newsApiBaseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

const getUserInfo = (token) => {
  return request(`${newsApiBaseUrl}/users/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export { register, authorize, getUserInfo };
