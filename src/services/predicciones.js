// variables de entorno
require('dotenv').config();
const API_KEY = process.env.AEMET_API_KEY;
const MeteoTextual = require('../model/MeteoTextual')

function get_prediccion_municipio(municipio, dia){

    // ...
    // lógica de API externa
    // ...

    // convertir a clase Meteo
}

async function get_prediccion_textual(zona, get_datos){
    const URL = 'https://opendata.aemet.es/opendata/api/prediccion/ccaa' + '/hoy/' + zona + '/?api_key=' + API_KEY;

    var datos = await get_datos(URL);
    var texto = await datos.text();

    var fecha = new Date().toJSON().slice(0,10);
    mt = new MeteoTextual(zona,fecha,texto);

    return mt;
}

function get_prediccion_costa(provincia,playa){

    // ...
    // lógica de API externa
    // ...
    
    // convertir a clase Meteo
}

function get_prediccion_montaña(area, dia){

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