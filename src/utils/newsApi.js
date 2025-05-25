import { newsApiBaseUrl } from "./constants";
import { request } from "./api";

const saveArticle = ({
  id,
  source,
  title,
  date,
  description,
  image,
  keyword,
}) => {
  const token = localStorage.getItem("jwt");

  return request(`${newsApiBaseUrl}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      source,
      title,
      date,
      description,
      image,
      keyword,
    }),
  });
};

const getSavedArticles = () => {
  return request(`${newsApiBaseUrl}/articles`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const removeArticle = (id) => {
  return request(`${newsApiBaseUrl}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export { saveArticle, getSavedArticles, removeArticle };
