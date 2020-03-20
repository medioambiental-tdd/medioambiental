const request = require('supertest');
const app = require('../src/mocks/index');
const chai = require('chai');
const expect = chai.expect;

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