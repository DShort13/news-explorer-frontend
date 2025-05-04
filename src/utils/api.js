import {
  newsApiUrl,
  previousWeek,
  currentDate,
  pageSize,
  APIkey,
} from "./constants.js";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getNewsArticles(userInput) {
  return fetch(
    `${newsApiUrl}?q=${userInput}&from=${previousWeek}&to=${currentDate}&pageSize=${pageSize}&apikey=${APIkey}`
  ).then(checkResponse);
}

export { checkResponse, request, getNewsArticles };
