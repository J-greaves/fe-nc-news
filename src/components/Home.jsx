import React, { useEffect, useState } from "react";
import { ArticleCards } from "./ArticleCards";
import {
  Grid2,
  Container,
  Button,
  Box,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { getArticles } from "../api";
import { useSearchParams } from "react-router-dom";
import "../App.css";

export const Home = ({ votes, setVotes, users }) => {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const topicQuery = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const articlesPerPage = 10;

  useEffect(() => {
    setLoading(true);
    setError(null);
    getArticles(sort_by, order, topicQuery, articlesPerPage, page)
      .then((data) => {
        setArticles(data.articles);
        setTotalCount(data.total_count);
        setLoading(false);
      })
      .catch((error) => {
        setError(
          `Error ${error.response.status}: ${
            error.response.data.msg || "An error occurred."
          }`
        );
        setLoading(false);
      });
  }, [page, sort_by, order, topicQuery]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    const [newSortBy, newOrder] = value.split("-");
    setSearchParams({ sort_by: newSortBy, order: newOrder, page: 1 });
    setPage(1);
  };

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
      {error && (
        <Typography color="error" variant="h6" align="center">
          {error}
        </Typography>
      )}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
      >
        <Select
          value={`${sort_by}-${order}`}
          onChange={handleSortChange}
          sx={{ width: "200px" }}
        >
          <MenuItem value="created_at-asc">Date (Ascending)</MenuItem>
          <MenuItem value="created_at-desc">Date (Descending)</MenuItem>
          <MenuItem value="comment_count-asc">
            Comment Count (Ascending)
          </MenuItem>
          <MenuItem value="comment_count-desc">
            Comment Count (Descending)
          </MenuItem>
          <MenuItem value="votes-asc">Votes (Ascending)</MenuItem>
          <MenuItem value="votes-desc">Votes (Descending)</MenuItem>
        </Select>
      </Box>
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
