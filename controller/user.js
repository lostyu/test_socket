const User = require("../models/User");
const { md5 } = require("../lib/md5");

module.exports = {
  async getUserByName(username) {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (user) {
      return { ok: true, msg: "", data: user };
    } else {
      return { ok: false, msg: "未找到该用户" };
    }
  },
  async getAll() {
    const res = await User.findAll();
    return res;
  },
  async login(username, password) {
    password = md5(password);
    const user = await User.findOne({
      where: {
        username,
        password,
      },
    });

    if (user) {
      user.expires = Date.now() + 86400 * 1000;
      await user.save();
      return {
        ok: true,
        msg: "登录成功",
        data: {
          id: user.id,
          role: user.role,
          username: user.username,
          expires: user.expires,
        },
      };
    } else {
      return { ok: false, msg: "用户名或密码错误" };
    }
  },
  async reg(username, password) {
    password = md5(password);
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user === null) {
      console.log("user为空，可以注册");
      const res = await User.create({
        username,
        password,
        role: "customer",
      });
      if (res) {
        return { ok: true, msg: "注册成功" };
      } else {
        return { ok: false, msg: "注册失败" };
      }
    } else {
      console.log("此用户已存在");
      return { ok: false, msg: "此用户已存在" };
    }
  },
};
