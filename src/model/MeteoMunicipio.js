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
        this.fecha=null;
    }

    

    getEstadoCielo(){
        return this.estado_cielo;
    }

    getProbPrecipitacion(){
        return this.prob_precipitacion;
    }

    getProbNieve(){
        return this.prob_nieve;
    }

    getTemperatura(){
        return this.temperatura;
    }

    getSensacionTermica(){
        return this.sensacion_termica;
    }

    getVelocidadViento(){
        return this.velocidad_viento;
    }

    getDireccionViento(){
        return this.dir_viento;
    }

    getAmanecer(){
        return this.amanecer;
    }

    getOcaso(){
        return this.ocaso;
    }

    getNombreMunicipio(){
        return this.nombreMunicipio;
    }

    getCodigoMunicipio(){
        return this.codigoMunicipio;
    }



}