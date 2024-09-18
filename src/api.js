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
  return ncNews.get(route).then(({ data }) => {
    return data;
  });
};

export const getUsers = () => {
  return ncNews.get("/users").then(({ data }) => {
    return data;
  });
};
