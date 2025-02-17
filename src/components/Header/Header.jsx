import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="header__logo">NewsExplorer</h1>
      <div className="header__user-container">
        <p className="header__home">Home</p>
        <button className="header__signin">Sign in</button>
      </div>
    </header>
  );
}

export default Header;
