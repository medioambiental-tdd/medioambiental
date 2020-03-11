<<<<<<< HEAD
// variables de entorno
require('dotenv').config();
const fetch = require('node-fetch');
const API_KEY = process.env.AEMET_API_KEY;


function get_prediccion_municipio(municipio, dia){
=======
function get_prediccion_municipio(codigoMunicipio, dia){
>>>>>>> ad8d644cd5895a44940c2173ce4bdca704edd6f7
    var json = {};

    // ...
    // lógica de API externa
    // ...

    // convertir a clase Meteo
}

async function get_prediccion_textual(zona,dia){
    const URL = 'https://opendata.aemet.es/opendata/api/prediccion/' + zona + '/' + dia + '/?api_key=' + API_KEY;

    const respuesta = await fetch(URL);
    const json = await respuesta.json();

    const resp = await fetch(json.datos);
    const datos = await resp.text();

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

<<<<<<< HEAD
module.exports = get_prediccion_textual
=======
function get_Riesgo_Incendio(){


}_
>>>>>>> ad8d644cd5895a44940c2173ce4bdca704edd6f7
