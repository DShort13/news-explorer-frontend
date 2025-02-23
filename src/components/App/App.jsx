import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import About from "../About/About";
import Footer from "../Footer/Footer";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default App;
