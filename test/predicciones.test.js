const chai            = require('chai');
const expect          = chai.expect;
var chaiAsPromised    = require("chai-as-promised");
chai.use(chaiAsPromised);
const predicciones    = require('../src/services/predicciones');
const peticiones      = require('../src/mocks/peticiones');
const MeteoTextual    = require('../src/libs/MeteoTextual');
const MeteoMunicipio  = require('../src/libs/MeteoMunicipio');
const MeteoMontaña    = require('../src/libs/MeteoMontaña');
const MeteoPlaya      = require('../src/libs/MeteoPlaya');
const MeteoIncendio      = require('../src/libs/MeteoIncendio');


describe('Tests unitarios para las llamadas a APIs externas', function(){
    it('Debería cargar la biblioteca de predicciones y poder instanciarse',function(){
        expect(predicciones).to.exist
    });

    it('Debería cargar la biblioteca de peticiones y poder instanciarse',function(){
        expect(peticiones).to.exist
    });

    it('Debería cargar la clase MeteoTextual y poder instanciarse',function(){
        expect(MeteoTextual).to.exist
    });

    it('Debería cargar la clase MeteoMunicipio y poder instanciarse',function(){
        expect(MeteoMunicipio).to.exist
    });

    it('Debería cargar la clase MeteoMontaña y poder instanciarse',function(){
        expect(MeteoMontaña).to.exist
    });

    it('Debería cargar la clase MeteoPlaya y poder instanciarse',function(){
        expect(MeteoPlaya).to.exist
    });


    it('Debería cargar la clase MeteoIncendio y poder instanciarse',function(){
        expect(MeteoIncendio).to.exist
    });

    it('Debería devolver un objeto de la clase MeteoTextual con datos válidos', async() =>{
        mt = await predicciones.get_prediccion_textual('and',peticiones.get_datos_api_externa);
        var hoy = new Date().toJSON().slice(0,10);

        expect(mt).to.be.an.instanceof(MeteoTextual);
        expect(mt.getZona()).to.equal('and');
        expect(mt.getDia()).to.equal(hoy);
        expect(mt.getTexto()).to.be.a('string');
    });

    it('Debería devolver un objeto de la clase MeteoMunicipio con datos válidos',async()=>{
        mm= await predicciones.get_prediccion_municipio(18087,peticiones.get_datos_api_externa);
        var hoy = new Date().toJSON().slice(0,10);
        
        expect(mm).to.be.an.instanceOf(MeteoMunicipio);
        expect(mm.getNombreMunicipio()).to.equal("municipio_test");
        expect(mm.getFecha()).to.equal(hoy);
        expect(mm.getEstadoCielo()).to.have.lengthOf(4);
        expect(mm.getProbPrecipitacion()).to.have.lengthOf(4);
        expect(mm.getCotaNieve()).to.have.lengthOf(4);
        expect(mm.getTemperatura()).to.have.lengthOf(4);
        expect(mm.getSensacionTermica()).to.have.lengthOf(4);
        expect(mm.getVelocidadViento()).to.have.lengthOf(4);
        expect(mm.getDireccionViento()).to.have.lengthOf(4);
    });

    it('Debería devolver un objeto de la clase MeteoMontaña con datos válidos', async() =>{
        mt = await predicciones.get_prediccion_montaña('Monte Test','mt',peticiones.get_datos_api_externa);
        var hoy = new Date().toJSON().slice(0,10);

        expect(mt).to.be.an.instanceof(MeteoMontaña);
        expect(mt.getNombre()).to.equal('Monte Test');
        expect(mt.getEstadoCielo()).to.equal('Intervalos nubosos.');
        expect(mt.getPrecipitaciones()).to.equal('Podrán caer algunos chubascos vespertinos.');
        expect(mt.getTormentas()).to.equal('No se descarta alguna ocasional.');
        expect(mt.getTemperaturas()).to.equal('Mínimas sin cambios o en ligero descenso.');
        expect(mt.getFecha()).to.equal(hoy);

        mt.setFecha("2020-03-21");
        expect(mt.getFecha()).to.equal("2020-03-21");
    });


    it('Debería devolver un objeto de la clase MeteoPlaya con datos válidos',async()=>{
        mp= await predicciones.get_prediccion_playa(1814008,peticiones.get_datos_api_externa);
        var hoy = new Date().toJSON().slice(0,10);
        
        expect(mp).to.be.an.instanceOf(MeteoPlaya);
        expect(mp.getNombrePlaya()).to.equal("Calahonda");
        expect(mp.getFecha()).to.equal(hoy);
        expect(mp.getEstadoCielo()).to.have.lengthOf(2);
        expect(mp.getOleaje()).to.have.lengthOf(2);
        expect(mp.getViento()).to.have.lengthOf(2);
        expect(mp.getTempAgua()).to.equal(15);
        expect(mp.getTempMax()).to.equal(19);


    });

    it('Debería devolver un objeto de la clase MeteoIncendio con datos válidos',async()=>{
        gi= await predicciones.get_Riesgo_Incendio('c',peticiones.get_datosIncendio_api_externa);
        var hoy = new Date().toJSON().slice(0,10);
        
        expect(gi).to.be.an.instanceOf(MeteoIncendio);
        expect(gi.getZona()).to.equal("Canarias");
        expect(gi.getFecha()).to.equal(hoy);
        expect(gi.getGrafico()).to.be.a('String');

    });
});