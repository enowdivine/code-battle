import { Request, Response } from "express";
import Flood from "./flood.model";
import User from "../user/user.model";
import getDistanceFromLatLonInKm from "../../helpers/user.radius";
import sendNotification from "../../service/notification";

class FloodController {
  async addData(req: Request, res: Response) {
    try {
      if (req.body.value > 1300) {
        const users = await User.find();
        const data = {
          title: "EMERGENCY ALERT",
          message: `FLOOD ALARM TRIGGERED AROUND BUEA`,
          category: "CRITICAL",
          status: "ACTIVE",
          image: "",
        };
        // Find users within 3km radius
        const usersWithin3km = users.filter((user) => {
          const distance = getDistanceFromLatLonInKm(
            4.1464771,
            9.2611478,
            user.latitude,
            user.longitude
          );
          return distance <= 3; // Filter users within 3km radius
        });
        usersWithin3km.map((user) => sendNotification(user, data));
        res.status(200).json({
          status: 1,
          message: "success",
        });
      }
      const newData = new Flood({
        data: req.body.value,
      });
      newData
        .save()
        .then(() => {})
        .catch((err) => {
          res.status(400).json({
            status: 0,
            message: "error saving sea data",
          });
        });
    } catch (error) {
      console.error("error adding sea level data", error);
    }
  }

  async floodData(req: Request, res: Response) {
    try {
      const data = await Flood.find().sort({ createdAt: -1 });
      if (data) {
        return res.status(200).json(data);
      } else {
        return res.status(404).json({
          message: "no data found",
        });
      }
    } catch (error) {
      console.error("error fetching data", error);
    }
  }
}

export default FloodController;
