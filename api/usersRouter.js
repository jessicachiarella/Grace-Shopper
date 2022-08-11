const express = require("express");
const bcrypt = require("bcrypt");
const usersRouter = express.Router();
const {createUser,getUserByEmail,} = require("../db/index");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

usersRouter.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      if (password.length < 8) {
        next({
          error: "ShortPassword",
          name: "ShortPasswordError",
          message: "Password Too Short!",
        });
      }
      const _user = await getUserByEmail(email);
  
      if (_user) {
        next({
          error: "UserExists",
          name: "UserExistsError",
          message: `${email} is already taken.`,
        });
      }
  
      const user = await createUser({
        username,
        password,
      });
  
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
  
      res.send({
        message: "thank you for signing up",
        token: token,
        user: user,
      });
    } catch ({ error, name, message }) {
      next({ error, name, message });
    }
  });
  
  usersRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a email and password",
      });
    }
  
    try {
      const user = await getUserByEmail(email);
      const hashedPassword = user.password
      if (user && await bcrypt.compare(password, hashedPassword)) {
        
        const newToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1w" }
        );
        res.send({ user: user, token: newToken, message: "you're logged in!" });
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "Email or password is incorrect",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
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
    