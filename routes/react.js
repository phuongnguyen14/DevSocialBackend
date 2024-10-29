const express = require("express");
const {
  reactPost,
  getReactsPost,
  reactComment,
  getReactsComment,
  reactMess,
  getReactsMess,
} = require("../controllers/react");
const { authUser } = require("../middlewares/auth");

const router = express.Router();
router.put("/reactPost", authUser, reactPost);
router.put("/reactComment", authUser, reactComment);
router.put("/reactMess", authUser, reactMess);
router.get("/getReactsPost/:id", authUser, getReactsPost);
router.get("/getReactsComment/:id", authUser, getReactsComment);
router.get("/getReactsMess/:id", authUser, getReactsMess);
module.exports = router;
