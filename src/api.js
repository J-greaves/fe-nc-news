import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-api-jg.onrender.com/api",
});

export const getArticles = () => {
  return ncNews.get("/articles").then(({ data }) => {
    return data;
  });
};

export const getUsers = () => {
  return ncNews.get("/users").then(({ data }) => {
    return data;
  });
};

export const getArticleById = (articleId) => {
  return ncNews.get(`/articles/${articleId}`).then(({ data }) => {
    console.log(data);
    return data;
  });
};
