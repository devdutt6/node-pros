const app = require("express")();
const session = require("express-session");
// session init
app.use(
  session({
    secret: "donttellanyonethisshouldbemysecret",
    cookie: {
      sameSite: true,
    },
  })
);

app.get("/set", async (req, res) => {
  try {
    req.session.user = { first: "devdutt", last: "chudasama" };
    res.json(req.session);
  } catch (err) {
    console.log("🚀 ~ file: session.js:15 ~ app.get ~ err:", err);
  }
});
app.get("/get", async (req, res) => {
  try {
    res.json(req.session);
  } catch (err) {
    console.log("🚀 ~ file: session.js:15 ~ app.get ~ err:", err);
  }
});
app.get("/del", async (req, res) => {
  try {
    req.session.destroy();

    res.json(req.session ?? {});
  } catch (err) {
    console.log("🚀 ~ file: session.js:15 ~ app.get ~ err:", err);
  }
});

app.listen(3000, (err, data) => {
  if (err) console.log("🚀 ~ file: session.js:12 ~ app.listen ~ err:", err);
  console.log("running on 3000");
});
