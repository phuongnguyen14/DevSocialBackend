const RoomMess = require("../models/RoomMess");
const User = require("../models/User");
const Group = require("../models/Group");
const mongoose = require("mongoose");

exports.creatRoomMess = async (req, res) => {
  try {
    let members = [];

    const { room_name, groupRef } = req.body;
    const group = await Group.findById(groupRef);
    members = group.members.map((member) => member.user);
    const newRoomMess = await new RoomMess({
      room_name: room_name,
      groupRef: groupRef,
      members: members,
    }).save();

    res.send({
      newRoomMess: newRoomMess,
      message: "Create Room Chat Success !",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoomMess = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("groups_joined");
    const groupsJoined = user.groups_joined;

    const allRoomMess = await RoomMess.find({
      groupRef: { $in: groupsJoined },
    }).populate("groupRef", "group_name public cover members numMembers id");

    res.status(200).json({ roomMess: allRoomMess });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.customRoom = async (req, res) => {
  try {
    const userId = req.params.userId;

    const existingRoomMess = await RoomMess.findOne({
      $or: [
        { members: [req.user.id, userId] },
        { members: [userId, req.user.id] },
      ],
      roomUser: true,
    });

    if (existingRoomMess) {
      res.status(200).json({
        color: existingRoomMess.color,
        icon: existingRoomMess.icon,
        media: existingRoomMess.media,
        roomId: existingRoomMess._id,
      });
    } else {
      res.status(200).json({ color: "#0084FF", icon: "👍🏻", media: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { color, icon } = req.body;

    const existingRoom = await RoomMess.findById(req.params.roomId);

    if (!existingRoom) {
      return res.status(404).json({ message: "Chat room not found." });
    }

    await RoomMess.findByIdAndUpdate(req.params.roomId, {
      $set: {
        color: color,
        icon: icon,
      },
    });

    res.status(200).json({ message: "Chat room updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRoomMess = async (req, res) => {
  try {
    const roomMessId  = req.params.roomMessId; 
    const deletedRoomMess = await RoomMess.findByIdAndRemove(roomMessId);

    if (!deletedRoomMess) {
      return res.status(404).json({ message: "RoomMess not found" });
    }

    res.json({
      message: "RoomMess deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
