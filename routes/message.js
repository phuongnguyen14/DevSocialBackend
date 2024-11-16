const express = require("express");
const {
  sendMessage,
  getMessages,
  getMessagesRoom,
  sendMessageRoom,
  getListRoomMess,
  updateSeenMess,
  updateSeenMessInGroup,
  getInfo,
  deleteMessage,
} = require("../controllers/message");

const { authUser } = require("../middlewares/auth");

const router = express.Router();
router.put("/sendMessage", authUser, sendMessage);
router.get("/getMessages/:reseverId", authUser, getMessages);
router.put("/updateSeenMess", authUser, updateSeenMess);
router.put("/updateSeenMessInGroup", authUser, updateSeenMessInGroup);
router.put("/sendMessageRoom", authUser, sendMessageRoom);
router.get("/getMessagesRoom/:roommessId", authUser, getMessagesRoom);
router.get("/getListRoomMess", authUser, getListRoomMess);
router.get("/getInfo/:roommessId", authUser, getInfo);
router.delete("/messages/:messageId", authUser, deleteMessage);

module.exports = router;
