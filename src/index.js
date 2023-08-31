const express = require('express');

const app = express();


//Agregar metodos HTTP al servidor express


//Tipo de datos que puede entender la peticion post
app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.post('/user',(req,res)=>{
    //Como nos envia un json el cliente

    console.log(req.body)
    res.send('Nuevo usuario creado')
})



app.get('/get/:user',(req,res)=>{
    console.log(req.params.user)
    res.send(`Hello ${req.params.user}`)
})




//Request params

app.get('/add/:x/:y',(req,res)=>{
    
    const {x,y} = req.params
    const restult = parseInt(x) + parseInt(y)

    res.send(`La suma es: ${restult}`)
})



// De esta forma le doy acceso o no segun el parametro del username (:username)

app.get('/user/:username/photo',(req,res)=>{
    console.log(req.params);
    if (req.params.username === 'loba') {
        return res.send('Sos bienvenido'),{
            root:__dirname
        };
    }

    res.send('Usted no tiene acceso')
})

app.get('/isAlive',(req,res)=>{
    res.sendStatus(200)
})


app.listen(4000)
console.log(`server andando en el ${4000}`)