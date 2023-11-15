import { Request, Response } from "express";
import Warning from "./warning.model";
import User from "../user/user.model";
import getDistanceFromLatLonInKm from "../../helpers/user.radius";
import sendNotification from "../../service/notification";

class WarningController {
  async alarm_system(req: Request, res: Response) {
    try {
      const ALERT = req.body.ALERT;
      const givenLatitude = req.body.latitude;
      const givenLongitude = req.body.longitude;
      const users = await User.find();

      // Find users within 3km radius
      const usersWithin3km = users.filter((user) => {
        const distance = getDistanceFromLatLonInKm(
          givenLatitude,
          givenLongitude,
          user.latitude,
          user.longitude
        );
        return distance <= 2; // Filter users within 2km radius
      });

      if (ALERT === "FIRE") {
        const data = {
          title: "EMERGENCY ALERT",
          message: `FIRE ALARM TRIGGERED AROUND ${req.body.location}`,
          category: "CRITICAL",
          status: "ACTIVE",
          image: "",
        };
        const newAlert = new Warning({
          title: data.title,
          message: data.message,
          category: data.category,
          location: req.body.location,
          status: data.status,
        });
        newAlert
          .save()
          .then(() => {
            usersWithin3km.map((user) => sendNotification(user, data));
          })
          .catch((err) => {
            res.status(400).json({
              status: 0,
              message: err,
            });
          });
      }
      if (ALERT === "CAR_ACCIDENT") {
        const data = {
          title: "EMERGENCY ALERT",
          message: `CAR ACCIDENT ALARM TRIGGERED AROUND ${req.body.location}`,
          category: "CRITICAL",
          status: "ACTIVE",
          image: "",
        };
        const newAlert = new Warning({
          title: data.title,
          message: data.message,
          category: data.category,
          location: req.body.location,
          status: data.status,
        });
        newAlert
          .save()
          .then(() => {
            usersWithin3km.map((user) => sendNotification(user, data));
          })
          .catch((err) => {
            res.status(400).json({
              status: 0,
              message: err,
            });
          });
      }
      if (ALERT === "FLOOD") {
        const data = {
          title: "EMERGENCY ALERT",
          message: `FLOOD ALARM TRIGGERED AROUND ${req.body.location}`,
          category: "CRITICAL",
          status: "ACTIVE",
          image: "",
        };
        const newAlert = new Warning({
          title: data.title,
          message: data.message,
          category: data.category,
          location: req.body.location,
          status: data.status,
        });
        newAlert
          .save()
          .then(() => {
            usersWithin3km.map((user) => sendNotification(user, data));
          })
          .catch((err) => {
            res.status(400).json({
              status: 0,
              message: err,
            });
          });
      }
      if (ALERT === "EARTHQUAKES") {
        const data = {
          title: "EMERGENCY ALERT",
          message: `EARTHQUAKES ALARM TRIGGERED AROUND ${req.body.location}`,
          category: "CRITICAL",
          status: "ACTIVE",
          image: "",
        };
        const newAlert = new Warning({
          title: data.title,
          message: data.message,
          category: data.category,
          location: req.body.location,
          status: data.status,
        });
        newAlert
          .save()
          .then(() => {
            usersWithin3km.map((user) => sendNotification(user, data));
          })
          .catch((err) => {
            res.status(400).json({
              status: 0,
              message: err,
            });
          });
      }
      if (ALERT === "LANDSLIDE") {
        const data = {
          title: "EMERGENCY ALERT",
          message: `LANDSLIDE ALARM TRIGGERED AROUND ${req.body.location}`,
          category: "CRITICAL",
          status: "ACTIVE",
          image: "",
        };
        const newAlert = new Warning({
          title: data.title,
          message: data.message,
          category: data.category,
          location: req.body.location,
          status: data.status,
        });
        newAlert
          .save()
          .then(() => {
            usersWithin3km.map((user) => sendNotification(user, data));
          })
          .catch((err) => {
            res.status(400).json({
              status: 0,
              message: err,
            });
          });
      }
      if (ALERT === "OVERFLOW") {
        const data = {
          title: "EMERGENCY ALERT",
          message: `OVERFLOW ALARM TRIGGERED AROUND ${req.body.location}`,
          category: "CRITICAL",
          status: "ACTIVE",
          image: "",
        };
        const newAlert = new Warning({
          title: data.title,
          message: data.message,
          category: data.category,
          location: req.body.location,
          status: data.status,
        });
        newAlert
          .save()
          .then(() => {
            usersWithin3km.map((user) => sendNotification(user, data));
          })
          .catch((err) => {
            res.status(400).json({
              status: 0,
              message: err,
            });
          });
      }
    } catch (error) {
      console.error("error in fire alarm system");
    }
  }
}

export default WarningController;
