export const APIkey = "8e74bf7be8f34aa6a4fe2a5646394aa9";
export const newsApiBaseUrl =
  import.meta.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "http://localhost:3001";
export const newsApiUrl = "https://newsapi.org/v2/everything";
export const pageSize = { Maximum: "100" };

// Gets current date and formats it for the api
function getCurrentDate() {
  const date = new Date();
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });
  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

export const currentDate = getCurrentDate();

// Gets current date, calculates the date 7 days prior to it, and formats it for the api
function getLastWeekDate() {
  const time = new Date().getTime() - 604800000; // 604800000ms = 1 week
  const previousWeek = new Date(time);
  const year = previousWeek.toLocaleString("default", { year: "numeric" });
  const month = previousWeek.toLocaleString("default", { month: "2-digit" });
  const day = previousWeek.toLocaleString("default", { day: "2-digit" });
  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

export const previousWeek = getLastWeekDate();

// Formats date received from the api call to US format
export const formatSearchResultDate = (date) => {
  return new Date(date).toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
