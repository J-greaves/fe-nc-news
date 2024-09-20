import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { BurgerMenu } from "./components/BurgerMenu";
import { Home } from "./components/Home";
import { NotFoundPage } from "./components/NotFoundPage";
import "./App.css";
import { ArticlePage } from "./components/ArticlePage";
import { useState, useEffect } from "react";
import { UserProvider } from "./components/UserContext";
import { UserPage } from "./components/UserPage";
import { getUsers } from "./api";

function App() {
  const [votes, setVotes] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(({ users }) => {
      setUsers(users);
    });
  }, []);
  return (
    <UserProvider>
      <div className="app">
        <BurgerMenu />
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home votes={votes} setVotes={setVotes} users={users} />}
          />
          <Route
            path="/articles/:articleId"
            element={
              <ArticlePage votes={votes} setVotes={setVotes} users={users} />
            }
          />
          <Route
            path="/signin"
            element={<UserPage users={users} setusers={setUsers} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
