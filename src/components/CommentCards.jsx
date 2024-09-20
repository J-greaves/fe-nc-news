import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { UserContext } from "./UserContext";

export const CommentCards = ({ comment, users, handleDeleteComment }) => {
  const { loggedInUser } = useContext(UserContext);

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
        flexDirection: "column",
        mb: 2,
        width: "100%",
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 10,
        },
      }}
    >
      <CardContent sx={{ padding: "1rem" }}>
        {/* Username and Date Heading */}
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {comment.author + " @ " + new Date(comment.created_at).toDateString()}
        </Typography>

        {/* Comment Body */}
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ marginBottom: "1rem", fontSize: "16px" }}
        >
          {comment.body}
        </Typography>

        {/* Footer with Avatar, Submitted By, Likes, Delete */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* Avatar Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexBasis: "25%",
              justifyContent: "center",
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
          </Box>

          {/* Submitted By Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexBasis: "25%",
            }}
          >
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

          {/* Likes Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexBasis: "25%",
              justifyContent: "center",
            }}
          >
            <img
              src="src/assets/like.png"
              alt="Like comment button"
              style={{ width: 50, height: 50 }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "large",
                fontWeight: "400",
                marginLeft: "1rem",
              }}
            >
              Likes: {comment.votes}
            </Typography>
          </Box>

          {/* Conditional delete button for logged in user */}
          {loggedInUser && loggedInUser.username === comment.author && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexBasis: "25%",
                justifyContent: "center",
              }}
            >
              <img
                src="src/assets/delete.png"
                alt="Delete comment button"
                style={{
                  width: 50,
                  height: 50,
                  cursor: "pointer",
                  border: "black solid 3px",
                  borderRadius: "50%",
                }}
                onClick={() => handleDeleteComment(comment.comment_id)}
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
