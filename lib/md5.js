const crypto = require("crypto");
const { salt } = require("../config");

exports.md5 = function (str) {
  const md5 = crypto.createHash("md5");
  md5.update(salt + str);

  return md5.digest("hex");
};
