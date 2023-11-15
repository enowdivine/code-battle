import express, { Request, Response } from "express";
import bodyParser = require("body-parser");
import dbConnect from "./config/db";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
// api imports
import userRoutes from "./routers/user/user.routes";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

dotenv.config();
const app = express();
const server: any = http.createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//     credentials: true,
//   },
// });
dbConnect();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(`/api/${process.env.API_VERSION}/user`, userRoutes);
app.use(`/api/${process.env.API_VERSION}/alarm`, userRoutes);

// let socketID: any;
// io.on("connection", async (socket: any) => {
//   console.log("New participant connected");
//   socket.on("join", (room: any) => {
//     socket.join(room);
//     socketID = socket.id;
//     console.log(`${socket.id} joined ${room}`);
//   });
// });

app.get("/", (req: Request, res: Response) => {
  res.send("Code Battle 🚀");
});

const PORT: any = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}, 🚀`);
});
