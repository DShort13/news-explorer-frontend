import { newsApiBaseUrl } from "./constants";
import { request } from "./api";
import { reject } from "lodash";

// Generating mock responses since the backend isn't set up yet
let mockSavedArticles = JSON.parse(
  localStorage.getItem("mockSavedArticles") || "[]"
);

const saveArticle = ({
  id,
  source,
  title,
  date,
  description,
  image,
  keywords,
  link,
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newArticle = {
        _id: `mock-${Date.now()}`,
        id,
        source,
        title,
        date,
        description,
        image,
        keywords,
        link,
      };
      mockSavedArticles.push(newArticle);
      localStorage.setItem(
        "mockSavedArticles",
        JSON.stringify(mockSavedArticles)
      );
      resolve(newArticle);
    }, 300);
  });
};

// const saveArticle = ({
//   id,
//   source,
//   title,
//   date,
//   description,
//   image,
//   keywords,
// }) => {
//   const token = localStorage.getItem("jwt");

//   return request(`${newsApiBaseUrl}/articles`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       id,
//       source,
//       title,
//       date,
//       description,
//       image,
//       keywords,
//     }),
//   });
// };

const getSavedArticles = ({ token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === "mock-jwt-token-123") {
        resolve([...mockSavedArticles]);
      } else {
        reject(new Error("Unauthorized"));
      }
    }, 300);
  });
};

// const getSavedArticles = ({ token }) => {
//   return request(`${newsApiBaseUrl}/articles`, {
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

const removeArticle = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setTimeout(() => {
        mockSavedArticles = mockSavedArticles.filter((a) => a._id !== id);
        localStorage.setItem(
          "mockSavedArticles",
          JSON.stringify(mockSavedArticles)
        );
        resolve({ message: "Deleted" });
      }, 300);
    });
  });
};

// const removeArticle = (id) => {
//   return request(`${newsApiBaseUrl}/articles/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

export { saveArticle, getSavedArticles, removeArticle };
