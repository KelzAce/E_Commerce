const router = require("express").Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const cartController = require("../controllers/cartControllers");

//CREATE
router.post("/", verifyToken, cartController.createCart);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);

//GET USER CART
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  cartController.getSingleUser
);

//GET ALL
router.get("/", verifyTokenAndAdmin, cartController.getAllUsers);

module.exports = router;
