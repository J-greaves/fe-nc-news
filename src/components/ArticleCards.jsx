import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

export const ArticleCards = ({ article, users }) => {
  let articleAuthorImg = null;

  users.forEach((user) => {
    if (article.author === user.username) {
      articleAuthorImg = user.avatar_url;
    }
  });

  console.log(article);

  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 10,
        },
      }}
    >
      {/* Thumbnail */}
      <CardMedia
        component="img"
        sx={{
          width: { sm: "50%", xs: "100%" },
          height: { xs: 200, sm: "auto" },
        }}
        image={article.article_img_url}
        alt={article.title}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          {/* Title */}
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              fontSize: "30px",
              fontWeight: "bolder",
              flexGrow: 1,
              padding: "1rem",
            }}
          >
            {article.title.length > 50
              ? article.title.slice(0, 50) + "..."
              : article.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ width: "100%" }}
          >
            {article.description}
          </Typography>

          {/* Author and Date */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Avatar
              alt={article.author}
              src={articleAuthorImg}
              sx={{
                width: 96,
                height: 96,
                border: "black solid 2px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Submitted by:
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "large", color: "black" }}
              >
                {article.author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(article.created_at).toDateString()}
              </Typography>
            </Box>

            {/* Likes */}
            <Box
              sx={{
                ml: { xs: "auto", sm: 4 },
                mt: { xs: 2, sm: 0 },
                textAlign: "center",
                flexGrow: 1,
              }}
            >
              <img
                src="src/assets/like.png"
                alt="Like"
                style={{ width: 50, height: 50 }}
              />
              <Typography variant="subtitle2">
                Likes: {article.votes}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
