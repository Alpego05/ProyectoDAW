require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const sequelize = require("./src/database/dbConfig");

require("./src/database/models/associations");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const apiroutes = require("./src/routes/apiRoute");
app.use("/", apiroutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor arrancado alojado en : http://localhost:${PORT}`);

  sequelize
    .sync({ force: false })
    .then(() => console.log("Tablas sincronizadas"));
});
