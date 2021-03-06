require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");

app.get("/api/photos", async (req, res) => {
  const params = {
    params: {
      page: req.query.page,
      client_id: process.env.UNSPLASH_KEY,
      per_page: 30,
      query: req.query.query
    }
  };

  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos`,
      params
    );

    res.send(response.data);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("photo_montage/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "photo_montage", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
