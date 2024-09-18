import { useParams } from "react-router-dom";
import { getArticles, getUsers, patchArticleVotes } from "../api";
import { useState, useEffect } from "react";
import { CommentCards } from "./CommentCards";
import { Grid2, Container } from "@mui/material";
import "./articlepage.css";

export const ArticlePage = ({}) => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

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

  useEffect(() => {
    getUsers().then(({ users }) => {
      setUsers(users);
    });
  }, []);

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
    </article>
  );
};
