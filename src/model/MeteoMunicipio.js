    class MeteoMunicipio{
    
    constructor(){
        this.nombreMunicipio=null;
        this.codigoMunicipio=null;
        this.estado_cielo=null;
        this.prob_precipitacion=null;
        this.prob_nieve=null;
        this.temperatura=null;
        this.sensacion_termica=null;
        this.velocidad_viento=null;
        this.dir_viento=null;
        this.amanecer=null;
        this.ocaso=null;
    }

    comprobarExisteMunicipio(Municipio){
        
    }

   pedirDatosMunicipio(Municipio,dia){
       //Comprobamos que existe el municipio


        //Pedimos los datos a la API de AEMET.
       var json=get_prediccion_municipio(Municipio,dia);

        //Extraemos los datos
        
    }

    getEstadoCielo(){
        
    }

    getProbPrecipitacion(){

    }

    getProbNieve(){

    }

    getTemperatura(){

    }

    getSensacionTermica(){

    }

    getVelocidadViento(){

    }

    getDireccionViento(){

    }

    getAmanecer(){

    }

    getOcaso(){

    }

    getNombreMunicipio(){

    }

    getCodigoMunicipio(){

    }



}