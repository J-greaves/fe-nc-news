import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { BurgerMenu } from "./components/BurgerMenu";
import { Home } from "./components/Home";
import "./App.css";

function App() {
  return (
    <div className="app">
      <BurgerMenu />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
