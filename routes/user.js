const router = require("express").Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const userController = require("../controllers/userControllers");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, userController.getSingleUser);

//GET ALL USER
router.get("/", verifyTokenAndAdmin, userController.getAllUsers);

//GET USERS STAT
router.get("/stats", verifyTokenAndAdmin, userController.getUserStat);

module.exports = router;
