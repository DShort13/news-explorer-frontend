import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

function Header({
  handleLoginModal,
  handleLogOut,
  setQuery,
  setSearchResults,
  setIsSearching,
}) {

  return (
    <header className="header__container">
      <div className="navigation__container">
        <Navigation
          handleLoginModal={handleLoginModal}
          handleLogOut={handleLogOut}
          setSearchResults={setSearchResults}
          setIsSearching={setIsSearching}
          setQuery={setQuery}
        />
      </div>
    </header>
  );
}

export default Header;
