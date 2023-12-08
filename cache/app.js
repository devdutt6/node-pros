const Redis = require("redis");
const redisClient = Redis.createClient();
const express = require("express");
const Json = require("./config.json");

const app = express();
redisClient.connect();
module.exports = { redisClient };
const { setOrGetCache } = require("./cacheHelper");

app.use(express.json());

app.get("/photos", async (req, res) => {
  try {
    const getPhotos = async () => {
      let photos = await fetch(`${Json.URL}`);
      return await photos.json();
    };

    const photos = await setOrGetCache("photos", getPhotos);
    res.json(photos);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
app.get("/photos/:albumId", async (req, res) => {
  try {
    const { albumId } = req.params;
    const getAlbumPhotos = async () => {
      let photos = await fetch(`${Json.URL}?albumId=${albumId}`);
      return await photos.json();
    };
    const photos = await setOrGetCache(
      `photos?albumId=${albumId}`,
      getAlbumPhotos
    );

    res.json(photos);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
app.get("/photo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getPhoto = async () => {
      let photo = await fetch(`${Json.URL}/${id}`);
      return await photo.json();
    };
    const photo = await setOrGetCache(`photos:${id}`, getPhoto);
    res.json(photo);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(Json.PORT, (err, data) => {
  console.log("up");
});

const shutDown = async () => {
  try {
    await redisClient.disconnect();
  } catch (err) {}
};

process.on("SIGTERM" || "SIGINT", shutDown);
//
