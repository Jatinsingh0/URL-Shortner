require('dotenv').config();
const express = require("express");
const URL = require("./models/url")
const {connectMongodb} = require("./connect")
const path = require("path")
const cookieParser = require("cookie-parser")
const {restrictUser, checkAuth} = require("./middlewares/auth")
const staticRoute = require("./routes/staticRouter")
const urlRoute = require("./routes/url")
const userRoute = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 8001;


connectMongodb(process.env.MONGODB_URL);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictUser, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute)

app.get("/url/:shortId", async(req, res)=>{
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({shortId},{
    $push: {
        visitHistory: {timestamp: Date.now()}
    }
  })
  res.redirect(entry.redirectUrl)
})

module.exports = app;
