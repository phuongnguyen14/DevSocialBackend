const jwt = require("jsonwebtoken");
//tao token va payload, co time out
exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    //jwt sign tao token
    expiresIn: expired, // thoi gian het han
  });
};
