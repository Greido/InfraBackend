const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serversSchema = new Schema({
    nombre: String,
    ipPrivada: String,
    ipPublica: String,
    user: String,
    password: String,
});

//Modelo
const Server = mongoose.model('server',serversSchema);

module.exports = Server;