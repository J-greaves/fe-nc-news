import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { BurgerMenu } from "./components/BurgerMenu";
import { Home } from "./components/Home";
import "./App.css";
import { ArticlePage } from "./components/ArticlePage";

function App() {
  return (
    <div className="app">
      <BurgerMenu />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:articleId" element={<ArticlePage />} />
      </Routes>
    </div>
  );
}

export default App;
