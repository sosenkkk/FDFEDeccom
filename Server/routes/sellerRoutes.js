const isAuth = require("../middleware/authMiddleware");
const isSeller = require("../middleware/sellerMiddleware")
const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();


router.get('/view-orders', isAuth, isSeller, adminController.getOrders )

router.get('/view-products', isAuth, isSeller, adminController.getAllProducts )

router.get('/order/:orderId', isAuth, isSeller, adminController.getSingleOrder )

router.post("/get-add-product", isAuth, isSeller, adminController.getAddProduct);

router.get("/get-edit-product/:prodId", isAuth, isSeller, adminController.getEditProduct);

router.post("/get-edit-product/:prodId", isAuth, isSeller, adminController.postEditProduct);

router.post("/add-product", isAuth, isSeller,  adminController.addProduct);

module.exports = router;
