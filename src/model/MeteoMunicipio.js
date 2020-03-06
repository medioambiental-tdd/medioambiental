class MeteoMunicipio{
    
    constructor(){
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


   pedirDatosMunicipio(Municipio,dia){
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




}