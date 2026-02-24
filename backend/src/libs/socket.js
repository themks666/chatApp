import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173']
  }
})
export const getReceiverId = function(userId){
  return userSocketMap[userId]
}
const userSocketMap = {}
io.on("connection", (socket)=>{
  const userId = socket.handshake.query.userId
  if (userId) userSocketMap[userId]=socket.id
  io.emit("getConnectedUsers", Object.keys(userSocketMap))
  socket.on("disconnect", ()=>{
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    console.log("A user has been disconnected ", socket.id);
    
  })
})
export { io, app, server}