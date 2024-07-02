const express = require('express');
const router = express.Router();
const authController = require('../controllers/UserController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post("/logout", authController.userLogout);
router.get("/userList",authController.GetAllUser);
router.patch("/user/update/:id",authController.updateUser);
router.delete("/user/delete/:id",authController.deleteUser);

module.exports = router;