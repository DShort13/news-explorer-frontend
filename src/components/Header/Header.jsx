import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

function Header({
  handleLoginModal,
  handleLogOut,
  handleArticleSearch,
  debounceFetch,
  query,
  setQuery,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header__container">
      <div className="navigation__container">
        <Navigation
          handleLoginModal={handleLoginModal}
          handleLogOut={handleLogOut}
        />
        {currentUser && (
          <div>Welcome, {currentUser.username || currentUser.email}</div>
        )}
      </div>
      <div className="search__container">
        <SearchForm
          onSubmit={handleArticleSearch}
          debounceFetch={debounceFetch}
          query={query}
          setQuery={setQuery}
        />
      </div>
    </header>
  );
}

export default Header;
