$(function () {
  const socket = io("http://localhost:8888");
  const cookie = $.cookie("client_user");
  const _user = cookie ? JSON.parse(cookie) : "";
  const user = _user.username;
  // const user = "user_" + Math.floor(Math.random() * 10000);
  const room = Math.floor(Math.random() * 10000);
  const $user = $("#user");
  const $room = $("#room");
  const $create = $("#create");
  const $leave = $("#leave");
  const $online = $("#online");
  const $offline = $("#offline");
  const $info = $("#info");
  let isOnline = false;
  let isCreate = false;
  const baseUrl = "http://localhost:8888/api/";

  document.title = user;
  $user.val(user);
  $room.val(room);
  bindEvents();
  //   socket.emit("online", user);

  socket.on("join", ({ from, user, room }) => {
    console.log(from, user, room);
  });

  syncInfo();

  // function online() {
  //   if (!isOnline) {
  //     socket.emit("online", user);
  //     isOnline = true;
  //   }
  // }
  // function offline() {
  //   socket.emit("offline", user);
  //   isOnline = false;
  //   isCreate = false;
  // }
  function create() {
    if (!isCreate) {
      // 调用创建房间接口
      $.ajax({
        url: baseUrl + "create",
        method: "GET",
        data: { user, room },
      })
        .then((res) => {
          if (res.ok) {
            socket.emit("create", { user, room });
            isCreate = true;
          }
          console.log(res.msg);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function leave() {
    if (isCreate) {
      socket.emit("leave", { user });
      isCreate = false;
    }
  }

  function syncInfo() {
    // const _online = `是否在线：${isOnline}\n`;
    const _create = `是否创建房间：${isCreate}\n`;
    $info.val(_create);
  }

  function bindEvents() {
    // $online.on("click", function () {
    //   online();
    //   syncInfo();
    // });

    // $offline.on("click", function () {
    //   offline();
    //   syncInfo();
    // });

    $create.on("click", function () {
      create();
      syncInfo();
    });

    $leave.on("click", function () {
      leave();
      syncInfo();
    });
  }
});
