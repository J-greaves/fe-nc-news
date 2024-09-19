import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-api-jg.onrender.com/api",
});

export const getArticles = (articleId, getComments) => {
  let route = `/articles`;
  if (articleId) {
    route += `/${articleId}`;
  }
  if (getComments) {
    route += `/comments`;
  }
  return ncNews
    .get(route)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUsers = () => {
  return ncNews.get("/users").then(({ data }) => {
    return data;
  });
};

export const patchArticleVotes = (articleId, vote_inc) => {
  return ncNews.patch(`/articles/${articleId}`, vote_inc).then(({ data }) => {
    return data;
  });
};

export const postCommentToArticleById = (articleId, newComment) => {
  return ncNews
    .post(`/articles/${articleId}/comments`, newComment)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
