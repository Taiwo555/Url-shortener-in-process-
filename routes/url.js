const express = require("express");
const router = express.Router();

const controller = require('../controllers/url')

router.post("/", controller.handleGenerateNewShortURL);

router.get("/:code", controller.handleRedirect)

module.exports = router;