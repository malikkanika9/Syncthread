const db = require("../configuration/dbConn");

module.exports = {
  doesUserExist: async (email) => {
    return new Promise(async function (resolve, reject) {
      try {
        let data = await db.any(
          `SELECT email
          FROM users_table
          WHERE LOWER(email)=LOWER('${email}')`
        );
        if (data.length > 0) {
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
      } catch (err) {
        console.log("err========> ", err);
        reject(err);
      }
    });
  },

  register: async (userDetails) => {
    return new Promise(async function (resolve, reject) {
      try {
        const { name, email, password } = userDetails;

        let data = await db.any(
          `INSERT INTO users_table(name,email,password)
          VALUES('${name}','${email}','${password}') RETURNING id`
        );
        if (data.length > 0) {
          resolve(data);
        }
      } catch (err) {
        let errorText = common.getErrorText(err);
        let error = new Error(errorText);
        reject(error);
      }
    });
  },

  findByDetails: async (email) => {
    return new Promise(async function (resolve, reject) {
      try {
        let data = await db.any(
          `SELECT *
                  FROM users_table
                  WHERE LOWER(email)=LOWER('${email}')`
        );

        if (data.length > 0) {
          data[0].success = true;
          resolve(data[0]);
        } else {
          resolve({ success: false });
        }
      } catch (err) {
        console.log("err line 60========> ", err);
        reject(err);
      }
    });
  },

    findByDetails: async (email) => {
    return new Promise(async function (resolve, reject) {
      try {
        let data = await db.any(
          `SELECT *
                  FROM users_table
                  WHERE LOWER(email)=LOWER('${email}')`
        );

        if (data.length > 0) {
          data[0].success = true;
          resolve(data[0]);
        } else {
          resolve({ success: false });
        }
      } catch (err) {
       console.log("err============> ",err);
      }
    });
  },
};
