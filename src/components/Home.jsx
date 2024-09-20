import React, { useEffect, useState } from "react";
import { ArticleCards } from "./ArticleCards";
import { Grid2, Container, Button, Box } from "@mui/material";
import { getArticles } from "../api";
import "../App.css";

export const Home = ({ votes, setVotes, users }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const articlesPerPage = 10;

  useEffect(() => {
    setLoading(true);
    getArticles("created_at", "desc", null, articlesPerPage, page)
      .then((data) => {
        setArticles(data.articles);
        setTotalCount(data.total_count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch articles:", error);
        setLoading(false);
      });
  }, [page]);

  const handleLoadMore = () => {
    if (articles.length < totalCount) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <p className="loading-info">Loading...</p>;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "50px",
        display: "flex",
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
            <ArticleCards
              article={article}
              users={users}
              votes={votes}
              setVotes={setVotes}
            />
          </Grid2>
        ))}
      </Grid2>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={handlePrevious}
          variant="contained"
          color="primary"
          disabled={page === 1}
          sx={{
            width: "300px",
            height: "auto",
            fontSize: "16px",
            padding: "10px",
            marginBottom: "2rem",
          }}
        >
          Previous
        </Button>
        <Button
          onClick={handleLoadMore}
          variant="contained"
          color="primary"
          disabled={articles.length < articlesPerPage}
          sx={{
            width: "300px",
            height: "auto",
            fontSize: "16px",
            padding: "10px",
            marginBottom: "2rem",
          }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};
