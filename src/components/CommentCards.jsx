import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

export const CommentCards = ({ comment, users }) => {
  let commentAuthorImg = null;

  users.forEach((user) => {
    if (comment.author === user.username) {
      commentAuthorImg = user.avatar_url;
    }
  });

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
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              fontSize: "25px",
              fontWeight: "bolder",
              flexGrow: 1,
              padding: "1rem",
            }}
          >
            {comment.author +
              " @ " +
              new Date(comment.created_at).toDateString()}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ width: "100vw%", marginRight: "1rem" }}
          >
            {comment.body}
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
            <Link to={`/${comment.article_id}`}>
              <Avatar
                alt="Comment author avatar image"
                src={commentAuthorImg}
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
                {comment.author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(comment.created_at).toDateString()}
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
                src="src/assets/like.png"
                alt="Like"
                style={{ width: 50, height: 50 }}
              />
              <Typography variant="subtitle2">
                Likes: {comment.votes}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
