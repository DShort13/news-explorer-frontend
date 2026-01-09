import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({
  handleLoginModal,
  handleLogOut,
  setQuery,
  setSearchResults,
  setIsSearching,
}) {

  return (
    <header className="header">
      <div className="navigation__nav-wrapper">
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
