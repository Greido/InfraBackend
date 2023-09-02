//Importo express
const express = require('express');
//Importo morgan
const morgan = require('morgan')


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

//Configuro morgan para ver detalladas las peticiones en consola
app.use(morgan('dev'))
//Asi puede aceptar JSON
app.use(express.json())

//Settings de Express
app.set('Gestion infra','Express CRUD')


let productsCollection; //Variable para almacenar la colección de productos

//Productos
const products = []


//Configuracion de las rutas
app.get('/products',async (req,res)=>{
    try{
        const products = await productsCollection.find().toArray();
        res.json(products)
    }catch(error){
        console.log('Error al obtener los productos:', error);
        res.status(500).json({error:'Ocurrio un error en el servidor.'})
    }
});

// Definimos una ruta para manejar solicitudes POST a /products
app.post('/products', async (req,res) => {
    try{
        const {name,price} = req.body;
        if (!name || !price) {
            return res.status(400).json({error:'Nombre y precio son campos requeridos'})
        }

        const newProduct = {name,price};
        const result = await productsCollection.insertOne(newProduct);

    }catch(error){
        console.log('Error al crear el producto: ', error);
        res.status(500).json({error:'Ocurrio un error en el servidor.'})
    }

    
});

// Definimos una ruta para manejar solicitudes GET a /products/:id
app.get('/products/:id', async (req,res) => {

    try{
        const productId = ObjetID(req.params.id);
        const product = await productsCollection.findOne({_id:productId});
        
        if (product) {
            res.json(product);
        }else{
            res.status(400).json({error:'Producto no encontrado'})
        }
    
    }catch(error){
        console.log('Error al obtener el producto por ID:', error);
        res.status(500).json({error:'Ocurrio un error en el servidor.'})
    }

})

//Definimos una ruta para manejar solicitudes PUT a /products
app.put('/products/:id', async (req,res)=>{
    try{
        const productId = ObjetID(req.params.id);
        const {name,price} = req.body;
        if (!name || !price) {
            return res.status(400).json({error:'Nombre y precio es obligatorio'})
        }

        const result = await productsCollection.upDateOne(
            {_id:productId},
            {$set:{name,price}}
        );

        if (result.modifiedCount === 1) {
            res.json({message:'Producto actualizado correctamente'})
        } else{
            res.status(404).json({error:'Producto no encontrado para actualizar'})
        }

    }catch(error){
        console.log('Error al actualizar producto: ',error )
        res.status(500).json({error:'Ocurrio un error en el servidor'})
    }
})


// Definimos una ruta para manejar solicitudes DELETE a /products/:id
app.delete('/products/:id', async (req,res)=>{

    try{
        const productId = ObjetID(req.params.id);
        const result = await productsCollection.deleteOne({_id:productId});
    
        if (result.deleteCount === 1) {
            res.send('Producto eliminado exitosamente.')
        } else{
            res.status(400).json({error:'Producto no encontrado para eliminar.'})
        }
    } catch (error){
        console.log('Error al eliminar el producto: ',error);
        res.status(500).json({error:'Ocurrio un error en el servidor'})
    }
});


//El sv se abre en el puerto 4000 (o cualquier otro número de puerto)
const PORT = 4000;
app.listen(PORT, () => {
    console.log('Server on port', PORT);
});

// Manejo de cierre de la conexión a la base de datos al apagar el servidor
process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log('Conexión a la base de datos cerrada');
        process.exit(0);
    } catch (error) {
        console.error('Error al cerrar la conexión a la base de datos:', error);
        process.exit(1);
    }
});

// Muestra un mensaje indicando que el servidor está en funcionamiento
console.log(`Server is running on port ${PORT}`);