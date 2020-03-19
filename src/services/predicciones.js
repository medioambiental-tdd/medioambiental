// variables de entorno
require('dotenv').config();
const API_KEY = process.env.AEMET_API_KEY;
const MeteoTextual = require('../model/MeteoTextual')
const peticiones = require('../mocks/peticiones');

async function get_prediccion_municipio(municipio,get_datos){
    const URL = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/'+municipio+'/?api_key=' + API_KEY;
    var datos=await get_datos(URL);
    var json=datos.json();

    var nombre=json[0].nombre;
    var fecha=json[0].elaborado.slice(0,10);
    var probPrecipitacion=[json[0].prediccion.prediccion.dia[0].probPrecipitacion[2].value,
                           json[0].prediccion.dia[0].probPrecipitacion[3].value,
                           json[0].prediccion.dia[0].probPrecipitacion[4].value,
                           json[0].prediccion.dia[0].probPrecipitacion[5].value,
                          ];
    var cotaNieve=[json[0].prediccion.dia[0].cotaNieveProv[2].value,
                   json[0].prediccion.dia[0].cotaNieveProv[3].value,
                   json[0].prediccion.dia[0].cotaNieveProv[4].value,
                   json[0].prediccion.dia[0].cotaNieveProv[5].value
                  ];

    var estadoCielo=[json[0].prediccion.dia[0].estadoCielo[2].descripcion,
                     json[0].prediccion.dia[0].estadoCielo[3].descripcion,
                     json[0].prediccion.dia[0].estadoCielo[4].descripcion,
                     json[0].prediccion.dia[0].estadoCielo[5].descripcion
                    ];

    var temperatura=[json[0].prediccion.dia[0].temperatura.dato[0].value,
                     json[0].prediccion.dia[0].temperatura.dato[1].value,
                     json[0].prediccion.dia[0].temperatura.dato[2].value,
                     json[0].prediccion.dia[0].temperatura.dato[3].value
                    ];

                
     var sensTermica=[json[0].prediccion.dia[0].sensTermica.dato[0].value,
                      json[0].prediccion.dia[0].sensTermica.dato[1].value,
                      json[0].prediccion.dia[0].sensTermica.dato[2].value,
                      json[0].prediccion.dia[0].sensTermica.dato[3].value
                   ];


    var velocidadViento=[json[0].prediccion.dia[0].viento[2].velocidad,
                         json[0].prediccion.dia[0].viento[3].velocidad,
                         json[0].prediccion.dia[0].viento[4].velocidad,
                         json[0].prediccion.dia[0].viento[5].velocidad
                        ];

    var direccionViento=[json[0].prediccion.dia[0].viento[2].direccion,
                        json[0].prediccion.dia[0].viento[3].direccion,
                        json[0].prediccion.dia[0].viento[4].direccion,
                        json[0].prediccion.dia[0].viento[5].direccion
                       ];

    mm= new MeteoMunicipio(nombre,fecha,estadoCielo,probPrecipitacion,cotaNieve,temperatura,sensTermica,velocidadViento,direccionViento);

    return mm;
    

    
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

get_prediccion_municipio(18087,peticiones.get_datos_api_externa_municipio)

module.exports = {
    get_prediccion_textual,
    get_prediccion_municipio,
    get_prediccion_costa,
    get_prediccion_montaña,
    get_Riesgo_Incendio
}