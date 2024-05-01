const isAuth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware")
const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");

router.get('/view-requests', isAuth, isAdmin, adminController.getRequests )

router.get('/view-all-users', isAuth, isAdmin, adminController.getUsers )

router.get('/view-all-sellers', isAuth, isAdmin, adminController.getSellers )

router.get('/view-orders', isAuth, isAdmin, adminController.getOrders )

router.get('/view-products', isAuth, isAdmin, adminController.getAllProducts )

router.get('/admin/order/:orderId', isAuth, isAdmin, adminController.getSingleOrder )

router.get('/view-requests/:reqId', isAuth, isAdmin,  adminController.getRequest )

router.post("/get-add-product", isAuth, isAdmin, adminController.getAddProduct);

router.get("/get-edit-product/:prodId", isAuth, isAdmin, adminController.getEditProduct);

router.post("/get-edit-product/:prodId", isAuth, isAdmin, adminController.postEditProduct);

router.get("/delete-product/:prodId", isAuth, isAdmin, adminController.postDeleteProduct);

router.get("/delete-request/:reqId", isAuth, isAdmin, adminController.postDeleteRequest);

router.get("/delete-order/:reqId", isAuth, isAdmin, adminController.postDeleteOrder);

router.get("/delete-user/:reqId", isAuth, isAdmin, adminController.postDeleteUser);

router.post("/add-product", isAuth, isAdmin,  adminController.addProduct);

router.get("/delete-request/:reqId",isAuth, adminController.deleteRequest)

module.exports = router;
