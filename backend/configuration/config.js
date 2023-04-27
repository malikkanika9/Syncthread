require("dotenv").config();
const config = {
  db: {
    DB_HOST: "localhost",
    DB_NAME: "sync_thread",
    DB_USER: "postgres",
    DB_PASS: "Kanika@123",
    DB_PORT: 5432,
  },
  jwt: {
    secret: "QWrt567Hvx318",
  },
  cryptR: {
    secret: "6fa979f20126intdaa645a8f495f6d85",
  },
  time: {
    time_zone: process.env.TIME_ZONE,
  },
};
console.log("config.db>>>", config.db);
module.exports = config;
