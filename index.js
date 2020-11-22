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

// Directorio público
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/hospitales', require('./routes/hospital.routes'));
app.use('/api/medicos', require('./routes/medico.routes'));
app.use('/api/todo', require('./routes/busqueda.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));


app.listen(process.env.PORT, () =>
	console.log(`Server ready on port ${process.env.PORT}!`)
);
