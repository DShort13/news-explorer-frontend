import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { useContext, useEffect, useMemo, useState } from "react";

import "./App.css";
import Footer from "../Footer/Footer";
import Main from "../Main/Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import { register, authorize, getUserInfo } from "../../utils/auth";
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
import { set } from "lodash";
import SearchForm from "../SearchForm/SearchForm";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [jwt, setJwt] = useState(token.getToken());
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [query, setQuery] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

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
      return Promise.reject("Missing credentials");
    }

    // Ask the server to log the user in
    return authorize(email, password)
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
        setIsLoggedIn(true);
        console.log("User info updated:", userInfo);
        closeActiveModal();
        localStorage.setItem("currentUser", JSON.stringify(userInfo));
        navigate("/");
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    token.removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setJwt(null);
    navigate("/");
    console.log("User successfully logged out");
  };

  const handleRegister = ({ email, password, username }) => {
    return register(email, password, username)
      .then((data) => {
        if (data.success && data.token) {
          token.setToken(data.token);
          setJwt(data.token);
          return getUserInfo(data.token);
        } else {
          throw new Error("Registration failed");
        }
      })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error during registration:", err);
      });
  };

  // Search article results
  const handleArticleSearch = (userInput) => {
    setIsLoading(true);
    setIsSearching(true);
    setSearchResults([]);
    setCurrentSearch(userInput);
    navigate("/");

    getNewsArticles(userInput)
      .then((data) => {
        const processedArticles = data.articles.map((item) => ({
          ...item,
          keyword: userInput,
          urlToImage: item.urlToImage || nothingFound,
        }));
        setSearchResults(processedArticles);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Save articles
  const handleSaveArticle = (data) => {
    if (!jwt) {
      console.log("No token found, user is not logged in.");
      return;
    }

    const isAlreadySaved = savedArticles.some(
      (article) => article.link === data.link
    );

    if (isAlreadySaved) return;

    console.log("Saving article, received data:", data);
    const { id, source, title, date, description, image, keywords } = data;

    saveArticle({
      id,
      source,
      title,
      date,
      description,
      image,
      token: jwt,
      keywords,
      link: data.url || data.link || data.id,
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
    if (!newsItem) return;

    const articleToRemove = savedArticles.find(
      (article) => article.link === newsItem.link
    );

    if (!articleToRemove || !articleToRemove._id) {
      console.warn("No matching article found to remove");
      return;
    }

    removeArticle(articleToRemove._id)
      .then(() => {
        setSavedArticles((prev) =>
          prev.filter((article) => article._id !== articleToRemove._id)
        );
      })
      .catch((err) => console.error("Failed to remove articles:", err));
  };

  // const handleRemoveArticle = (newsItem) => {
  //   const isArticleSaved = savedArticles.some((article) => {
  //     return article.link === newsItem.link;
  //   });
  //   const articleToRemove = isArticleSaved
  //     ? savedArticles.find((article) => {
  //         return article.link === newsItem.link;
  //       })
  //     : undefined;
  //   removeArticle(articleToRemove._id)
  //     .then(() => {
  //       setSavedArticles(
  //         savedArticles.filter((article) => {
  //           return article.link !== newsItem.link;
  //         })
  //       );
  //     })
  //     .catch((err) => console.error(err));
  // };

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

  // useEffect(() => {
  //   if (!jwt) {
  //     const savedUser = localStorage.getItem("currentUser");
  //     if (savedUser) {
  //       setCurrentUser(JSON.parse(savedUser));
  //       setIsLoggedIn(true);
  //     } else {
  //       setCurrentUser(null);
  //       setIsLoggedIn(false);
  //     }
  //     return;
  //   }

  //   setIsLoading(true);

  //   Promise.all([getUserInfo(jwt), getSavedArticles({ token: jwt })])
  //     .then(([userInfo, savedArticles]) => {
  //       setCurrentUser(userInfo);
  //       setIsLoggedIn(true);
  //       setSavedArticles(savedArticles);
  //     })
  //     .catch(console.error)
  //     .finally(() => setIsLoading(false));
  // }, [jwt]);

  useEffect(() => {
    const storedToken = token.getToken();

    if (!storedToken) {
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    }

    setJwt(storedToken);
    setIsLoading(true);

    Promise.all([
      getUserInfo(storedToken),
      getSavedArticles({ token: storedToken }),
    ])
      .then(([userInfo, savedArticles]) => {
        setCurrentUser(userInfo);
        setIsLoggedIn(true);
        setSavedArticles(savedArticles);

        const lastPath = localStorage.getItem("lastVisitedPath");
        if (lastPath) navigate(lastPath);
      })
      .catch((err) => {
        console.error("Session restore failed:", err);
        setCurrentUser(null);
        setIsLoggedIn(false);
        token.removeToken();
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("lastVisitedPath", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setQuery("");
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [location.pathname]);

  return (
    <SavedNewsContext.Provider value={{ savedArticles, setSavedArticles }}>
      <div className="page">
        <div className="page__content">
          <header className="header-search__container">
            {/* {location.pathname === "/" && (
                <Header
                  handleLoginModal={handleLoginModal}
                  handleLogOut={handleLogOut}
                  handleArticleSearch={handleArticleSearch}
                  debounceFetch={debounceFetch}
                  query={query}
                  setQuery={setQuery}
                  onSubmit={handleArticleSearch}
                  setSearchResults={setSearchResults}
                  setIsSearching={setIsSearching}
                />
              )} */}
            <Header
              handleLoginModal={handleLoginModal}
              handleLogOut={handleLogOut}
              // handleArticleSearch={handleArticleSearch}
              setSearchResults={setSearchResults}
              setQuery={setQuery}
            />

            {location.pathname === "/" && (
              <SearchForm
                onSubmit={handleArticleSearch}
                debounceFetch={debounceFetch}
                query={query}
                setQuery={setQuery}
                setSearchResults={setSearchResults}
                setIsSearching={setIsSearching}
              />
            )}
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
            handleRegister={handleRegister}
          />
        </div>
      </div>
    </SavedNewsContext.Provider>
  );
}

export default App;
