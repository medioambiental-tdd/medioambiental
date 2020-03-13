const chai = require('chai');
const expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const predicciones  = require('../src/services/predicciones');

describe('Tests unitarios para las llamadas a APIs externas', function(){
    it('Debería cargar la biblioteca y poder instanciarse',function(){
        expect(predicciones).to.exist
    });

    /*it('Debería devolver un string como respuesta', async() =>{
        const res = await predicciones.get_prediccion_textual("and");
        expect(res).to.be.a('string');
    });*/

    it('Debería lanzar una excepcion si el código de ccaa es erróneo', async() =>{
        await expect(predicciones.get_prediccion_textual("aaa")).to.be.rejectedWith(Error);
    });
});