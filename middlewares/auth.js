const jwt = require("jsonwebtoken");

// middleware xac thuc nguoi dung
exports.authUser = async (req, res, next) => {
  try {
    let tmp = req.header("Authorization");

    const token = tmp ? tmp.slice(7, tmp.length) : "";
    //kiem tra co token hay khong
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }
    // xac thuc bang jwt verify
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Authentification" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
