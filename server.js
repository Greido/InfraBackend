//Importo express
const express = require('express');
const router = express.Router();
//traemos body parser para comenzar el crud
const bodyparser = require('body-parser')
//Importo morgan
const morgan = require('morgan')
//COnfiguro dotnenv
require('dotenv').config()
//Conectandone a mongoose
const mongoose = require('mongoose')
//Conexion a DB
const user = 'juampi-user';
const password = 'loba';
const db = 'infra';
const uri = `mongodb+srv://${user}:${password}@cluster0.vd4xrh0.mongodb.net/${db}?retryWrites=true&w=majority`;
mongoose.connect(uri,)
    .then(()=>console.log('Base de datos conectada.'))
    .catch(e=> console.log(e));
//Inicio el sv express
const app = express();

//CONFIG bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:false}))
// parse application/json
app.use(bodyparser.json())
//Configuro morgan para ver detalladas las peticiones en consola
app.use(morgan('dev'))
//Asi puede aceptar JSON
app.use(express.json())

//Settings de Express
app.set('Gestion infra','Express CRUD')


//Insertar rutas con Router modular
// Api's routes

const serverRouter = require('./src/Router/servers')

app.use('/api/servers',serverRouter);


const PORT = 4000;
app.listen(PORT, () => {
    console.log('Server on port', PORT);
});

