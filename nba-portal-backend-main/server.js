const mongoose = require("mongoose");

const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const app = require('./app')

//console.log(process.env)

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log("connection established");
  })
  .catch(() => {
    console.log("connection failed");
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
