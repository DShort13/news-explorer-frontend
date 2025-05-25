import { Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

import "./App.css";
import Footer from "../Footer/Footer";
import Main from "../Main/Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import { defaultNewsArticles } from "../../utils/defaultNewsArticles";
import RegisterModal from "../RegisterModal/RegisterModal";
import { removeArticle, saveArticle } from "../../utils/newsApi";
import { getNewsArticles } from "../../utils/api";
import noResultsFound from "../../assets/no-results-found.svg";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  // Search article results
  const handleArticleSearch = (userInput) => {
    const searchNews = getNewsArticles(userInput);
    searchNews
      .then((data) => {
        data.articles.forEach((item) => (item.keyword = userInput));
        data.articles.forEach((item) => {
          if (item.urlToImage === null) {
            item.urlToImage = noResultsFound;
          }
          setSearchResults(data.articles);
        });
      })
      .catch((err) => console.error(err));
  };

  // Save articles
  const handleSaveArticle = (newsItem, keyword = "Keyword N/A") => {
    saveArticle(newsItem, keyword)
      .then((data) => {
        setSavedArticles([...savedArticles, data]);
      })
      .catch((err) => console.error(err));
  };

  // Unsave Article
  const handleUnsaveArticle = (newsItem) => {
    const isArticleSaved = savedArticles.some((article) => {
      return article.link === newsItem.url;
    });
    const articleToRemove = isArticleSaved
      ? savedArticles.find((article) => {
          return article.link === newsItem.url;
        })
      : undefined;
    removeArticle(articleToRemove._id)
      .then(() => {
        setSavedArticles(
          savedArticles.filter((article) => {
            return article.link !== newsItem.url;
          })
        );
      })
      .catch((err) => console.error(err));
  };

  // Remove articles
  const handleRemoveArticle = (newsItem) => {
    const isArticleSaved = savedArticles.some((article) => {
      return article.link === newsItem.link;
    });
    const articleToRemove = isArticleSaved
      ? savedArticles.find((article) => {
          return article.link === newsItem.link;
        })
      : undefined;
    removeArticle(articleToRemove._id)
      .then(() => {
        setSavedArticles(
          savedArticles.filter((article) => {
            return article.link !== newsItem.link;
          })
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") closeActiveModal();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                // defaultNewsArticles={defaultNewsArticles}
                searchResults={searchResults}
                handleArticleSearch={handleArticleSearch}
                handleLoginModal={handleLoginModal}
                handleSaveArticle={handleSaveArticle}
                handleUnsaveArticle={handleUnsaveArticle}
                handleRemoveArticle={handleRemoveArticle}
              />
            }
          />
          <Route
            path="/saved-news"
            element={<SavedNews defaultNewsArticles={defaultNewsArticles} />}
          />
        </Routes>
        <Footer />
      </div>
      <div>
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          handleRegisterModal={handleRegisterModal}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          handleLoginModal={handleLoginModal}
        />
      </div>
    </div>
  );
}

export default App;
