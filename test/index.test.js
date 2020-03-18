const request = require('supertest');
app = require('../src/mocks/index');

describe("peticiones GET", function(){
    it('deberia recibir información textual de una comunidad autónoma', function(done){
        request(app)
            .get('/tiempo/andalucia')
            .expect('Content-Type',/json/)
            .expect(200,done);
    });
});