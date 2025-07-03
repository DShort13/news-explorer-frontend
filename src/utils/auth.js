import { newsApiBaseUrl } from "./constants";
import { request } from "./api";
import { reject } from "lodash";

const MOCK_TOKEN = "mock-jwt-token-123";

// const register = (email, password, username) => {
//   return request(`${newsApiBaseUrl}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password, username }),
//   }).then((data) => ({ ...data, success: true }));
// };

const register = (email, password, username) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem("jwt", MOCK_TOKEN);
      resolve({
        success: true,
        message: "Mock registration success",
        user: { email, password },
        token: MOCK_TOKEN,
      });
    }, 1000);
  });
};

// const authorize = (email, password) => {
//   return request(`${newsApiBaseUrl}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });
// };

const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("jwt", MOCK_TOKEN);
        resolve({
          token: MOCK_TOKEN,
          message: "Mock login success",
        });
      } else {
        reject(new Error("Missing credentials"));
      }
    }, 1000);
  });
};

// const getUserInfo = (token) => {
//   return request(`${newsApiBaseUrl}/users/me`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

const getUserInfo = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === "mock-jwt-token-123") {
        resolve({
          email: "mockuser@example.com",
          username: "MockUser",
          _id: "123456789",
        });
      } else {
        reject(new Error("Invalid token"));
      }
    }, 500);
  });
};

export { register, authorize, getUserInfo };
