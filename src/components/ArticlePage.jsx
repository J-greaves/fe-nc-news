import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { useState, useEffect } from "react";
import "./articlepage.css";
export const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(articleId)
      .then(({ article }) => {
        console.log(article);
        setArticle(article);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setLoading(false);
      });
  }, [articleId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!article) {
    return <p>Article not found!</p>;
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
              <h2 className="article-detail-likes">Likes: {article.votes}</h2>
              <img src="src/assets/like.png" />
            </div>
          </div>
        </div>
      </section>
      <section className="article-body">
        <p>{article.body}</p>
      </section>
    </article>
  );
};
