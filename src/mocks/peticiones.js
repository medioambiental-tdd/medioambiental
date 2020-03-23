var datos = {
    status: 200,
    statusText: 'OK',
    text() { return 'Dia chungo en Gotham hoy. Se recomienda no salir al exterior.'; }
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
        
function get_datos_api_externa(URL){
    // segun URL devolver datos diferentes
    if(URL.includes('ccaa'))
      return datos;
    else 
      return datosMunicipio;
}

module.exports = {
    get_datos_api_externa
}