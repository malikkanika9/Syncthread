const userModel = require("../models/userModel")

module.exports ={
   checkExistingUser: async (req, res, next) => {
    try {
      const { email } = req.body;
      const doesUserExist = await userModel.doesUserExist(email);
      let error = "";
      if (doesUserExist.success) {
        error = "User already exist.";
        let returnErr = { status: 2, errors: error };
        return res.status(400).json(returnErr);
      } else {
        next();
      }
    } catch (err) {
     
     console.log("error===>",err)
    }
  },
}