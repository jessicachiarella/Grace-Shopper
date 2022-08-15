require("dotenv").config()
const express = require("express");
const bcrypt = require("bcrypt");
const usersRouter = express.Router();
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const {createUser,getUserByEmail} = require("../db/index");


usersRouter.post("/register", async (req, res, next) => {
  const { email, password, fullname } = req.body;
  console.log(req.body, "email password fullname")
  try {
    const _user = await getUserByEmail(email);
    console.log(_user, "get user by email")

    if (_user) {
      res.status(401);
      next({
        name: "UserTakenError",
        message: `User ${email} is already taken.`,
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: "PasswordTooShortError",
        message: "Password Too Short!",
      });
    } else {
      const user = await createUser({
        email,
        password,
        fullname
      });
      console.log(user, "FINAL USER")
      

      if (!user) {
        res.status(400);
        next({
          name: "UserCreationError",
          message: "Bad Request",
        });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: email,
          },
          JWT_SECRET,
          {
            expiresIn: "1w",
          }
        );
        console.log(token, "THIS IS THE TOKEN")
        

        res.send({
          user,
          message: "thank you for signing up",
          token,
        });
        console.log(res.send, "THANK YOU FOR SIGNING UP")
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

  
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body, "email and password")

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a email and password",
    });
  }

  try {
    const user = await getUserByEmail(email);
    console.log(user, "THIS IS THE USER")
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ user, message: "you're logged in!", token: `${token}` });
      console.log(token, "THIS IS THE TOKEN")
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "email or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
    try {
      if (req.user) {
        res.send(req.user);
      } else {
        res
          .status(401)
          .send({
            error: "401 - Unauthorized",
            message: "You must be logged in to perform this action",
            name: "UnauthorizedError",
          });
      }
    } catch (error) {
      next(error);
    }
  });

  module.exports = usersRouter;
    