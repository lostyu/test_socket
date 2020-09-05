$(function () {
  const socket = io("http://localhost:8888");
  const $userList = $("#userList");
  const user = "admin_" + Math.floor(Math.random() * 10000);
  const $user = $("#user");

  $user.val(user);

  socket.on("userList", (users) => {
    flushUser($userList, users);
  });

  socket.on("online", ({ user, users }) => {
    console.log(`${user}上线`, users);
    flushUser($userList, users);
  });

  socket.on("offline", ({ user, users }) => {
    if (user) {
      console.log(`${user}下线`, users);
    }
    flushUser($userList, users);
  });

  socket.on("create", ({ user, users }) => {
    createRoom(user, users);
  });

  socket.on("leave", ({ user, users }) => {
    createRoom(user, users);
  });

  $(document).on("click", ".btnJoin", function (e) {
    const _user = $(this).data("user");
    const room = $(this).data("room");

    socket.emit("join", { from: user, user: _user, room });
  });

  function createRoom(user, users) {
    let room = users[user].room;
    let html = "";
    if (room) {
      html = `${user}<button class="btnJoin" data-user="${user}" data-room="${room}">加入房间${room}</button>`;
    } else {
      html = `${user}`;
    }
    $(`#${user}`).html(html);
  }

  function flushUser($list, users) {
    $list.empty();

    let _html = "";

    for (let user in users) {
      const _user = user;
      let _room = "";
      if (users[user].room) {
        _room = `<button class="btnJoin" data-user="${_user}" data-room="${users[user].room}">加入房间${users[user].room}</button>`;
      }
      _html += `<li id="${_user}">${_user}${_room}</li>`;
    }

    $list.append(_html);
  }
});
