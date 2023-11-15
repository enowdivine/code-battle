import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";
import User from "./user.model";
import { welcomeEmail } from "./templates/emails";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await User.findOne({ phone: req.body.phone });
      if (user) {
        return res.status(409).json({
          message: "user already exist",
        });
      }
      const newUser = new User({
        phone: req.body.phone,
      });
      newUser
        .save()
        .then((response) => {
          const token: string = jwt.sign(
            {
              id: response._id,
              phone: response.phone,
            },
            process.env.JWT_SECRET as string
          );
          res.status(201).json({
            status: 1,
            message: "success",
            token: token,
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: 0,
            message: "error creating user",
            error: err,
          });
        });
    } catch (error) {
      console.error("error in user registration", error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await User.findOne({ phone: req.body.phone });
      if (user) {
        const token: string = jwt.sign(
          {
            id: user._id,
            phone: user.phone,
          },
          process.env.JWT_SECRET as string
        );
        return res.status(200).json({
          status: 1,
          message: "login successful",
          token: token,
        });
      } else {
        return res.status(401).json({
          status: 0,
          message: "authentication failed",
        });
      }
    } catch (error) {
      console.error("user login error", error);
      return res.status(500);
    }
  }

  async update(req: Request, res: Response) {
    const user = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          phone: req.body.phone,
        },
      }
    );
    if (user.acknowledged) {
      const newuser = await User.findOne({ _id: req.params.id });
      const token: string = jwt.sign(
        {
          id: newuser?._id,
          phone: newuser?.phone,
        },
        process.env.JWT_SECRET as string
      );
      res.status(200).json({
        status: 1,
        message: "update successful",
        token: token,
      });
    } else {
      res.status(404).json({
        status: 0,
        message: "user not found",
      });
    }
  }

  async user(req: Request, res: Response) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({
          message: "user not found",
        });
      }
    } catch (error) {
      console.error("error fetching user", error);
    }
  }

  async users(req: Request, res: Response) {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      if (users) {
        return res.status(200).json(users);
      } else {
        return res.status(404).json({
          message: "no user found",
        });
      }
    } catch (error) {
      console.error("error fetching users", error);
    }
  }
}

export default UserController;
