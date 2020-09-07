const User = require("../models/User");
const { md5 } = require("../lib/md5");

// console.log(md5("123456"));
for (let i = 0; i < 10; i++) {
  const username = "user_" + Math.floor(Math.random() * 1000);
  const password = md5("123456");

  (async () => {
    await User.create({
      username,
      password,
      role: "customer",
    });
  })();

  // console.log(username, password, expires);
}

(async () => {
  const password = md5("123456");
  await User.create({
    username: "tony",
    password,
    role: "admin",
  });
})();
