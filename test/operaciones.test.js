const ops_municipio  = require('../src/model/ops_municipio');
const ops_textual    = require('../src/model/ops_textual'); 
const ops_montaña    = require('../src/model/ops_montaña');
const predicciones   = require('../src/services/predicciones');
const peticiones     = require('../src/mocks/peticiones');
const MeteoTextual   = require('../src/libs/MeteoTextual');
const MeteoMunicipio = require ('../src/libs/MeteoMunicipio');
const MeteoMontaña   = require ('../src/libs/MeteoMontaña');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


describe('Tests para operaciones con textual', function(){
    it('Debería cargar la biblioteca de operaciones con textual y poder instanciarse',function(){
        expect(ops_textual).to.exist
    });

    it('Debería poder consultar todos los datos textuales', function(done){
        ops_textual.consultarTodos(function(err,tabla){
            if(err) done(err);
            else
                done();

            expect(tabla[0]).to.have.all.keys('zona', 'texto');
        });
    });

    it('Debería poder insertar datos textuales por ccaa', function(done){
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

    it('Debería poder consultar datos textuales por ccaa', function(done){
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

    it('Debería poder actualizar datos textuales por ccaa', function(done){
        var datos = {
            status: 200,
            statusText: 'OK',
            text() { return 'Dia chungo en Gotham hoy. Se recomienda no salir al exterior.'; }
        };
        var date = new Date();
        date.setDate(date.getDate() - 1);
        date = date.toJSON().slice(0,10);

        var mt1 = new MeteoTextual('gotham',date,datos.text());

        ops_textual.actualizar(mt1,function(mt2){                
            expect(mt2).to.be.an.instanceof(MeteoTextual);
            expect(mt2.getZona()).to.equal('gotham');
            expect(mt2.getDia()).to.equal(date);
            expect(mt2.getTexto()).to.be.a('string');

            done();
        });
    });

    it('Debería poder consultar datos textuales por ccaa', function(done){
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

    it('Debería poder eliminar datos de montaña', function(done){
        expect(ops_textual.eliminar('gotham')).to.not.throw;
        done();
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

describe('Tests para operaciones con montañas', function(){
    it('Debería cargar la biblioteca de operaciones de montaña y poder instanciarse',function(){
        expect(ops_montaña).to.exist
    });

    it('Debería poder consultar todos los datos de montaña', function(done){
        ops_montaña.consultarTodos(function(err,tabla){
            if(err) done(err);
            else
                done();

            expect(tabla[0]).to.have.all.keys('nombre', 'estado_cielo','precipitaciones','tormentas','temperaturas','fecha');
        });
    });

    it('Debería poder insertar datos de montaña', function(done){
        ops_montaña.consultar('monte_test',predicciones,peticiones,function(res){
            var hoy = new Date().toJSON().slice(0,10);
            expect(res).to.be.an.instanceof(MeteoMontaña);
            expect(res.getNombre()).to.equal('monte_test');
            expect(res.getEstadoCielo()).to.equal('Intervalos nubosos.');
            expect(res.getPrecipitaciones()).to.equal('Podrán caer algunos chubascos vespertinos.');
            expect(res.getTormentas()).to.equal('No se descarta alguna ocasional.');
            expect(res.getTemperaturas()).to.equal('Mínimas sin cambios o en ligero descenso.');
            expect(res.getFecha()).to.equal(hoy);

            done();
        });
    });

    it('Debería poder consultar datos de montaña', function(done){
        ops_montaña.consultar('monte_test',predicciones,peticiones,function(res){
            var hoy = new Date().toJSON().slice(0,10);
            expect(res).to.be.an.instanceof(MeteoMontaña);
            expect(res.getNombre()).to.equal('monte_test');
            expect(res.getEstadoCielo()).to.equal('Intervalos nubosos.');
            expect(res.getPrecipitaciones()).to.equal('Podrán caer algunos chubascos vespertinos.');
            expect(res.getTormentas()).to.equal('No se descarta alguna ocasional.');
            expect(res.getTemperaturas()).to.equal('Mínimas sin cambios o en ligero descenso.');
            expect(res.getFecha()).to.equal(hoy);

            done();
        });
    });

    it('Debería poder actualizar datos de montaña', function(done){
        var nombre          = "monte_test"
        var estado_cielo    = "Intervalos nubosos.";
        var precipitaciones = "Podrán caer algunos chubascos vespertinos.";
        var tormentas       = "No se descarta alguna ocasional.";
        var temperaturas    = "Mínimas sin cambios o en ligero descenso.";
        var fecha           = new Date();
        fecha.setDate(fecha.getDate() - 1);
        fecha = fecha.toJSON().slice(0,10);

        var montaña = new MeteoMontaña(nombre,estado_cielo,precipitaciones,tormentas,temperaturas,fecha);    

        ops_montaña.actualizar(montaña,function(res){
            expect(res).to.be.an.instanceof(MeteoMontaña);
            expect(res.getFecha()).to.equal(fecha);

            done();
        });
    });

    it('Debería poder consultar datos de montaña', function(done){
        ops_montaña.consultar('monte_test',predicciones,peticiones,function(res){            
            expect(res).to.be.an.instanceof(MeteoMontaña);
            expect(res.getNombre()).to.equal('monte_test');
            expect(res.getEstadoCielo()).to.equal('Intervalos nubosos.');
            expect(res.getPrecipitaciones()).to.equal('Podrán caer algunos chubascos vespertinos.');
            expect(res.getTormentas()).to.equal('No se descarta alguna ocasional.');
            expect(res.getTemperaturas()).to.equal('Mínimas sin cambios o en ligero descenso.');

            done();
        });
    });


    it('Debería poder eliminar datos de montaña', function(done){
        expect(ops_montaña.eliminar('monte_test')).to.not.throw;
        done();
    });
});