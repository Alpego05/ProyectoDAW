require("dotenv").config();
require("./src/database/models/associations");
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const sequelize = require("./src/database/dbConfig");



app.use(cors());
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
