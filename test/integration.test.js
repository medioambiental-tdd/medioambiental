const request = require('supertest');
const app = require('../src/mocks/index');
const chai = require('chai');
const expect = chai.expect;
const operaciones = require('../src/model/operaciones');
const predicciones = require('../src/services/predicciones');
const peticiones  = require('../src/mocks/peticiones');

describe("peticiones GET", function(){
    it('deberia recibir información textual de una comunidad autónoma', function(done){
        request(app)
            .get('/tiempo/andalucia')
            .expect('Content-Type',/json/)
            .expect(200,done);
    });

    it('deberia recibir una predicción meteorológica en json de un municipio', function(done){
        request(app)
            .get('/tiempo/prediccion/Granada')
            .expect('Content-Type',/json/)
            .expect(200,done);
    });

    it('deberia recibir un mensaje de que no existe tal municipio', function(done){
        request(app)
            .get('/tiempo/prediccion/Gr')
            .end(function(err,res){
                expect('Content-Type',/json/)
                expect(res.text).to.equal("No existe tal municipio")
                expect(400,done);
                done();
            });
          
    });
});


describe('Tests para operaciones con BD', function(){
    it('Debería cargar la biblioteca y poder instanciarse',function(){
        expect(operaciones).to.exist
    });

    it('Debería poder INSERTAR datos textuales', function(){
        expect(operaciones.insertarDatosTextual('test','texto de prueba')).to.not.throw;
    });

    it('Debería poder CONSULTAR datos textuales', function(){
        operaciones.obtenerDatosTextual(function(tabla){
            expect(tabla[0]).to.have.all.keys('zona', 'texto');
        });
    });

    it('Debería poder ELIMINAR datos textuales', function(){
        expect(operaciones.eliminarDatosTextual()).to.not.throw;
    });

    it('Debería poder comprobar datos textuales', function(){
        expect(operaciones.comprobarDatosTextual(predicciones,peticiones)).to.not.throw;
    });

    it('Debería poder comprobar datos textuales', function(){
        expect(operaciones.getDatoTextual('cataluña',function(mt){
            expect(mt).to.be.an.instanceof(MeteoTextual);
        })).to.not.throw;
    });

    it('Debería poder comprobar datos textuales', function(){
        expect(operaciones.getDatoMunicipio('Sevilla',predicciones,peticiones,function(mm){
            expect(mt).to.be.an.instanceof(MeteoTextual);
        })).to.not.throw;
    });

    it('Debería poder comprobar datos textuales', function(){
        expect(operaciones.actualizarDatosMunicipio('Sevilla',predicciones,peticiones,function(mm){
            expect(mm).to.be.an.instanceof(MeteoMunicipio);
        })).to.not.throw;
    });

    it('Debería poder comprobar datos textuales', function(){
        expect(operaciones.comprobarDatosTextual()).to.not.throw;
    });

}); 