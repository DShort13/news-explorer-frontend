import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Navigation.css";

function Navigation({
  handleLoginModal,
  handleLogOut,
  setSearchResults,
  setIsSearching,
  setQuery,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  // const location = useLocation();

  // const savedNewsPage = location.pathname.includes("/saved-news");

  const handleHomeClick = () => {
    setSearchResults([]);
    setIsSearching(false);
    setQuery("");
    navigate("/");
  };

  const handleSavedNews = () => {
    navigate("/saved-news");
  };

  return (
    <div className="navigation">
      <p
        className="navigation__logo navigation__links"
        onClick={handleHomeClick}
      >
        NewsExplorer
      </p>
      <div className="navigation__user-container">
        <p
          className="navigation__home navigation__links"
          onClick={handleHomeClick}
        >
          Home
        </p>
        {currentUser && (
          <div>
            <button
              className="navigation__saved"
              type="button"
              onClick={handleSavedNews}
            >
              Saved articles
            </button>
            {currentUser.username}
            <button onClick={handleLogOut}></button>
          </div>
        )}
        {!currentUser && (
          <button
            onClick={handleLoginModal}
            className="navigation__signin"
            type="button"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}

export default Navigation;
