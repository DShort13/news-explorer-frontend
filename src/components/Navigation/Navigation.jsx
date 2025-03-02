import "./Navigation.css";

function Navigation({ handleLoginModal }) {
  return (
    <div className="navigation">
      <p className="navigation__logo">NewsExplorer</p>
      <div className="navigation__user-container">
        <p className="navigation__home">Home</p>
        <p className="navigation__saved">Saved articles</p>
        <button onClick={handleLoginModal} className="navigation__signin">
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Navigation;
