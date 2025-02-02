import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
      };
    }
  );
}

app.get("/", (req, res) => {
  res.send("server deployed");
});

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("join", (roomId) => {
    userSocketMap[socket.id] = roomId;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    socket.emit("join", clients);
    console.log(clients);
  });
  socket.on("code-change", ({ roomId, code }) => {
    console.log("code-change", code);
    socket.to(roomId).emit("recieve-changes", code);
  });
  socket.on("disconnect", () => {
    socket.to(socket.roomId).emit("userDisconnected", socket.id);
    socket.leave(socket.roomId);
    delete userSocketMap[socket.id];
    console.log("socket disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
