import { useParams } from "react-router-dom";
import { getArticleComments, getArticlesById, patchArticleVotes } from "../api";
import { useState, useEffect, useContext } from "react";
import { CommentCards } from "./CommentCards";
import { Grid2, Container } from "@mui/material";
import { UserContext } from "./UserContext";
import { postCommentToArticleById, deleteCommentById } from "../api";
import "./articlepage.css";
import like from "../assets/like.png";

export const ArticlePage = ({ users }) => {
  const { loggedInUser } = useContext(UserContext);
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deletedCommentId, setDeletedCommentId] = useState(null);
  const [deletionMessage, setDeletionMessage] = useState("");

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

  const handleCommentChange = (event) => setCommentInput(event.target.value);

  function handleSubmit(event) {
    event.preventDefault();
    if (!loggedInUser) {
      setErrorMessage("You must be logged in to post a comment.");
      return;
    } else {
      const newComment = {
        username: loggedInUser.username,
        body: commentInput,
      };
      const articleId = article.article_id;
      const optimisticComment = {
        ...newComment,
        comment_id: Date.now(),
        created_at: Date.now(),
        votes: 0,
        author: loggedInUser.username,
        commentAuthorImg: loggedInUser.avatar_url,
      };
      setComments((prevComments) => [optimisticComment, ...prevComments]);
      setCommentInput("");
      setErrorMessage("");
      postCommentToArticleById(articleId, newComment)
        .then(({ comment }) => {
          setComments((prevComments) =>
            prevComments.map((c) =>
              c.comment_id === optimisticComment.comment_id ? comment : c
            )
          );

          setErrorMessage("Comment posted successfully!");
        })
        .catch(() => {
          setComments((prevComments) =>
            prevComments.filter(
              (c) => c.comment_id !== optimisticComment.comment_id
            )
          );
          setErrorMessage("Failed to post comment. Please try again.");
        });
    }
  }

  function handleDeleteComment(comment_id) {
    const commentToDelete = comments.find(
      (comment) => comment.comment_id === comment_id
    );

    if (commentToDelete) {
      const updatedComments = comments.filter(
        (comment) => comment.comment_id !== comment_id
      );
      setComments(updatedComments);

      deleteCommentById(comment_id)
        .then(() => {
          setDeletionMessage("Comment Successfully Deleted");
        })
        .catch((error) => {
          console.log(error);
          setComments((prevComments) => [commentToDelete, ...prevComments]);
          setDeletionMessage("Failed to delete comment.");
        })
        .finally(() => {
          setTimeout(() => {
            setDeletionMessage("");
            setDeletedCommentId(null);
          }, 3000);
        });
    }
  }

  useEffect(() => {
    getArticlesById(articleId)
      .then(({ article }) => {
        setArticle(article);
        setVotes(article.votes);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // Set the error message to display
        setErrorMessage(error.response?.data?.msg || "Failed to load article.");
      });
  }, [articleId]);

  useEffect(() => {
    getArticleComments(articleId)
      .then(({ comments }) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // Set the error message to display
        setErrorMessage(
          error.response?.data?.msg || "Failed to load comments."
        );
      });
  }, [articleId]);

  if (loading) {
    return <p className="loading-info">Loading...</p>;
  }

  if (errorMessage) {
    return (
      <p
        className="error-message"
        style={{ color: "red", textAlign: "center" }}
      >
        {errorMessage}
      </p>
    );
  }

  const articleImage = article.article_img_url;
  const articleTitle = article.title;
  const articleAuthor = article.author;
  const articleTopic = article.topic;
  const articleCreatedAt = article.created_at;
  const articleBody = article.body;
  const commentId = comment.comment_id;

  return (
    <article className="flexbox-container">
      <section className="flexbox-row">
        <img className="article-image" src={articleImage} />
        <div className="article-details">
          <h1 className="article-title">{articleTitle}</h1>
          <div className="details-likes">
            <div className="details-section">
              <h2 className="article-detail">Author: {articleAuthor}</h2>
              <h2 className="article-detail">
                Topic:{" "}
                {articleTopic.charAt(0).toUpperCase() + articleTopic.slice(1)}
              </h2>
              <h2 className="article-detail">
                Date Submitted: {new Date(articleCreatedAt).toDateString()}
              </h2>
            </div>
            <div className="article-likes">
              <h2 className="article-detail-likes">Likes: {votes}</h2>
              <img
                onClick={handleVote}
                className={hasVoted ? "like-button liked" : "like-button"}
                src={like}
                alt="Like button, press to like article, press again to unlike"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="article-body">
        <p>{articleBody}</p>
      </section>
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
        <h2
          style={{ textAlign: "center", width: "100%", fontSize: "xx-large" }}
        >
          Comments:
        </h2>
        <Grid2
          container
          spacing={2}
          justifyContent="center"
          sx={{ width: "100%", margin: 0 }}
        >
          {deletionMessage ? (
            <p
              style={{
                fontSize: "xx-large",
                border: "black solid 5px",
                backgroundColor:
                  deletionMessage === "Failed to delete comment."
                    ? "rgba(255, 27, 27, 0.3)"
                    : "rgba(0, 255, 79, 0.2)",
                color: "black",
                padding: "1rem",
                textAlign: "center",
                borderRadius: "20px",
              }}
            >
              {deletionMessage}
              <br />
              Reloading...
            </p>
          ) : (
            comments.map((comment) => (
              <Grid2 item xs={12} key={commentId} sx={{ width: "100%" }}>
                <CommentCards
                  comment={comment}
                  users={users}
                  handleDeleteComment={handleDeleteComment}
                  deletionMessage={deletionMessage}
                />
              </Grid2>
            ))
          )}
        </Grid2>
      </Container>
      <form for="comments" onSubmit={handleSubmit}>
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: "xx-large",
            marginBottom: "0",
          }}
        >
          Post a comment:
        </h2>
        <textarea
          value={commentInput}
          onChange={(event) => {
            setErrorMessage("");
            handleCommentChange(event);
          }}
          placeholder="Type your comment here..."
          required
        ></textarea>
        {errorMessage ? (
          <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </article>
  );
};
