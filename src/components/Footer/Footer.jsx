import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright"> © 2025 Supersite, Powered by API</p>
      <div className="footer__links">
        <p className="footer__home">Home</p>
        <p className="footer__tripleten">TripleTen</p>
        <div className="footer__links-social">
          <p className="footer__temp1">pic 1</p>
          <p className="footer__temp2">pic 2</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
