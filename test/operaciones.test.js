const ops_municipio  = require('../src/model/ops_municipio');
const ops_textual    = require('../src/model/ops_textual'); 
const predicciones   = require('../src/services/predicciones');
const peticiones     = require('../src/mocks/peticiones');
const MeteoTextual   = require('../src/libs/MeteoTextual');
const MeteoMunicipio = require ('../src/libs/MeteoMunicipio');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


describe('Tests para operaciones con textual', function(){

    it('Debería cargar la biblioteca de operaciones con textual y poder instanciarse',function(){
        expect(ops_textual).to.exist
    });

    it('Debería poder insertar datos textuales', function(done){
        ops_textual.insertar('aaa','texto',function(mt){
            expect(mt).to.be.an.instanceof(MeteoTextual);

            done();
        });
    });

    it('Debería poder eliminar datos textuales', function(done){
        ops_textual.eliminar('aaa');
        done();
    });


    it('Debería poder consultar todos los datos textuales', function(done){
        ops_textual.consultarTodos(function(err,tabla){
            if(err) done(err);
            else
                done();

            expect(tabla[0]).to.have.all.keys('zona', 'texto');
        });
    });

    it('Debería poder comprobar datos textuales por ccaa', function(done){
        expect(ops_textual.consultar('gotham',predicciones,peticiones,function(mt){

            expect(mt).to.be.an.instanceof(MeteoTextual);

            var hoy = new Date().toJSON().slice(0,10);
            expect(mt).to.be.an.instanceof(MeteoTextual);
            expect(mt.getZona()).to.equal('gotham');
            expect(mt.getDia()).to.equal(hoy);
            expect(mt.getTexto()).to.be.a('string');
            done();
        })).to.not.throw;
    });

    it('Debería poder actualizar datos textuales por ccaa', async()=>{
            var mt1 = await predicciones.get_prediccion_textual('gotham',peticiones.get_datos_api_externa);
            var date = new Date();
            date.setDate(date.getDate() - 1);
            date = date.toJSON().slice(0,10);

            mt1.setDia(date);

            ops_textual.actualizar(mt1,function(mt2){                
                expect(mt2).to.be.an.instanceof(MeteoTextual);
                expect(mt2.getZona()).to.equal('gotham');
                expect(mt2.getDia()).to.equal(date);
                expect(mt2.getTexto()).to.be.a('string');

                ops_textual.consultar('gotham',predicciones,peticiones,function(mt){
                    expect(mt).to.be.an.instanceof(MeteoTextual);
        
                    var hoy = new Date().toJSON().slice(0,10);
                    expect(mt).to.be.an.instanceof(MeteoTextual);
                    expect(mt.getZona()).to.equal('gotham');
                    expect(mt.getDia()).to.equal(hoy);
                    expect(mt.getTexto()).to.be.a('string');
                    expect(ops_textual.eliminar('gotham')).to.not.throw;
                });        
            });
    });

});

describe('Tests para operaciones con municipios', function(){
    it('Debería cargar la biblioteca de operaciones con municipios y poder instanciarse',function(){
        expect(ops_municipio).to.exist
    });


    it('Debería poder actualizar los datos de un municipio', function(done){
        ops_municipio.actualizarDatos('Sevilla',predicciones,peticiones,function(mm){
            expect(mm).to.be.an.instanceof(MeteoMunicipio);
            done();
        });
    });

    it('Debería poder comprobar datos de municipio', function(done){
        expect(ops_municipio.consultar('Granada',predicciones,peticiones,function(mm){

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

            done();
        })).to.not.throw;
    });

    it('Debería poder comprobar datos de municipio', function(done){
        expect(ops_municipio.consultar('Motril',predicciones,peticiones,function(mm){
            var hoy = new Date().toJSON().slice(0,10);            
            expect(mm).to.be.an.instanceOf(MeteoMunicipio);
            expect(mm.getNombreMunicipio()).to.equal("Motril");
            expect(mm.getFecha()).to.equal(hoy);
            expect(mm.getEstadoCielo()).to.have.lengthOf(4);
            expect(mm.getProbPrecipitacion()).to.have.lengthOf(4);
            expect(mm.getCotaNieve()).to.have.lengthOf(4);
            expect(mm.getTemperatura()).to.have.lengthOf(4);
            expect(mm.getSensacionTermica()).to.have.lengthOf(4);
            expect(mm.getVelocidadViento()).to.have.lengthOf(4);
            expect(mm.getDireccionViento()).to.have.lengthOf(4);

            done();
        })).to.not.throw;
    });


    it('Debería poder insertar un municipio',async function(){
        ops_municipio.eliminar('Granada');


        var datos = await predicciones.get_prediccion_municipio('Granada',peticiones.get_datos_api_externa);
        ops_municipio.insertar(datos,function(mm){

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

        ops_municipio.eliminar('Granada');
        var datos = await predicciones.get_prediccion_municipio('Granada',peticiones.get_datos_api_externa);
    });

    it('Debería indicar que un municipio no existe',function(done){
        ops_municipio.consultar('Arkham',predicciones,peticiones,function(mm){
            expect(mm).to.equal('No existe tal municipio');
            done();
        });
    });
});