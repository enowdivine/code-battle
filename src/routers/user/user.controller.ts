import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";
import User from "./user.model";
import { welcomeEmail } from "./templates/emails";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(409).json({
          message: "email already exist",
        });
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      newUser
        .save()
        .then((response) => {
          const token: string = jwt.sign(
            {
              id: response._id,
              username: response.username,
              email: response.email,
            },
            process.env.JWT_SECRET as string
          );
          const url = `${process.env.SERVER_URL}/api/${process.env.API_VERSION}/user/verification/${token}`;
          res.status(201).json({
            message: "success, check email",
            token,
          });
        })
        .catch((err) => {
          res.status(500).json({
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
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (user.emailConfirmed === false) {
          return res.status(401).json({
            message: "verify email to login",
          });
        }
        bcrypt.compare(
          req.body.password,
          user.password!,
          (err: any, result: any) => {
            if (err) {
              return res.status(401).json({
                message: "authentication failed",
              });
            }
            if (result) {
              const token: string = jwt.sign(
                {
                  id: user._id,
                  username: user.username,
                  email: user.email,
                },
                process.env.JWT_SECRET as string
              );
              return res.status(200).json({
                message: "login successful",
                token: token,
              });
            }
            res.status(401).json({
              message: "authentication failed",
            });
          }
        );
      } else {
        return res.status(401).json({
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
          username: req.body.username,
          email: req.body.email,
          bio: req.body.bio,
          avatar: req.body.avatar,
          country: req.body.country,
        },
      }
    );
    if (user.acknowledged) {
      const newuser = await User.findOne({ _id: req.params.id });
      const token: string = jwt.sign(
        {
          id: newuser?._id,
          username: newuser?.username,
          email: newuser?.email,
        },
        process.env.JWT_SECRET as string
      );
      res.status(200).json({
        message: "update successful",
        token: token,
      });
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  }

  async user(req: Request, res: Response) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (user) {
        return res.status(200).json({
          user,
        });
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
        return res.status(200).json({
          users,
        });
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
