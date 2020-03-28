var datos = {
    status: 200,
    statusText: 'OK',
    text() { return 'Dia chungo en Gotham hoy. Se recomienda no salir al exterior.'; }
};

var datosMontaña = {
  status: 200,
  json(){
    return [{
      "seccion": [{
        "apartado": [{
          "cabecera": "Estado del cielo",
          "texto": "Intervalos nubosos.",
          "nombre": "nubosidad"
        }, {
          "cabecera": "Precipitaciones",
          "texto": "Podrán caer algunos chubascos vespertinos.",
          "nombre": "pcp"
        }, {
          "cabecera": "Tormentas",
          "texto": "No se descarta alguna ocasional.",
          "nombre": "tormentas"
        }, {
          "cabecera": "Temperaturas",
          "texto": "Mínimas sin cambios o en ligero descenso.",
          "nombre": "temperatura"
        }, {
          "cabecera": "Viento",
          "texto": "Flojo, con predominio de las componentes este y sur e intervalos de intensidad moderada en cotas altas.",
          "nombre": "viento"
        }],
        "lugar": [],
        "parrafo": [],
        "nombre": "prediccion"
      }]
    }]
  } 
};

var datosMunicipio={
    status: 200,
    json(){
        return  [ {
            "elaborado" : new Date().toJSON().slice(0,10),
            "nombre" : "Granada",
            "provincia" : "Granada",
            "prediccion" : {
              "dia" : [ {
                "probPrecipitacion" : [ {
                  "value" : 0,
                  "periodo" : "00-24"
                }, {
                  "value" : 0,
                  "periodo" : "00-12"
                }, {
                  "value" : 100,
                  "periodo" : "12-24"
                }, {
                  "value" : 0,
                  "periodo" : "00-06"
                }, {
                  "value" : 5,
                  "periodo" : "06-12"
                }, {
                  "value" : 100,
                  "periodo" : "12-18"
                }, {
                  "value" : 0,
                  "periodo" : "18-24"
                } ],
                "cotaNieveProv" : [ {
                  "value" : "",
                  "periodo" : "00-24"
                }, {
                  "value" : "",
                  "periodo" : "00-12"
                }, {
                  "value" : "2300",
                  "periodo" : "12-24"
                }, {
                  "value" : "",
                  "periodo" : "00-06"
                }, {
                  "value" : "",
                  "periodo" : "06-12"
                }, {
                  "value" : "2400",
                  "periodo" : "12-18"
                }, {
                  "value" : "",
                  "periodo" : "18-24"
                } ],
                "estadoCielo" : [ {
                  "value" : "",
                  "periodo" : "00-24",
                  "descripcion" : ""
                }, {
                  "value" : "",
                  "periodo" : "00-12",
                  "descripcion" : ""
                }, {
                  "value" : "23",
                  "periodo" : "12-24",
                  "descripcion" : "Intervalos nubosos con lluvia"
                }, {
                  "value" : "",
                  "periodo" : "00-06",
                  "descripcion" : ""
                }, {
                  "value" : "13",
                  "periodo" : "06-12",
                  "descripcion" : "Intervalos nubosos"
                }, {
                  "value" : "23",
                  "periodo" : "12-18",
                  "descripcion" : "Intervalos nubosos con lluvia"
                }, {
                  "value" : "12n",
                  "periodo" : "18-24",
                  "descripcion" : "Poco nuboso"
                } ],
                "viento" : [ {
                  "direccion" : "",
                  "velocidad" : 0,
                  "periodo" : "00-24"
                }, {
                  "direccion" : "",
                  "velocidad" : 0,
                  "periodo" : "00-12"
                }, {
                  "direccion" : "E",
                  "velocidad" : 15,
                  "periodo" : "12-24"
                }, {
                  "direccion" : "C",
                  "velocidad" : 0,
                  "periodo" : "00-06"
                }, {
                  "direccion" : "SO",
                  "velocidad" : 5,
                  "periodo" : "06-12"
                }, {
                  "direccion" : "E",
                  "velocidad" : 15,
                  "periodo" : "12-18"
                }, {
                  "direccion" : "C",
                  "velocidad" : 0,
                  "periodo" : "18-24"
                } ],
                "temperatura" : {
                  "maxima" : 22,
                  "minima" : 8,
                  "dato" : [ {
                    "value" : 9,
                    "hora" : 6
                  }, {
                    "value" : 18,
                    "hora" : 12
                  }, {
                    "value" : 17,
                    "hora" : 18
                  }, {
                    "value" : 11,
                    "hora" : 24
                  } ]
                },
                "sensTermica" : {
                  "maxima" : 22,
                  "minima" : 8,
                  "dato" : [ {
                    "value" : 9,
                    "hora" : 6
                  }, {
                    "value" : 18,
                    "hora" : 12
                  }, {
                    "value" : 17,
                    "hora" : 18
                  }, {
                    "value" : 11,
                    "hora" : 24
                  } ]
                }           
            }]
            }
        }];
    }
}


var datosPlaya={
  status: 200,
  json(){
      return [ {
        "elaborado" : new Date().toJSON().slice(0,10),
        "nombre" : "Calahonda",
        "localidad" : 18140,
        "prediccion" : {
          "dia" : [ {
            "estadoCielo" : {
              "value" : "",
              "f1" : 100,
              "descripcion1" : "despejado",
              "f2" : 100,
              "descripcion2" : "despejado"
            },
            "viento" : {
              "value" : "",
              "f1" : 220,
              "descripcion1" : "moderado",
              "f2" : 220,
              "descripcion2" : "moderado"
            },
            "oleaje" : {
              "value" : "",
              "f1" : 320,
              "descripcion1" : "moderado",
              "f2" : 320,
              "descripcion2" : "moderado"
            },
            "tMaxima" : {
              "value" : "",
              "valor1" : 19
            },
            "sTermica" : {
              "value" : "",
              "valor1" : 440,
              "descripcion1" : "fresco"
            },
            "tAgua" : {
              "value" : "",
              "valor1" : 15
            },
            "uvMax" : {
              "value" : "",
              "valor1" : 6
            },
            "fecha" : 20200326,
            "tmaxima" : {
              "value" : "",
              "valor1" : 19
            },
            "stermica" : {
              "value" : "",
              "valor1" : 440,
              "descripcion1" : "fresco"
            },
            "tagua" : {
              "value" : "",
              "valor1" : 15
            }
          } ]
        },
        "id" : 1814008
      } ];
  }
}

var datosIncendio={
   json(){
     var j={
      descripcion : "exito",
      estado : 200,
      datos : "https://opendata.aemet.es/opendata/sh/88ff3ad8",
      metadatos : "https://opendata.aemet.es/opendata/sh/fa09a9f6"
     }
     return j;
  }
}

        
function get_datos_api_externa(URL){
      // segun URL devolver datos diferentes
      if(URL.includes('ccaa'))
        return datos;
      else if(URL.includes('monta%C3%B1a')){
          return datosMontaña;
      }
      else 
      if(URL.includes('municipio')){
        return datosMunicipio;
      }else{
        if(URL.includes('playa')){
          return datosPlaya;
        }
      }
}

function get_datosIncendio_api_externa(URL){
      if(URL.includes('incendio')){
        return datosIncendio;
      }
  
}

module.exports = {
    get_datos_api_externa,
    get_datosIncendio_api_externa
}