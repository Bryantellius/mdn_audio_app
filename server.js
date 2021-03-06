const express = require("express");
const http = require("http");
const path = require("path");

const app = express();

const server = http.createServer(app);

const { ExpressPeerServer } = require("peer");

const port = process.env.PORT || "8080";

const peerServer = ExpressPeerServer(server, {
  proxied: true,
  debug: true,
  path: "/myapp",
  ssl: {},
});

app.use(express.static(path.join(__dirname, "/assets")));

app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/assets/index.html");
});

server.listen(port);
console.log("Server listening on port: " + port);
