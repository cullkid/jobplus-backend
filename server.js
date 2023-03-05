require("dotenv").config();

const app = require("./src/app");

// const http = require("http");
// const WebSocket = require("ws");

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json("Hello World!");
});

// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server, path: "/notifications" });

// wss.on("connection", (ws) => {
//   console.log("WebSocket client connected.");
//   ws.on("message", (message) => {
//     console.log(`Received message: ${message}`);
//   });
// });

// wss.on("connection", (ws) => {
//   console.log("WebSocket client connected");

//   ws.send("Welcome to the WebSocket server!");

//   ws.on("message", (message) => {
//     console.log(`Received message: ${message}`);
//   });

//   ws.on("close", () => {
//     console.log("WebSocket client disconnected");
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
