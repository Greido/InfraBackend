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

//Importo modelo

const Mouse = require('./src/models/mice')

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


let productsCollection; //Variable para almacenar la colección de productos

//Productos
const products = []


//Insertar rutas con Router modular
// Api's routes
app.use('/',require('./src/Router/Rutasweb'))
app.use('/products',require('./src/Router/Productos'))
app.use('/create/server',require('./src/Router/servers'))



//Routa con Router


router.get('/mice', async (req,res)=>{
    try{

        const productoMiceDB = await Mouse.find();
        console.log(productoMiceDB);


        res.render('mice'),{
            ProductMouse: productoMiceDB
        }

    }catch (error){
        
        res.send('Error');
        res.status(500).json({error:'Error en base de datos'})
        console.log(error)
    }
})



const PORT = 4000;
app.listen(PORT, () => {
    console.log('Server on port', PORT);
});

