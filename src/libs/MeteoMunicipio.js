class MeteoMunicipio{
    constructor(nombre,fecha,estadoCielo,probPrecipitacion,cotaNieve,temperatura,sensacionTermica,velocidadViento,direccionViento){
        this.nombreMunicipio=nombre;
        this.estado_cielo=estadoCielo;
        this.prob_precipitacion=probPrecipitacion;
        this.cota_nieve=cotaNieve;
        this.temperatura=temperatura;
        this.sensacion_termica=sensacionTermica;
        this.velocidad_viento=velocidadViento;
        this.dir_viento=direccionViento;
        this.fecha=fecha;
    }

    getEstadoCielo(){
        return this.estado_cielo;
    }



    getProbPrecipitacion(){
       return this.prob_precipitacion;
    }

    getCotaNieve(){
        return this.cota_nieve;
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

    getNombreMunicipio(){
        return this.nombreMunicipio;
    }

    getFecha(){
        return this.fecha;
    }
}

module.exports = MeteoMunicipio;