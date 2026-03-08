require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

// Sync Database and Start Server
sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`✅ Server running on port ${process.env.PORT}`)
  );
}).catch(err => {
  console.error("❌ Database sync failed:", err);
});