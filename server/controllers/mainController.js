const path = require("path");

exports.getHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
};

exports.getDashboardPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/pages/dashboard/dashboard.html"));
};
