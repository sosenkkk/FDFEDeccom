const isAuth = require("../middleware/authMiddleware");
const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();


/**
 * @swagger
 * '/my-account':
 *  get:
 *      summary: Get user account information
 *      tags: ['User']
 *      description: Retrieve user account information based on the authenticated user's ID.
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          202:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: User data found!
 *                              email:
 *                                  type: string
 *                                  example: example@example.com
 *                              firstName:
 *                                  type: string
 *                                  example: John
 *                              lastName:
 *                                  type: string
 *                                  example: Doe
 *                              cart:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          productId:
 *                                              type: string
 *                                              example: 123abc
 *                                          quantity:
 *                                              type: integer
 *                                              example: 2
 *                              profile:
 *                                  type: string
 *                                  example: https://example.com/profile.jpg
 *                              isAdmin:
 *                                  type: boolean
 *                                  example: true
 *                              isSeller:
 *                                  type: boolean
 *                                  example: false
 *          404:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Some Error Happened, User not found
 */

router.get("/my-account", isAuth, userController.accountInfo);



/**
 * @swagger
 * '/edit-info':
 *  post:
 *      summary: Edit user information
 *      tags: ['User']
 *      description: Edit the first name, last name, and/or profile picture of the authenticated user.
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *                          firstName:
 *                              type: string
 *                              description: New first name of the user (optional)
 *                          lastName:
 *                              type: string
 *                              description: New last name of the user (optional)
 *      responses:
 *          201:
 *              description: User updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: User Updated
 *          433:
 *              description: Error occurred during file upload
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Some error occurred. Try again
 */


router.post("/edit-info", isAuth, userController.editInfo);


/**
 * @swagger
 * '/contact-us':
 *  post:
 *      summary: Contact Us
 *      tags: ['User']
 *      description: Send a message to the admin.
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              description: The message to be sent
 *      responses:
 *          201:
 *              description: Message sent successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Message sent successfully.
 *          433:
 *              description: Error occurred while sending message
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Message not sent due to some error.
 */


router.post("/contact-us", isAuth, userController.contactUs);


/**
 * @swagger
 * '/cart':
 *  post:
 *      summary: Add item to cart
 *      tags: ['User']
 *      description: Add a product to the user's cart.
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          productId:
 *                              type: string
 *                              description: The ID of the product to be added to the cart
 *                          quantity:
 *                              type: integer
 *                              description: The quantity of the product to be added (optional, default is 1)
 *      responses:
 *          201:
 *              description: Product added to cart successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Added to cart
 *                              cart:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/CartItem'
 *                              total:
 *                                  type: number
 *                                  example: 50
 *          433:
 *              description: Error occurred while adding item to cart
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Item not added to cart
 *
 */

router.post("/cart", isAuth, userController.postCart);

/**
 * @swagger
 * '/cart':
 *  get:
 *      summary: Get user cart
 *      tags: ['User']
 *      description: Retrieve the user's cart contents.
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          201:
 *              description: Cart retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              products:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/CartItem'
 *                              total:
 *                                  type: number
 *                                  example: 50
 *          433:
 *              description: Error occurred while retrieving cart
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Cart not retrieved due to some error
 *
 */

router.get("/cart", isAuth, userController.getCart);

/**
 * @swagger
 * '/products':
 *  get:
 *      summary: Get products
 *      tags: ['User']
 *      description: Retrieve products based on optional filters and pagination.
 *      parameters:
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *            description: The page number for pagination (optional, default is 1)
 *          - in: query
 *            name: filter
 *            schema:
 *              type: string
 *            description: Filter products by product model (optional, use 'all' for all products)
 *          - in: query
 *            name: sort
 *            schema:
 *              type: string
 *            description: Sort products by price ('asc' for ascending, 'desc' for descending)
 *      responses:
 *          201:
 *              description: Products fetched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Products fetched Successfully
 *                              products:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 *                              totalProducts:
 *                                  type: integer
 *                                  example: 20
 *          433:
 *              description: Error occurred while fetching products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Products fetching failed
 *
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: 123abc
 *                  productName:
 *                      type: string
 *                      example: Product Name
 *                  productModel:
 *                      type: string
 *                      example: Model Name
 *                  productPrice:
 *                      type: number
 *                      example: 50
 */


router.get("/products", userController.getProducts);

/**
 * @swagger
 * '/products/{productId}':
 *  get:
 *      summary: Get single product
 *      tags: ['User']
 *      description: Retrieve a single product by its ID.
 *      parameters:
 *          - in: path
 *            name: productId
 *            schema:
 *              type: string
 *            required: true
 *            description: The ID of the product to retrieve
 *      responses:
 *          201:
 *              description: Product fetched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Product fetched Successfully
 *                              product:
 *                                  $ref: '#/components/schemas/Product'
 *          433:
 *              description: Error occurred while fetching product
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Product fetching failed
 *
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: 123abc
 *                  productName:
 *                      type: string
 *                      example: Product Name
 *                  productModel:
 *                      type: string
 *                      example: Model Name
 *                  productPrice:
 *                      type: number
 *                      example: 50
 */


router.get("/products/:productId", userController.getSingleProduct);

/**
 * @swagger
 * '/total-products':
 *  get:
 *      summary: Get total products
 *      tags: ['User']
 *      description: Retrieve all unique product models available.
 *      responses:
 *          201:
 *              description: Product models fetched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Successfully fetched all product models
 *                              totalProductModels:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                                      example: Model Name
 *          433:
 *              description: Error occurred while fetching product models
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Error occurred while fetching product models
 */

router.get("/total-products", userController.getTotalProducts);


/**
 * @swagger
 * '/check-out':
 *  post:
 *      summary: Checkout
 *      tags: ['User']
 *      description: Process an order checkout.
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          products:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      productId:
 *                                          type: string
 *                                          description: The ID of the product
 *                                      quantity:
 *                                          type: integer
 *                                          description: The quantity of the product
 *                          total:
 *                              type: number
 *                              description: The total price of the order
 *                          user:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      description: The name of the user
 *                                  shippingAddress:
 *                                      type: string
 *                                      description: The shipping address
 *                                  landmark:
 *                                      type: string
 *                                      description: The landmark near the shipping address
 *                                  state:
 *                                      type: string
 *                                      description: The state of the shipping address
 *                                  city:
 *                                      type: string
 *                                      description: The city of the shipping address
 *                                  pincode:
 *                                      type: string
 *                                      description: The pincode of the shipping address
 *                                  phoneNumber:
 *                                      type: string
 *                                      description: The phone number of the user
 *      responses:
 *          201:
 *              description: Order successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Order successful.
 *          433:
 *              description: Error occurred while processing order
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Order unsuccessful.
 */


router.post("/check-out", isAuth, userController.postCheckOut)


/**
 * @swagger
 * '/delete-cart':
 *  get:
 *      summary: Delete cart
 *      tags: ['User']
 *      description: Delete all items from the user's cart.
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          201:
 *              description: Cart deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Cart Deleted!
 *          433:
 *              description: Error occurred while deleting cart
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Unable to delete cart!
 */


router.get("/delete-cart", isAuth, userController.deleteCart);


/**
 * @swagger
 * '/my-orders':
 *  get:
 *      summary: Get user orders
 *      tags: ['User']
 *      description: Retrieve orders placed by the authenticated user.
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          201:
 *              description: Orders fetched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Fetched Orders Successfully.
 *                              orders:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Order'
 *          404:
 *              description: No orders found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: No orders found.
 *          433:
 *              description: Error occurred while fetching orders
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Some error occured
 *
 * components:
 *      schemas:
 *          Order:
 *              type: object
 *              properties:
 *                  user:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                              example: 123abc
 *                          name:
 *                              type: string
 *                              example: John Doe
 *                          shippingAddress:
 *                              type: string
 *                              example: 123 Main St
 *                          landmark:
 *                              type: string
 *                              example: Near Park
 *                          state:
 *                              type: string
 *                              example: California
 *                          city:
 *                              type: string
 *                              example: Los Angeles
 *                          pincode:
 *                              type: string
 *                              example: 90001
 *                          phoneNumber:
 *                              type: string
 *                              example: +1234567890
 *                  total:
 *                      type: number
 *                      example: 100
 *                  orderPlaced:
 *                      type: string
 *                      example: 2024-04-30
 *                  id:
 *                      type: string
 *                      example: 123abc
 */


router.get("/my-orders", isAuth, userController.getOrders);

/**
 * @swagger
 * '/my-order/{orderId}':
 *  get:
 *      summary: Get single order
 *      tags: ['User']
 *      description: Retrieve a single order by its ID.
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: orderId
 *            schema:
 *              type: string
 *            required: true
 *            description: The ID of the order to retrieve
 *      responses:
 *          201:
 *              description: Order fetched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Order fetched successfully.
 *                              order:
 *                                  $ref: '#/components/schemas/Order'
 *          433:
 *              description: Error occurred while fetching order
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Some error occurred
 *
 * components:
 *      schemas:
 *          Order:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: 123abc
 *                  user:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                              example: 456def
 *                          name:
 *                              type: string
 *                              example: John Doe
 *                          shippingAddress:
 *                              type: string
 *                              example: 123 Main St
 *                          landmark:
 *                              type: string
 *                              example: Near Park
 *                          state:
 *                              type: string
 *                              example: California
 *                          city:
 *                              type: string
 *                              example: Los Angeles
 *                          pincode:
 *                              type: string
 *                              example: 90001
 *                          phoneNumber:
 *                              type: string
 *                              example: +1234567890
 *                  products:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              product:
 *                                  type: string
 *                                  example: 789ghi
 *                              quantity:
 *                                  type: integer
 *                                  example: 2
 *                  total:
 *                      type: number
 *                      example: 100
 *                  orderPlaced:
 *                      type: string
 *                      example: 2024-04-30T12:00:00.000Z
 */


router.get("/my-order/:orderId", isAuth, userController.getSingleOrder);


/**
 * @swagger
 * '/delete/{cartId}':
 *  get:
 *      summary: Delete item from cart
 *      tags: ['User']
 *      description: Delete an item from the user's cart.
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: cartId
 *            schema:
 *              type: string
 *            required: true
 *            description: The ID of the item to delete from the cart
 *      responses:
 *          201:
 *              description: Item deleted from cart
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Item deleted from cart!
 *          433:
 *              description: Unable to update cart
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Unable to update cart
 */


router.get("/delete/:cartId", isAuth, userController.deleteFromCart);

module.exports = router;
