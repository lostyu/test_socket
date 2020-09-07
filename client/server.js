const express = require("express");
const server = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./routers");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");

server.use(express.static(path.resolve(__dirname, "./www/")));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

server.set("views", "./www");
server.set("view engine", "ejs");
server.engine("html", ejs.renderFile);

server.use(router);

server.listen(5000);
