/* const express = require('express');
const morgan = require('morgan')
const app = express();
 */

//Agregar metodos HTTP al servidor express


//Tipo de datos que puede entender la peticion post
/* app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.post('/user',(req,res)=>{
    //Como nos envia un json el cliente

    console.log(req.body)
    res.send('Nuevo usuario creado')
}) */


//Request params
/* app.get('/get/:user',(req,res)=>{
    console.log(req.params.user)
    res.send(`Hello ${req.params.user}`)
})


app.get('/nombre/:nombre/age/:age',(req,res)=>{
    console.log(req.params.nombre)
    console.log(req.params.age)


    res.send(`Hola ${req.params.nombre}, tienes ${req.params.age} years`)
}) */



/* app.get('/add/:x/:y',(req,res)=>{
    
    const {x,y} = req.params
    const restult = parseInt(x) + parseInt(y)

    res.send(`La suma es: ${restult}`)
}) */



// De esta forma le doy acceso o no segun el parametro del username (:username)

/* app.get('/user/:username/photo',(req,res)=>{
    console.log(req.params);
    if (req.params.username === 'loba') {
        return res.send('Sos bienvenido'),{
            root:__dirname
        };
    }

    res.send('Usted no tiene acceso')
}) */

//Queries

/* app.get('/search',(req,res)=>{

    if (req.query.user ==='pepe') {
        res.send('Es admin esta habilitado')
    }else{
        res.send('Pagina normal')
    }
    
})  */ 


//ALL METHOD

/* app.all('/info',(req,res)=>{
    res.send('Server Info')
}) */


/* app.get('/isAlive',(req,res)=>{
    res.sendStatus(200)
}) */



//MIDDLEWARES


//ESTE ES EL LOGGER
/* app.use((req,res,next)=>{
    //Cualquier ruta puede pasar por esta funcion middleware
    console.log(`Route: ${req.url} Method:${req.method}`)//Pero aqui solo muestra un msj y no llega a ninguna ruta
    //para que llegue a una ruta debemos hacer esto
    next()//Con esta funcion pasamos a la siguiente ruta que este desp de esta
}) */



/* 
app.get('/about', (req,res)=>{
    res.send('About page')
}) */


//Middleware para proteger la autenticacion 

//Auth Function

/* app.use((req,res,next)=>{
    if (req.query.login==='pepe') {
        next()
    }else{
        res.send('No autorizado')
    }
}) */




//Instalamos middlewares creados por otros desarrolladores, lo podemos hacer con NPM
//Morgan es un logger echo por terceros que nos facilita el trabajo


/* app.use(morgan('dev'))
//Route of profile
app.get('/profile', (req,res)=>{
    res.send('Profile page')
}) */


//Route of Dashboard
/* app.get('/dashboard',(req,res)=>{

    res.send('Dashboard page')
})
app.listen(4000)
console.log(`server andando en el ${4000}`) */