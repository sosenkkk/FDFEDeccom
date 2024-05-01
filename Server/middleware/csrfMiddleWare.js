const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

const csrf = require("csurf");

router.use(csrf({ cookie: true }));

/**
 * @swagger
 * /csrf/get-csrf-token:
 *   get:
 *     summary: Get CSRF Token
 *     tags: [Authentication]
 *     description: Retrieves a CSRF token for use in protected requests.
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the CSRF token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 csrfToken:
 *                   type: string
 *                   description: CSRF token for protecting requests.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       '400':
 *         description: Bad request. The CSRF token could not be generated.
 */

router.get("/get-csrf-token", async (req, res) => {
  return res.json({ csrfToken: req.csrfToken() });
});






module.exports = router;
