import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

function Header({ handleLoginModal, handleArticleSearch }) {
  return (
    <header className="header__container">
      <div className="navigation__container">
        <Navigation handleLoginModal={handleLoginModal} />
      </div>
      <div className="search__container">
        <SearchForm onSubmit={handleArticleSearch} />
      </div>
    </header>
  );
}

export default Header;
