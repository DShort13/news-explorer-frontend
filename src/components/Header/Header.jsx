import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header() {
  return (
    <header className="header__container">
      <div className="header">
        <p className="header__logo">NewsExplorer</p>
        <div className="header__user-container">
          <p className="header__home">Home</p>
          <button className="header__signin">Sign in</button>
        </div>
      </div>
      <div className="navigation__container">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
