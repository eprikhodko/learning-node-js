const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

// create an instance of express app
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
// looks like bodyParser and express.json() works the same
// app.use(bodyParser.json());
app.use(express.json());

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: true }));

// add access to "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const server = http.createServer(app);
server.listen(3333);
