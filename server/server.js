const express = require("express");
const path = require("path");
const app = express();
const Port = 4000;

// Define
app.set("view engine", "ejs");

// Path
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard" , ( req , res) => {
    res.render("dashboard")
})



app.listen(Port, () => {
  console.log(`the server is running on the server on port ${Port}`);
});