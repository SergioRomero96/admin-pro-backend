const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

require("dotenv").config();

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuario.route'));
app.use('/api/login', require('./routes/auth.route'));


app.listen(process.env.PORT, () =>
  console.log(`Server ready on port ${process.env.PORT}!`)
);
