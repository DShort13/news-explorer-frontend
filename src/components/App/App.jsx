import { Routes, Route } from "react-router-dom";

import { useState } from "react";

import "./App.css";
import Footer from "../Footer/Footer";
import Main from "../Main/Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import { defaultNewsArticles } from "../../utils/defaultNewsArticles";
import RegisterModal from "../RegisterModal/RegisterModal";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                defaultNewsArticles={defaultNewsArticles}
                handleLoginModal={handleLoginModal}
              />
            }
          />
          <Route
            path="/saved-news"
            element={<SavedNews defaultNewsArticles={defaultNewsArticles} />}
          />
        </Routes>
        <Footer />
      </div>
      <div>
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          handleRegisterModal={handleRegisterModal}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          handleLoginModal={handleLoginModal}
        />
      </div>
    </div>
  );
}

export default App;
