const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:id", userController.getUserById);

// Post new user
router.post("/", userController.addUser);

// Delete user
router.delete("/:id", userController.deleteUser);

// Update user
router.patch("/:id", userController.updateUser);

module.exports = router;
