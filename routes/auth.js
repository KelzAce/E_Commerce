const router = require("express").Router();

const authControllers = require("../controllers/authController");

//REGISTER
router.post("/register", authControllers.Register);

//LOGIN

router.post("/login", authControllers.login);

module.exports = router;
