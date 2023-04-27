
const express = require("express");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const passport = require("passport");
const helmet=require("helmet");
const logger=require("morgan");
const routes = require("./routes/index");
const Config = require("./configuration/config");
const rateLimit = require('express-rate-limit');
const app = express();
const session = require("express-session");
const cors = require("cors");
app.use(helmet.noSniff());
app.use(session({secret: Config.cryptR.secret,saveUninitialized: true,resave: true,}));
app.use(helmet.xssFilter());
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.get("/", async (req, res) => {
  return res.send({
    success: true,
    message: "Welcome to the home page",
  });
});

app.use("/api/v1", apiLimiter, routes);


const geoip = require('geoip-lite');


app.get('/location', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);

  if (geo) {
    const location = {
      latitude: geo.ll[0],
      longitude: geo.ll[1],
      city: geo.city,
      country: geo.country,
    };
    res.send(location);
  } else {
    res.send('Location not found');
  }
});



app.use(function (req, res, next) {
  next(createError(404));
});









module.exports = app