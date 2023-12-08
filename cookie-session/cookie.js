const express = require("express");
var cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser("dev"));

// cookies set
app.get("/set", async (req, res) => {
  try {
    res.cookie(
      "name",
      { first: "devdutt", last: "chudasama" },
      {
        httpOnly: true,
        secure: false,
        sameSite: true,
        signed: true,
        // expires: new Date() + 999000,
        // maxAge: 9999,
        // domain: "localhost:3000",
        // path: "/set",
      }
    );
    res.cookie("age", 12);
    res.send("cookie set");
  } catch (err) {
    console.log("🚀 ~ file: app.js:12 ~ app.get ~ err:", err);
  }
});

// get all cookies
app.get("/get", async (req, res) => {
  try {
    const cookies = req.cookies;
    res.send(cookies);
  } catch (err) {
    console.log("🚀 ~ file: app.js:22 ~ app.get ~ err:", err);
  }
});

// delete cookie
app.get("/del", async (req, res) => {
  try {
    res.clearCookie("name");
    res.send("cookies deleted");
  } catch (err) {
    console.log("🚀 ~ file: app.js:43 ~ app.get ~ err:", err);
  }
});

app.listen(3000, (err, data) => {
  if (err) console.log("🚀 ~ file: app.js:48 ~ app.listen ~ err:", err);
  console.log("running on 3000");
});
