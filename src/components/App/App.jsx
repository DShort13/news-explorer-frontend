import { useState } from "react";
import Header from "../Header/Header";
import About from "../About/About";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <About />
    </>
  );
}

export default App;
