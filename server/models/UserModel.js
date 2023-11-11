const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    firstname: String,
    lastname: String,
    age: Number,
    bdate: String,
    email: String,
    password: String,
    friends: Array,
  },
  { timestamps: true }
);

const Users = mongoose.model("users", UserSchema);
module.exports = Users;
