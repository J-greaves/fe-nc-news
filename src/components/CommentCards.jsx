import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { UserContext } from "./UserContext";
import like from "../assets/like.png";
import deleteImg from "../assets/delete.png";
import { patchCommentVotes } from "../api";

export const CommentCards = ({ comment, users, handleDeleteComment }) => {
  const { loggedInUser } = useContext(UserContext);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(comment.votes);

  let commentAuthorImg = null;
  users.forEach((user) => {
    if (comment.author === user.username) {
      commentAuthorImg = user.avatar_url;
    }
  });

  function handleLikeComment() {
    const plus_vote = { inc_votes: 1 };
    const minus_vote = { inc_votes: -1 };
    const commentId = comment.comment_id;

    const newVotes = hasVoted ? votes - 1 : votes + 1;
    setVotes(newVotes);
    setHasVoted(!hasVoted);

    const voteChange = hasVoted ? minus_vote : plus_vote;

    patchCommentVotes(commentId, voteChange)
      .then(({ comment }) => {
        setVotes(comment.votes);
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
                  width: "18vw",
                  maxWidth: "100px",
                  height: "20vw",
                  maxHeight: "120px",
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
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Submitted by:
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "medium", color: "black" }}
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
              flexDirection: "column",
              alignItems: "center",
              flexBasis: "25%",
              justifyContent: "center",
            }}
          >
            <img
              src={like}
              className={hasVoted ? "like-button liked" : "like-button"}
              alt="Like comment button"
              style={{
                width: "11vw",
                height: "11vw",
                cursor: "pointer",
                maxHeight: "80px",
                maxWidth: "80px",
              }}
              onClick={() => handleLikeComment(comment.comment_id)}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "large",
                fontWeight: "400",
                marginLeft: "1rem",
              }}
            >
              Likes: {votes}
            </Typography>
            {loggedInUser && loggedInUser.username === comment.author && (
              <img
                src={deleteImg}
                alt="Delete comment button"
                style={{
                  width: "10vw",
                  height: "10vw",
                  cursor: "pointer",
                  maxHeight: "68px",
                  maxWidth: "68px",
                }}
                onClick={() => handleDeleteComment(comment.comment_id)}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
