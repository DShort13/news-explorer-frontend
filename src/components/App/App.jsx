import { Routes, Route } from "react-router-dom";

import { useState } from "react";

import "./App.css";
import Footer from "../Footer/Footer";
import Main from "../Main/Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import { defaultNewsArticles } from "../../utils/defaultNewsArticles";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const handleLoginmodal = () => {
    setActiveModal("login");
  };

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
      <div>
        <LoginModal isOpen={activeModal === "login"} />
      </div>
    </div>
  );
}

export default App;
