import { Request, Response } from "express";
import Flood from "./flood.model";

class FloodController {
  async addData(req: Request, res: Response) {
    try {
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
