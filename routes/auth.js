const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      status: "Success",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      msg: console.error,
    });
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Crentials");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    Originalpassword !== req.body.password &&
      res.status(401).json("Wrong Crentials");

    //creatingjsonwebtoken
    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    //using spread operator to reveal every other thing except the passoword

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
