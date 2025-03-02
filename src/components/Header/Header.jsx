import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

function Header({ handleLoginModal }) {
  return (
    <header className="header__container">
      <div className="navigation__container">
        <Navigation handleLoginModal={handleLoginModal} />
      </div>
      <div className="search__container">
        <SearchForm />
      </div>
    </header>
  );
}

export default Header;
