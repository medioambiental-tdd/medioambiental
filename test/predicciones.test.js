const chai = require('chai');
const expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const predicciones  = require('../src/services/predicciones');
const peticiones = require('../src/services/peticiones_mock');
const MeteoTextual = require('../src/model/MeteoTextual');

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

    it('Debería devolver un objeto de la clase MeteoTextual con datos válidos', async() =>{
        mt = await predicciones.get_prediccion_textual('and',peticiones.get_datos_api_externa);

        expect(mt).to.be.an.instanceof(MeteoTextual);
        expect(mt.getZona()).to.equal('and');
        expect(mt.getDia()).to.be.a('string');
        expect(mt.getTexto()).to.be.a('string');
    });
});