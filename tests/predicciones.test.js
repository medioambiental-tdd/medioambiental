const chai = require('chai');
const expect = chai.expect;
const predicciones  = require('../services/predicciones');

describe('Tests unitarios para las llamadas a APIs externas', function(){
    it('Debería cargar la biblioteca y poder instanciarse',function(){
        expect(predicciones).to.exist
    })

    it('Debería devolver un string como respuesta', async() =>{
        const res = await predicciones("nacional","hoy");
        expect(res).to.be.a('string');
    })
});