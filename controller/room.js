const Room = require("../models/Room");

module.exports = {
  async all(status = 1) {
    const result = await Room.findAll({
      where: {
        status,
      },
    });
    return { ok: true, msg: "", data: result };
  },
  async create(createUser, roomNum, status = 1) {
    // 查询当前用户是否已经创建了房间，并且状态不能为1或2
    // 状态: 1请求通话     //2通话中       //0通话结束
    // const ddd = await Room.findOne({
    //   where: {
    //     createUser,
    //     [and]: [{ status: [1, 2] }],
    //   },
    // });

    const room = await Room.create({
      roomNum,
      createUser,
      status,
    });

    if (room) {
      return { ok: true, msg: "", data: room };
    } else {
      return { ok: false, msg: "" };
    }
  },
};
