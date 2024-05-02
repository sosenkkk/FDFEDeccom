const isAuth = require("../middleware/authMiddleware");
const isSeller = require("../middleware/sellerMiddleware")
const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();


/**
 * @swagger
 * /view-orders:
 *   get:
 *     summary: Get all orders that has been placed
 *     description: Retrieve a list of orders with pagination and sorting options.
 *     tags: [Seller]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination (default is 1)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order for orders (optional)
 *     responses:
 *       '201':
 *         description: Orders fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fetched Orders Successfully.
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           userId:
 *                             type: string
 *                             example: 1234567890
 *                           email:
 *                             type: string
 *                             format: email
 *                             example: user@example.com
 *                       total:
 *                         type: number
 *                         example: 50.25
 *                       orderPlaced:
 *                         type: string
 *                         example: 2024-04-29
 *                       id:
 *                         type: string
 *                         example: 606b065745ecdf0015b6b498
 *                 totalOrders:
 *                   type: integer
 *                   example: 100
 *       '404':
 *         description: No orders found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No orders found.
 *       '433':
 *         description: Some error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some error occurred.
 */


router.get('/view-orders', isAuth, isSeller, adminController.getOrders )



/**
 * @swagger
 * /view-products:
 *   get:
 *     summary: Get products with pagination and filtering
 *     description: Retrieve a list of products with pagination and filtering options.
 *     tags: [Seller]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination (default is 1)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter products by model (optional)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order for products (optional)
 *     responses:
 *       '201':
 *         description: Products fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Products fetched Successfully
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalProducts:
 *                   type: integer
 *                   example: 100
 *       '404':
 *         description: No products found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No products found.
 *       '433':
 *         description: Some error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Products fetching failed.
 */


router.post('/view-my-products/:userId', isAuth, isSeller, adminController.getSellerProducts )

router.post('/change-order-status/:orderId', isAuth, isSeller, adminController.changeOrderStatus )

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints for managing orders
 */

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Get a single order by order ID
 *     description: Retrieve details of a single order by its ID.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to retrieve.
 *     responses:
 *       '201':
 *         description: Order fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order fetched successfully.
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order not found.
 *       '433':
 *         description: Some error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some error occurred.
 */

router.get('/order/:orderId', isAuth, isSeller, adminController.getSingleOrder )

router.post("/get-add-product", isAuth, isSeller, adminController.getAddProduct);

/**
 * @swagger
 * /get-edit-product/{prodId}:
 *   get:
 *     summary: Get product for editing
 *     description: Retrieve product details for editing by product ID.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: prodId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to edit.
 *     responses:
 *       '201':
 *         description: Product fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product Fetched
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found or some error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some error occurred
 *       '433':
 *         description: Some error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some error occurred
 */

router.get("/get-edit-product/:prodId", isAuth, isSeller, adminController.getEditProduct);

router.post("/get-edit-product/:prodId", isAuth, isSeller, adminController.postEditProduct);

router.post("/add-product", isAuth, isSeller,  adminController.addProduct);

module.exports = router;
