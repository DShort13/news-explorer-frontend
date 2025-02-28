import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main/Main";
import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
