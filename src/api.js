import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-api-jg.onrender.com/api",
});

export const getArticles = (
  sort_by,
  order,
  topic = null,
  pageSize = 10,
  page = 1
) => {
  let route = `/articles?sort_by=${sort_by}&order=${order}&limit=${pageSize}&p=${page}`;
  if (topic) {
    route += `&topic=${topic}`;
  }
  return ncNews
    .get(route)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
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
      return data;
    });
};

export const deleteCommentById = (commentId) => {
  return ncNews
    .delete(`/comments/${commentId}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getArticlesById = (articleId) => {
  return ncNews.get(`articles/${articleId}`).then(({ data }) => {
    return data;
  });
};

export const getArticleComments = (articleId) => {
  return ncNews
    .get(`articles/${articleId}/comments`)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      throw error;
    });
};
