const { redisClient } = require("./app");

exports.setOrGetCache = async (key, cb) => {
  try {
    const data = await redisClient.get(key);

    if (data !== null) {
      console.log("Cache HIT");
      return JSON.parse(data);
    }

    console.log("Cache MISS");
    let newData = await cb();
    redisClient.setEx(key, 3600, JSON.stringify(newData));
    return newData;
  } catch (err) {
    throw new Error(err);
  }
};
