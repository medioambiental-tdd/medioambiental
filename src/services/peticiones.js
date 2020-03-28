// variables de entorno
require('dotenv').config();
const fetch = require('node-fetch');

async function get_datos_api_externa(URL){
    try{
        var respuesta = await fetch(URL);
        var json = await respuesta.json();
        if(!json.datos){
            throw new Error('Error en la URL para la petición');
        }

        var resp = await fetch(json.datos);
    }catch(error){
        throw error;
    }

    return resp;
}

async function get_datosIncendio_api_externa(URL){
    try{
        var respuesta = await fetch(URL);
        var json = await respuesta.json();
        if(!json.datos){
            throw new Error('Error en la URL para la petición');
        }

       
    }catch(error){
        throw error;
    }

    return json;
}

module.exports = {
    get_datos_api_externa,
    get_datosIncendio_api_externa
}