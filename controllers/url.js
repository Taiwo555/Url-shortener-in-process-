const shortId = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    try {
        const body = req.body;
        if (!body.url) return res.status(400).json({ message: 'url is required' });

        const shortURL = await URL.create({
            shortId: shortId(),
            redirectURL: body.url,
            visitHistory: [],
        });

        return res.json({ data: { shortUrl: shortURL.shortId } });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server error" })
    }
}

async function handleRedirect(req, res) {
    try {
        const shortId = req.params.code
        const doesExist = await URL.findOne({ shortId: shortId })
        if (!doesExist) return res.status(404).json({ message: "Url does not exist" })
        return res.redirect(doesExist.redirectURL)
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server error" })
    }
}
const controller = { handleGenerateNewShortURL, handleRedirect }

module.exports = controller;