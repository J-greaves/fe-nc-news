import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { BurgerMenu } from "./components/BurgerMenu";
import { Home } from "./components/Home";
import "./App.css";
import { ArticlePage } from "./components/ArticlePage";
import { useState } from "react";

function App() {
  const [votes, setVotes] = useState(0);
  return (
    <div className="app">
      <BurgerMenu />
      <Header />
      <Routes>
        <Route path="/" element={<Home votes={votes} setVotes={setVotes} />} />
        <Route
          path="/:articleId"
          element={<ArticlePage votes={votes} setVotes={setVotes} />}
        />
      </Routes>
    </div>
  );
}

export default App;
