const express = require("express");
const {
  HandleUserData,
  HandleUpdateData,
  HandleGetInfo,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/getdata", HandleUserData);
router.patch("/user/:id", HandleUpdateData);
router.get("/userdata/:id", HandleGetInfo);

module.exports = router;
