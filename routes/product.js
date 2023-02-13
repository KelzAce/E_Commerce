const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const productController = require("../controllers/productControllers");

//CREATE
router.post("/", verifyTokenAndAdmin, productController.createProduct);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);

//GET PRODUCT
router.get("/find/:id", productController.getSingleProduct);

//GET ALL PRODUCTS
router.get("/", productController.getAllProduct);

module.exports = router;
