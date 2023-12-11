const Redis = require("redis");
const redisClient = Redis.createClient(); // initiated redis client
const express = require("express");
const Json = require("./config.json");

const app = express();
redisClient.connect(); // connect
module.exports = { redisClient }; // exporting to use it in any other files
const { setOrGetCache } = require("./cacheHelper"); // if cache found return else set

app.use(express.json());

let help = async (req, cb) => {
  try {
    let data = await cb(req);
    return [data, null];
  } catch (err) {
    console.log(err);
    return [null, err];
  }
};

app.get("/photos", async (req, res) => {
  let cb = async (req) => {
    const getPhotos = async () => {
      let photos = await fetch(`${Json.URL}`);
      return await photos.json();
    };

    const photos = await setOrGetCache("photos", getPhotos);
    return photos;
  };

  let [data, err] = await help(req, cb);

  if (err) res.sendStatus(500);

  return res.json(data);
});

app.get("/photos/:albumId", async (req, res) => {
  let cb = async (req) => {
    const { albumId } = req.params;
    const getAlbumPhotos = async () => {
      let photos = await fetch(`${Json.URL}?albumId=${albumId}`);
      return await photos.json();
    };
    const photos = await setOrGetCache(
      `photos?albumId=${albumId}`,
      getAlbumPhotos
    );
    return photos;
  };

  let [data, err] = await help(req, cb);
  if (err) res.sendStatus(500);
  return res.json(data);
});

app.get("/photo/:id", async (req, res) => {
  let cb = async (req) => {
    const { id } = req.params;

    const getPhoto = async () => {
      let photo = await fetch(`${Json.URL}/${id}`);
      return await photo.json();
    };
    const photo = await setOrGetCache(`photos:${id}`, getPhoto);
    return photo;
  };

  let [data, err] = await help(req, cb);
  if (err) res.sendStatus(500);
  return res.json(data);
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
