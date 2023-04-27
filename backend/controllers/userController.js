const Config = require("../configuration/config");
require('dotenv').config();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(Config.cryptR.secret);
const userModel = require("../models/userModel");

const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(1);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
UserLoginToken = (userData) => {
  return JWT.sign(
    {
      iss: "PracticeWork",
      sub: userData.id,
      name: userData.name,
      email: userData.email,
      ag: userData.userAgent,
      iat: Math.round(new Date().getTime() / 1000),
      exp: Math.round(new Date().getTime() / 1000) + 24 * 60 * 60,
    },
    Config.jwt.secret
  );
};

module.exports ={
    register: async (req, res, next) => {
    try {
      const {name, email, password } = req.body;
      let userDetails = {
        name: entities.encode(name),
        email: entities.encode(email),
        password: encryptPassword(password),
      };
      const data = await userModel.register(userDetails);
      if (data.length > 0) {
        res
          .status(201)
          .json({
            status: 1,
            data: data,
            message: "User Registered Successfully.",
          })
          .end();
      } else {
        let returnErr = {
          status: 2,
          message: "User cann't be added",
        };
        res.status(400).json(returnErr).end();
      }
    } catch (err) {
     console.log("error",err)
    }
  },
  handleLogin: async (req, res, next) => {
    if (Number.isInteger(req.user.id) && req.user.id > 0) {
      next();
    } else {
      const errData = { password: "Invalid login details" };
      return res.status(400).json({ status: 2, errors: errData });
    }
  },
    login: async (req, res, next) => {
    try {
      const { email } = req.body;
      let userDetails = {
        email: entities.encode(email),
      };
      const data = await userModel.findByDetails(userDetails.email);
      console.log("data=======>",data);
      
      if (Object.keys(data).length > 0) {
        let userData = {
          id: cryptr.encrypt(data.id),
          name: entities.encode(data.name),
          email: entities.encode(data.email),
          userAgent: cryptr.encrypt(req.get("User-Agent")),
        };
        // console.log("user data line 113 ========> ",userData);
        const token = UserLoginToken(userData);
        res
          .status(200)
          .json({
            status: 1,
            token: token,
            message: "logged in",
          })
          .end();
      } else {
        let returnErr = {
          status: 2,
          errors: "Failed to add Password",
        };
        res.status(400).json(returnErr).end();
      }
    } catch (err) {
      console.log("err========> ",err)
    }
  },
}