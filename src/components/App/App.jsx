import { Routes, Route, useNavigate } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";

import "./App.css";
import Footer from "../Footer/Footer";
import Main from "../Main/Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import { defaultNewsArticles } from "../../utils/defaultNewsArticles";
import { register, authorize, getUserInfo } from "../../utils/auth";
import * as auth from "../../utils/auth";
import * as token from "../../utils/token";
import { getNewsArticles } from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import {
  getSavedArticles,
  removeArticle,
  saveArticle,
} from "../../utils/newsApi";
import debounce from "lodash.debounce";
import nothingFound from "../../assets/no-results-found.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedNewsContext from "../../contexts/SavedNewsContext";
import Header from "../Header/Header";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [jwt, setJwt] = useState(token.getToken());
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [query, setQuery] = useState("");

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLogIn = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    // Ask the server to log the user in
    authorize(email, password)
      .then((data) => {
        if (data?.token) {
          token.setToken(data.token); // Save token in local storage
          setJwt(data.token); // Also save it in React state
          return getUserInfo(data.token); // Fetch user's info
        } else {
          throw new Error("No token returned from authorize");
        }
      })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setCurrentUser(userInfo);
        setIsLoggedIn(true);
        console.log("User info updated:", userInfo);
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    token.removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setJwt(null);
    navigate("/");
    console.log("User successfully logged out");
  };

  // Search article results
  const handleArticleSearch = (userInput) => {
    setIsLoading(true);
    const searchNews = getNewsArticles(userInput);
    searchNews
      .then((data) => {
        const processedArticles = data.articles.map((item) => {
          return {
            ...item,
            keyword: userInput,
            urlToImage: item.urlToImage || nothingFound,
          };
        });
        setSearchResults(processedArticles);
        setIsSearching(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  // Save articles
  const handleSaveArticle = (data) => {
    if (!jwt) {
      console.log("No token found, user is not logged in.");
      return;
    }

    const { id, source, title, date, description, image, keywords } = data.data;

    saveArticle({
      id,
      source,
      title,
      date,
      description,
      image,
      token: jwt,
      keywords,
    })
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

  // Debounce fetch
  const debounceFetch = useMemo(() => {
    return debounce(() => {
      setIsLoading(true);
      getSavedArticles({ token: jwt })
        .then((data) => {
          setSearchResults(data);
          setIsSearching(true);
        })
        .catch((err) => {
          console.error("Error fetching saved articles:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  }, [jwt]);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") closeActiveModal();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  useEffect(() => {
    if (!jwt) {
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    }

    setIsLoading(true);

    Promise.all([getUserInfo(jwt), getSavedArticles({ token: jwt })])
      .then(([userInfo, savedArticles]) => {
        setCurrentUser(userInfo);
        setIsLoggedIn(true);
        setSavedArticles(savedArticles);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [jwt]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <SavedNewsContext.Provider value={{ savedArticles, setSavedArticles }}>
        <div className="page">
          <div className="page__content">
            <header>
              <Header
                handleLoginModal={handleLoginModal}
                handleLogOut={handleLogOut}
                handleArticleSearch={handleArticleSearch}
                debounceFetch={debounceFetch}
                query={query}
                setQuery={setQuery}
                onSubmit={handleArticleSearch}
              />
            </header>
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    searchResults={searchResults}
                    isLoading={isLoading}
                    isSearching={isSearching}
                    handleSaveArticle={handleSaveArticle}
                    handleUnsaveArticle={handleUnsaveArticle}
                    handleRemoveArticle={handleRemoveArticle}
                    query={query}
                  />
                }
              />
              <Route
                path="/saved-news"
                element={
                  <SavedNews
                    savedArticles={savedArticles}
                    setSavedArticles={setSavedArticles}
                    handleRemoveArticle={handleRemoveArticle}
                    keywords={keywords}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <div>
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              handleRegisterModal={handleRegisterModal}
              handleLogIn={handleLogIn}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              handleLoginModal={handleLoginModal}
            />
          </div>
        </div>
      </SavedNewsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
