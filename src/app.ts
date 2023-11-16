import express, { Request, Response } from "express";
import bodyParser = require("body-parser");
import dbConnect from "./config/db";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import axios from "axios";
import userRoutes from "./routers/user/user.routes";
import alarmRoutes from "./routers/warning/warning.routes";
import floodRoutes from "./routers/flood/flood.routes";

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
app.use(`/api/${process.env.API_VERSION}/alarm`, alarmRoutes);
app.use(`/api/${process.env.API_VERSION}/flood`, floodRoutes);

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

setInterval(async function () {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=7.3697&lon=12.3547&appid=9f9cd801aa64ebf74fa4e692feab6888"
  );
  if (response) {
    const data = { value: response.data.main.sea_level };
    console.log(data);
    const res = axios.post(
      "https://code-battle-4dabfab863b2.herokuapp.com/api/v1/flood/add-data",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("resrrrrrrrrrrrr", res);
    return;
  }
}, 5000); // every 30 minutes

const PORT: any = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}, 🚀`);
});
