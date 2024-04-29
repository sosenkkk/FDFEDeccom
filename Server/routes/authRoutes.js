const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();


/**
 * @swagger
 * '/rest/signup':
 *   post:
 *     summary: User Signup
 *     tags: ['Authentication']
 *     description: Register a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user account.
 *     responses:
 *       201:
 *         description: User account created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User account created!
 *                 userId:
 *                   type: string
 *                   example: 123abc
 *       433:
 *         description: User already registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already registered.
 *                 userId:
 *                   type: string
 *                   example: 456def
 */

router.post("/signup", authController.signup);

// router.post("/login", authController.login);



/**
 * @swagger
 * '/rest/logout':
 *   get:
 *     summary: User Logout
 *     tags: ['Authentication']
 *     description: Log out the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User Logged Out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Logged Out.
 *       433:
 *         description: Error logging out User.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error logging out User.
 */


router.get("/logout", authController.getLogout);


/**
 * @swagger
 * '/rest/change-password':
 *   post:
 *     summary: Change User Password
 *     tags: ['Authentication']
 *     description: Change the password for a registered user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               oldpassword:
 *                 type: string
 *                 format: password
 *                 description: Current password of the user.
 *               newpassword:
 *                 type: string
 *                 format: password
 *                 description: New password to be set for the user.
 *     responses:
 *       201:
 *         description: User password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User password changed!
 *       433:
 *         description: User not registered or incorrect password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not registered or incorrect password.
 *       404:
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


router.post("/change-password", authController.changePassword);

/**
 * @swagger
 * '/rest/reset-password':
 *   post:
 *     summary: Reset User Password
 *     tags: ['Authentication']
 *     description: Send a password reset link to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *     responses:
 *       201:
 *         description: Password reset link sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset link has been sent to email.
 *       433:
 *         description: User not registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not registered.
 *       404:
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


router.post("/reset-password", authController.postResetPassword);

/**
 * @swagger
 * /reset-password/{id}/{token}:
 *   post:
 *     summary: Reset User Password with Token
 *     description: Reset the password for a user using the provided reset token.
 *     tags: [Authentication]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: User ID extracted from the reset link.
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: Reset token extracted from the reset link.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: New password to be set for the user.
 *     responses:
 *       '201':
 *         description: User password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User password changed!
 *       '433':
 *         description: Invalid Link or Incorrect Email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid Link or Incorrect Email.
 *       '404':
 *         description: Some error occurred or Invalid Link.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some Error Occurred. Invalid Link.
 */

router.post("/reset-password/:id/:token", authController.getResetPassword);

module.exports = router;
