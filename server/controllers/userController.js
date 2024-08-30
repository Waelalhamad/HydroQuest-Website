const User = require("../models/user");

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get User By ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User Not Found!",
      });
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Create User
exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Delete User By Id
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .send({ status: "fail", message: "User not found!" });
    }
    return res
      .status(200)
      .send({ status: "success", message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!user) {
      return res
        .status(404)
        .send({ status: "fail", message: "User not found!" });
    }
    return res.status(200).send({ status: "success", data: user });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};