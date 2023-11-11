const Users = require("../models/UserModel");
const verifyToken = require("../utils/verifyToken");

//* Gets the user info.
const HandleGetInfo = async (req, res) => {
  try {
    const id = req.params.id;

    const userdata = await Users.findOne({ _id: id }).select("-password");
    res.status(200).json({
      userdata,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get the user information!",
    });
  }
};

//* Get all users data
const HandleUserData = async (req, res) => {
  try {
    const token = verifyToken(req);
    const user = await Users.findById(token.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Failed to verify token!",
    });
  }
};

//* Updates user info
const HandleUpdateData = async (req, res) => {
  try {
    const formData = req.body;
    const id = req.params.id;
    const user = await Users.findOne({ _id: id });
    if (!user) {
      res.status(400).json({
        error: "User doesn't exists!",
      });
    }

    user.username = formData.username;
    user.email = formData.email;
    user.age = formData.age;
    user.bdate = formData.bdate;
    await user.save();
    res.status(200).json({
      message: "User info updated!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update data!",
    });
  }
};

module.exports = { HandleUserData, HandleUpdateData, HandleGetInfo };
