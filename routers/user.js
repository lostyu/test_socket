const express = require("express");
const router = express.Router();
const User = require("../controller/user");
const Room = require("../controller/room");

router.get("/user", async (req, res) => {
  const { username } = req.query;
  const result = await User.getUserByName(username);

  res.json(result);
});

router.get("/userList", async (req, res) => {
  const result = await User.getAll();

  res.json(result);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.json({ ok: false, msg: "用户名或密码不能为空" });
  }
  const result = await User.login(username, password);
  res.json(result);
});

router.post("/reg", async (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.json({ ok: false, msg: "用户名或密码不能为空" });
  }
  const result = await User.reg(username, password);
  res.json(result);
});

router.get("/create", async (req, res) => {
  const { user, room } = req.query;
  const result = await Room.create(user, room);

  res.json(result);
});

router.get("/roomList", async (req, res) => {
  const result = await Room.all();

  res.json(result);
});

module.exports = router;
