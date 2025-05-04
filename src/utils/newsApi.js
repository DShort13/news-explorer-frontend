import { newsApiBaseUrl } from "./constants";
import { request } from "./api";

const saveArticle = (article) => {
  return request(`${newsApiBaseUrl}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keyword: article.keyword,
      source: article.source.name,
      title: article.title,
      date: article.publishedAt,
      description: article.description,
      image: article.urlToImage,
    }),
  });
};

const getSavedArticles = () => {
  return request(`${newsApiBaseUrl}/articles`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const removeArticle = (articleId) => {
  return request(`${newsApiBaseUrl}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { saveArticle, getSavedArticles, removeArticle };
