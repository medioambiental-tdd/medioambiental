// variables de entorno
require('dotenv').config();
const fetch = require('node-fetch');
const API_KEY = process.env.AEMET_API_KEY;

function get_prediccion_municipio(municipio, dia){
    var json = {};

    // ...
    // lógica de API externa
    // ...

    // convertir a clase Meteo
}

async function get_prediccion_textual(zona){
    const URL = 'https://opendata.aemet.es/opendata/api/prediccion/ccaa' + '/hoy/' + zona + '/?api_key=' + API_KEY;

    try{
        var respuesta = await fetch(URL);
        var json = await respuesta.json();
    
        if(!json.datos){
            throw new Error('Error en la URL para la petición');
        }

        var resp = await fetch(json.datos);
        var datos = await resp.text();
    }catch(error){
        throw error;
    }

    return datos;
}

function get_prediccion_costa(provincia,playa){
    var json = {};

    // ...
    // lógica de API externa
    // ...
    
    // convertir a clase Meteo
}

function get_prediccion_montaña(area, dia){
    var json = {};

    // ...
    // lógica de API externa
    // ...

    // convertir a clase Meteo
}


function get_Riesgo_Incendio(){

}

module.exports = {
    get_prediccion_textual,
    get_prediccion_municipio,
    get_prediccion_costa,
    get_prediccion_montaña,
    get_Riesgo_Incendio
}