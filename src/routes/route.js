const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

let routes = (app) => {
    router.post("/upload", controller.upload);
    router.get("/files", controller.getListFiles);
    router.delete("/files/:name", controller.remove);
    app.use(router);
};

module.exports = routes;
