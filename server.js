const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");
const router = require("./routers/user");
const axios = require("axios");
const baseUrl = "http://localhost:8888/api";

// middleware
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

let users = {};

io.on("connection", (socket) => {
  socket.emit("userList", users);

  // socket.on("online", (user) => {
  //   if (!users[user]) {
  //     socket.user = user;
  //     users[user] = { user: socket.id };
  //   }

  //   io.emit("online", { user, users });
  // });

  socket.on("disconnect", () => {
    if (users[socket.user]) {
      delete users[socket.user];
      io.emit("offline", { user: socket.user, users });
    }
  });

  // socket.on("offline", (user) => {
  //   if (users[user]) {
  //     delete users[user];
  //     io.emit("offline", { user, users });
  //   }
  // });

  socket.on("create", async ({ user, room }) => {
    // if (users[user]) {
    //   users[user].room = room;
    //   io.emit("create", { user, users });
    // }
    // 获取房间列表
    const { data } = await axios.get(`${baseUrl}/roomList`);

    // console.log(data);
    io.emit("create", data.data);
  });

  socket.on("leave", ({ user }) => {
    if (users[user]) {
      delete users[user].room;
      io.emit("leave", { user, users });
    }
  });

  socket.on("join", ({ from, user, room }) => {
    if (users[user] && users[user].room) {
      io.to(users[user].user).emit("join", { from, user, room });
    }
  });
});

http.listen(8888);
