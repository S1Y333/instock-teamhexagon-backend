<<<<<<< HEAD
require("dotenv").config();
// Update with your config settings.
=======
require('dotenv').config();

>>>>>>> 3e2d7cc8105b24494614a89c20f8921a8278a623

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_LOCAL_HOST,
<<<<<<< HEAD
    database: process.env.DB_LOCAL_NAME,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
  },
};
=======
    database: process.env.DB_LOCAL_DBNAME,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    charset: "utf8",
  },
};


>>>>>>> 3e2d7cc8105b24494614a89c20f8921a8278a623
