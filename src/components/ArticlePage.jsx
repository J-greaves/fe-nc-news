import { useParams } from "react-router-dom";
import { getArticles, patchArticleVotes } from "../api";
import { useState, useEffect, useContext } from "react";
import { CommentCards } from "./CommentCards";
import { Grid2, Container } from "@mui/material";
import { UserContext } from "./UserContext";
import { postCommentToArticleById } from "../api";
import "./articlepage.css";

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

  function handleVote() {
    const plus_vote = { inc_votes: 1 };
    const minus_vote = { inc_votes: -1 };
    const articleId = article.article_id;
    if (hasVoted === false) {
      patchArticleVotes(articleId, plus_vote).then(({ article }) => {
        setHasVoted(true);
        setVotes(article.votes);
      });
    } else {
      patchArticleVotes(articleId, minus_vote).then(({ article }) => {
        setHasVoted(false);
        setVotes(article.votes);
      });
    }
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
      setComments((prevComments) => [...prevComments, optimisticComment]);
      setCommentInput("");
      setErrorMessage("");
      postCommentToArticleById(articleId, newComment)
        .then(({ comment }) => {
          setComments((prevComments) =>
            prevComments.map((c) =>
              c.comment_id === optimisticComment.comment_id ? comment : c
            )
          );
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

  useEffect(() => {
    getArticles(articleId)
      .then(({ article }) => {
        setArticle(article);
        setVotes(article.votes);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        return <p className="loading-info">{error}</p>;
      });
  }, [articleId]);

  useEffect(() => {
    getArticles(articleId, "getComments")
      .then(({ comments }) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        return <p className="loading-info">{error}</p>;
      });
  }, [articleId]);

  if (loading) {
    return <p className="loading-info">Loading...</p>;
  }

  if (!article) {
    return <p className="loading-info">Article not found!</p>;
  }

  return (
    <article className="flexbox-container">
      <section className="flexbox-row">
        <img className="article-image" src={article.article_img_url} />
        <div className="article-details">
          <h1 className="article-title">{article.title}</h1>
          <div className="details-likes">
            <div className="details-section">
              <h2 className="article-detail">Author: {article.author}</h2>
              <h2 className="article-detail">
                Topic:{" "}
                {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
              </h2>
              <h2 className="article-detail">
                Date Submitted: {new Date(article.created_at).toDateString()}
              </h2>
            </div>
            <div className="article-likes">
              <h2 className="article-detail-likes">Likes: {votes}</h2>
              <img
                onClick={handleVote}
                className={hasVoted ? "like-button liked" : "like-button"}
                src="src/assets/like.png"
                alt="Like button, press to like article, press again to unlike"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="article-body">
        <p>{article.body}</p>
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
          {comments.map((comment, index) => (
            <Grid2 item xs={12} key={index} sx={{ width: "100%" }}>
              <CommentCards
                comment={comment}
                users={users}
                votes={votes}
                setVotes={setVotes}
              />
            </Grid2>
          ))}
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
          <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p> // Display error message
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </article>
  );
};
