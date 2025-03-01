import { Routes, Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import Main from "../Main/Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import { defaultNewsArticles } from "../../utils/defaultNewsArticles";
import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={<Main defaultNewsArticles={defaultNewsArticles} />}
          />
          <Route
            path="/saved-news"
            element={<SavedNews defaultNewsArticles={defaultNewsArticles} />}
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
