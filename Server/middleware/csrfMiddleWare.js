const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

const csrf = require("csurf");

router.use(csrf({ cookie: true }));

router.get("/get-csrf-token", async (req, res) => {
  return res.json({ csrfToken: req.csrfToken() });
});

router.post("/auth/login", authController.login);

module.exports = router;
