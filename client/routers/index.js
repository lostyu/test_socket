const express = require("express");
const router = express.Router();
const path = require("path");
const axios = require("axios");

const baseUrl = "http://localhost:8888/api/";

router.get("/login", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "../www/login.html"));
  res.render("login.html");
});

router.get("/reg", (req, res) => {
  res.render("reg.html");
  // res.sendFile(path.resolve(__dirname, "../www/reg.html"));
});

router.get("/controller", async (req, res) => {
  let user = req.cookies.client_user;
  if (user !== undefined) {
    // console.log(11111);
    // check expires
    let _user = JSON.parse(user);
    const { data } = await axios.get(
      `${baseUrl}user?username=${_user.username}`
    );
    // console.log(data);
    // // console.log(data);
    if (data.ok) {
      if (data.data.role !== "admin") {
        res.redirect("/login");
      }
      if (data.data.expires > Date.now()) {
        // res.sendFile(path.resolve(__dirname, "../www/customer.html"));
        res.render("controller.html");
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  } else {
    // console.log(2222222222);
    res.redirect("/login");
  }
});

router.get("/customer", async (req, res) => {
  let user = req.cookies.client_user;
  if (user !== undefined) {
    // console.log(11111);
    // check expires
    let _user = JSON.parse(user);
    const { data } = await axios.get(
      `${baseUrl}user?username=${_user.username}`
    );
    // console.log(data);
    if (data.ok) {
      if (data.data.role !== "customer") {
        res.redirect("/login");
      }
      if (data.data.expires > Date.now()) {
        // res.sendFile(path.resolve(__dirname, "../www/customer.html"));
        res.render("customer.html");
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  } else {
    // console.log(2222222222);
    res.redirect("/login");
  }
});

router.get("/", (req, res) => {
  res.redirect("login");
});

module.exports = router;
