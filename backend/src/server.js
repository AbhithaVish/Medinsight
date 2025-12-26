require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
// sequelize.sync({ force: true }).then(() => {