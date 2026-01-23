import express from "express"
import AuthRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import cors from "cors";

import cookieParser from "cookie-parser"
import { connect } from "./libs/db.js";
import MessageRouter from "./routes/message.route.js";
dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser())
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}))
app.use(express.json())
app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);

app.listen(port, () => {
	connect()
	console.log(` App listening on port ${port}`);
});
