import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Navigation.css";
import close from "../../assets/close.svg";

function Navigation({
  handleLoginModal,
  handleLogOut,
  setSearchResults,
  setIsSearching,
  setQuery,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const savedNewsPage = location.pathname.includes("/saved-news");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate("/");
    if (setSearchResults) setSearchResults([]);
    if (setIsSearching) setIsSearching(false);
    if (setQuery) setQuery("");
  };

  const handleSavedNews = () => {
    navigate("/saved-news");
  };

  return (
    <div className={`navigation ${savedNewsPage ? "black" : ""}`}>
      {/* Logo */}
      <p
        className={`${isMobileMenuOpen ? "navigation__mobile-logo" : "navigation__logo"} ${savedNewsPage ? "font-black" : ""}`}
        onClick={handleHomeClick}
      >
        NewsExplorer
      </p>

      {/* Hamburger button (only when menu is closed) */}
      {!isMobileMenuOpen && (
        <button
          className={`navigation__mobile-menu ${
            currentUser && savedNewsPage ? "black" : ""
          }`}
          onClick={toggleMobileMenu}
        ></button>
      )}

      {/* Overlay (dark background behind mobile nav) */}
      {isMobileMenuOpen && (
        <div className="navigation__overlay" onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Nav */}
      <nav className={`navigation__nav ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="navigation__nav-header-wrapper">
          <div className="navigation__nav-header">
            <p
              className={`navigation__mobile-logo ${
                savedNewsPage ? "font-black" : ""
              }`}
              onClick={handleHomeClick}
            >
              NewsExplorer
            </p>
            <button className="navigation__close-btn" onClick={closeMobileMenu}>
              <img
                className="navigation__close-btn_image"
                src={close}
                alt="close"
              />
            </button>
          </div>
        </div>

        <div className="navigation__nav-inner">
          <div className="navigation__user-container">
            {/* Home Link */}
            <p
              className={`navigation__home navigation__links ${
                savedNewsPage ? "font-black" : ""
              }`}
              onClick={handleHomeClick}
            >
              Home
            </p>

            {/* When logged in */}
            {currentUser ? (
              <div className="navigation__logged-in_control">
                <p
                  className={`navigation__saved ${
                    savedNewsPage ? "font-black" : ""
                  }`}
                  onClick={handleSavedNews}
                >
                  Saved articles
                </p>
                <div
                  className={`navigation__username ${
                    savedNewsPage ? "font-black" : ""
                  }`}
                >
                  {currentUser.username}
                  <button
                    onClick={handleLogOut}
                    type="button"
                    className={`navigation__logout ${
                      savedNewsPage ? "logout-black" : "logout-white"
                    }`}
                  ></button>
                </div>
              </div>
            ) : (
              // When logged out
              <button
                onClick={handleLoginModal}
                className={`navigation__signin ${
                  isMobileMenuOpen ? "navigation__signin-mobile" : ""
                } ${savedNewsPage ? "font-black" : ""}`}
                type="button"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
