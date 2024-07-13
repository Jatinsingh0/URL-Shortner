const express = require("express");
const URL = require("./models/url")
const {connectMongodb} = require("./connect")
const path = require("path")
const cookieParser = require("cookie-parser")
const {restrictUser, checkAuth} = require("./middlewares/auth")
const staticRoute = require("./routes/staticRouter")
const urlRoute = require("./routes/url")
const userRoute = require("./routes/users")
const app = express();
const PORT = 8001;


connectMongodb("mongodb://127.0.0.1:27017/url-shortner");

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

app.listen(PORT, ()=> console.log(`server started at PORT: ${PORT}`));
