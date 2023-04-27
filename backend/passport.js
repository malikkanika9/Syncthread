const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const localStrategy = require("passport-local").Strategy;
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();
const Config = require("./configuration/config");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(Config.cryptR.secret);
const bcrypt = require("bcrypt");
const userModel = require("./models/userModel");

isValidPassword = async function (newPassword, existingPassword) {
  try {
    const res = await bcrypt.compare(newPassword, existingPassword);
    return res;
  } catch (error) {
    console.log("errrrrrrrrrr",error);
  
    throw new Error(error);
  }
};
passport.use(
  "localUser",
  new localStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.findByDetails(entities.encode(email));
      
        if (Object.keys(user).length > 0) {
          const isMatch = await isValidPassword(password, user.password);
        
       
          if (!isMatch) {
            return done(null, { id: 0 });
          } else {
            done(null, user);
          }
        } else {
          return done(null, { id: 0 });
        }
      } catch (err) {
        
        done(err, false);
      }
    }
  )
);


