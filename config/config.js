require("dotenv").config();

module.exports = 
{
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: "groceries_db",
//     host: process.env.DB_HOST,
//     dialect: "mongo",
//     operatorsAliases: false
//   },
  production: {
    use_env_variable: "MONGO_DATABASE",
    dialect: "mongodb",
    operatorsAliases: false
  },
  seedProduction: {
    use_env_variable: "MONGO_DATABASE",
    dialect: "mongo",
    operatorsAliases: false,
  }
};