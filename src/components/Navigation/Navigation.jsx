import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ handleLoginModal }) {
  return (
    <div className="navigation">
      <Link to="/" className="navigation__links">
        <p className="navigation__logo">NewsExplorer</p>
      </Link>
      <div className="navigation__user-container">
        <Link to="/" className="navigation__links">
          <p className="navigation__home">Home</p>
        </Link>
        {/* Below line is what a logged in user will see - will tackle in the next stage */}
        {/* <p className="navigation__saved">Saved articles</p> */}
        <button onClick={handleLoginModal} className="navigation__signin">
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Navigation;
