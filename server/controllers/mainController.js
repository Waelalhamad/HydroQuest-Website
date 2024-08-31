const path = require("path");

// Utility function to resolve paths
const resolveFilePath = (relativePath) => path.resolve(relativePath);

const getHomePage = (req, res) => {
  res.sendFile(resolveFilePath("client/index.html"));
};

const getDashboardPage = (req, res) => {
  res.sendFile(resolveFilePath("../client/pages/dashboard/dashboard.html"));
};

module.exports = {
  getHomePage,
  getDashboardPage,
};
