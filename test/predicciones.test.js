const chai = require('chai');
const expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const predicciones  = require('../src/services/predicciones');
const peticiones = require('../src/mocks/peticiones');
const MeteoTextual = require('../src/libs/MeteoTextual');
const MeteoMunicipio = require ('../src/libs/MeteoMunicipio');

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
        expect(mm.getNombreMunicipio()).to.equal("Granada");
        expect(mm.getFecha()).to.equal(hoy);
        expect(mm.getEstadoCielo()).to.have.lengthOf(4);
        expect(mm.getProbPrecipitacion()).to.have.lengthOf(4);
        expect(mm.getCotaNieve()).to.have.lengthOf(4);
        expect(mm.getTemperatura()).to.have.lengthOf(4);
        expect(mm.getSensacionTermica()).to.have.lengthOf(4);
        expect(mm.getVelocidadViento()).to.have.lengthOf(4);
        expect(mm.getDireccionViento()).to.have.lengthOf(4);
    });
});