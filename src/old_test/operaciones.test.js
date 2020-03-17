const chai = require('chai');
const expect = chai.expect;
const operaciones  = require('../model/operaciones');

describe('Tests unitarios para operaciones con BD', function(){
    it('Debería cargar la biblioteca y poder instanciarse',function(){
        expect(operaciones).to.exist
    });

    it('Debería poder insertar datos textuales', function(){
        expect(operaciones.insertarDatosTextual('test','texto de prueba')).to.not.throw;
    });

    it('Debería poder consultar datos textuales', function(){
        operaciones.obtenerDatosTextual(function(tabla){
            expect(tabla[0]).to.have.all.keys('zona', 'texto');
        });
    });

    it('Debería poder eliminar datos textuales', function(){
        expect(operaciones.eliminarDatosTextual()).to.not.throw;
    });
});