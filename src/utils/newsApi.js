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

export { saveArticle, getSavedArticles, removeArticle };
