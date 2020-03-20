// variables de entorno
require('dotenv').config();
const fetch = require('node-fetch');

async function get_datos_api_externa(URL){
    try{
        var respuesta = await fetch(URL);
        var json = await respuesta.json();
        console.log(URL);
        if(!json.datos){
            throw new Error('Error en la URL para la petición');
        }

        var resp = await fetch(json.datos);
    }catch(error){
        throw error;
    }

    return resp;
}

module.exports = {
    get_datos_api_externa
}