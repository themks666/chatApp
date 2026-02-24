import express from "express"
import AuthRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import cors from "cors";
import { app,server } from "./libs/socket.js"
import cookieParser from "cookie-parser"
import { connect } from "./libs/db.js";
import MessageRouter from "./routes/message.route.js";
dotenv.config()

const port = process.env.PORT || 3000;

app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}))
app.use(cookieParser())
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb"}));
app.use(express.json())
app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);

server.listen(port, () => {
	connect()
	console.log(` App listening on port ${port}`);
});
