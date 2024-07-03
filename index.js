const express = require("express");
const urlRoute = require("./routes/url")
const URL = require("./models/url")
const {connectMongodb} = require("./connect")
const path = require("path")
const staticRoute = require("./routes/staticRouter")
const app = express();
const PORT = 8001;


connectMongodb("mongodb://127.0.0.1:27017/url-shortner");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoute);
app.use("/", staticRoute);

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
