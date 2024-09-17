import React, { useEffect, useState } from "react";
import { ArticleCards } from "./ArticleCards";
import { Grid2, Container } from "@mui/material";
import { getArticles } from "../api";
import { getUsers } from "../api";
import "../App.css";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getArticles().then(({ articles }) => {
      setArticles(articles);
    });
  }, []);

  useEffect(() => {
    getUsers().then(({ users }) => {
      console.log(users);

      setUsers(users);
    });
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 !important",
      }}
    >
      <h2 style={{ textAlign: "center", width: "100%" }}>Latest News</h2>
      <Grid2
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "100%", margin: 0 }}
      >
        {articles.map((article, index) => (
          <Grid2 item xs={12} key={index} sx={{ width: "100%" }}>
            <ArticleCards article={article} users={users} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};
