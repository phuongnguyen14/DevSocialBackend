const express = require("express");
const {
  creatRoomMess,
  getRoomMess,
  customRoom,
  updateRoom,
  deleteRoomMess
} = require("../controllers/roommess");
const { authUser } = require("../middlewares/auth");

const router = express.Router();
router.put("/creatRoomMess", authUser, creatRoomMess);
router.get("/getRoomMess", authUser, getRoomMess);
router.get("/customRoom/:userId", authUser, customRoom);
router.put("/updateRoom/:roomId", authUser, updateRoom);
router.delete("/deleteRoomMess/:roomMessId", authUser, deleteRoomMess);
module.exports = router;
