const bcrypt = require("bcrypt");
const Users = require("../models/UserModel");
const createToken = require("../utils/createToken");

const handleSignUp = async (req, res) => {
  try {
    const formData = req.body;
    const userExist = await Users.findOne({ email: formData.email });
    const usernameExist = await Users.findOne({ username: formData.username });
    if (userExist) {
      return res.status(400).json({
        error: "user email already exists!",
      });
    }
    if (usernameExist) {
      return res.status(400).json({
        error: "username already taken!",
      });
    }
    const hashedPass = await bcrypt.hash(formData.password, 12);
    const newUser = await Users.create({
      username: formData.username,
      firstname: formData.firstname,
      lastname: formData.lastname,
      age: formData.age,
      bdate: formData.bdate,
      email: formData.email,
      password: hashedPass,
    });
    await newUser.save();
    return res.status(200).json({
      message: "User created successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      error: "failed to create account!",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const formData = req.body;
    const userExist = await Users.findOne({ email: formData.email });
    if (!userExist) {
      return res.status(400).json({
        error: "user doesn't exists!",
      });
    }
    if (formData.username !== userExist.username) {
      return res.status(400).json({
        error: "username doesn't match!",
      });
    }
    if (formData.email !== userExist.email) {
      return res.status(400).json({
        error: "email doesn't match!",
        Email,
      });
    }

    const validPass = await bcrypt.compare(
      formData.password,
      userExist.password
    );
    if (!validPass) {
      return res.status(400).json({
        error: "password doesn't match!",
      });
    }

    const token = createToken(userExist._id.toString());
    res.cookie("token", token, {
      // httpOnly: true,
      maxAge: 1000 * 60 * 30 * 1000,
    });
    return res.status(200).json({
      message: "User authenticated!",
    });
  } catch (error) {
    return res.status(500).json({
      error: "failed to login user!",
    });
  }
};

const handleLogout = async (req, res) => {
  res.clearCookie("token");
  res.send("cookie removed");
};

module.exports = { handleSignUp, handleLogout, handleLogin };
