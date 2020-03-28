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

    it('debería recibir una prediccion meteorológica de montaña', function(done){
        request(app)
            .get('/tiempo/montaña/monte_test')
            .expect('Content-Type',/json/)
            .expect(200,done);
    });

    it('deberia recibir información sobre la calidad del aire', function(done){
        request(app)
            .get('/contaminacion')
            .end(function(err,res){
                expect('Content-Type',"text/html")
                expect(res.text).to.equal("24-03-2020 00:10 SO2(001): +00000.77 ug/m3")
                expect(200,done);
                done();
            });
    });

    it('deberia recibir una predicción meteorológica en json de una playa', function(done){
        request(app)
            .get('/tiempo/prediccion/playa/Calahonda')
            .expect('Content-Type',/json/)
            .expect(200,done);
    });

    it('deberia recibir un mensaje de que no existe tal playa', function(done){
        request(app)
            .get('/tiempo/prediccion/playa/c')
            .end(function(err,res){
                expect('Content-Type',/json/)
                expect(res.text).to.equal("No existe tal playa")
                expect(400,done);
                done();
            });
          
    });

    it('deberia recibir un mapa de incendio correcto', function(done){
        request(app)
            .get('/incendio/Canarias')
            .expect('Content-Type',/html/)
            .expect(200,done);
    });

   

    it('deberia recibir un mensaje de que no existe tal incendio', function(done){
        request(app)
            .get('/incendio/ca')
            .end(function(err,res){
                expect('Content-Type',/json/)
                expect(res.text).to.equal("No existe tal mapa de incendio");
                expect(400,done);
                done();
            });
          
    });
});