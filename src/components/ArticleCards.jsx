import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { patchArticleVotes } from "../api";

export const ArticleCards = ({ article, users }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(article.votes);

  let articleAuthorImg = null;
  users.forEach((user) => {
    if (article.author === user.username) {
      articleAuthorImg = user.avatar_url;
    }
  });

  function handleVote() {
    const plus_vote = { inc_votes: 1 };
    const minus_vote = { inc_votes: -1 };
    const articleId = article.article_id;

    const newVotes = hasVoted ? votes - 1 : votes + 1;
    setVotes(newVotes);
    setHasVoted(!hasVoted);

    const voteChange = hasVoted ? minus_vote : plus_vote;

    patchArticleVotes(articleId, voteChange)
      .then(({ article }) => {
        setVotes(article.votes);
      })
      .catch((error) => {
        setVotes(votes);
        setHasVoted(hasVoted);
      });
  }

  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 10,
        },
      }}
    >
      {/* Thumbnail */}
      <Link to={`/articles/${article.article_id}`}>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          image={article.article_img_url}
          alt={article.title}
        />
      </Link>

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          {/* Title */}
          <Link to={`/articles/${article.article_id}`}>
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{
                fontSize: "30px",
                fontWeight: "bolder",
                flexGrow: 1,
                padding: "1rem",
                color: "black",
              }}
            >
              {article.title.length > 50
                ? article.title.slice(0, 50) + "..."
                : article.title}
            </Typography>
          </Link>
          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ width: "100%" }}
          >
            {article.description}
          </Typography>

          {/* Author and Date */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Link to={`/signin`}>
              <Avatar
                alt={article.author}
                src={articleAuthorImg}
                sx={{
                  width: 96,
                  height: 96,
                  border: "black solid 2px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
                }}
              />
            </Link>
            <Box sx={{ ml: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Submitted by:
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "large", color: "black" }}
              >
                {article.author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(article.created_at).toDateString()}
              </Typography>
            </Box>

            {/* Likes */}
            <Box
              sx={{
                ml: { xs: "auto", sm: 4 },
                mt: { xs: 2, sm: 0 },
                textAlign: "center",
                flexGrow: 1,
              }}
            >
              <img
                onClick={handleVote}
                className={hasVoted ? "like-button liked" : "like-button"}
                src="src/assets/like.png"
                alt="Like button, press to like article, press again to unlike"
              />

              <Typography
                sx={{
                  fontSize: "large",
                  fontWeight: "550",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                Likes: {votes}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
