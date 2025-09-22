import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../assets/icons/github.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright"> © 2025 Supersite, Powered by API</p>
      <div className="footer__links">
        <div className="footer__text-group">
          <Link to="/" className="navigation__links">
            <p className="footer__home">Home</p>
          </Link>
          <a href="https://tripleten.com/" className="footer__social-link">
            <p className="footer__tripleten">TripleTen</p>
          </a>
        </div>
        <a href="https://github.com/DShort13">
          <img className="footer__github" src={githubIcon} alt="GitHub link" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
