const shortid  = require("shortid")
const URL = require("../models/url")

const generateShortUrl = async (req, res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url required"});
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory:[]
    })
    res.json({id: shortId});
}

module.exports = {
    generateShortUrl,
}