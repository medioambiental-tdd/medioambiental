const express = require('express');
const app     = express();
const PORT = process.env.PORT || 5000;
var operaciones = require('./model/operaciones')

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/tiempo/:municipio',(req,res) =>{
    operaciones.getDatoTextual(req.params.municipio,function(mt){
        var json = {
            zona: mt.getZona(),
            fecha: mt.getDia(),
            texto: mt.getTexto()
        }

        res.send(json);
    })
});
/*
app.get('/tiempo/prediccion/:municipio/:test?',(req,res) =>{
    operaciones.getDatoTextual(req.params.municipio,function(mm){
        var json = {
            municipio: mm.getNombreMunicipio(),
            fecha: mm.getFecha(),
            estadoCielo: mm.getEstadoCielo(),
            probPrecipitacion: mm.getProbPrecipitacion(),
            probNieve: mm.getProbNieve(),
            temperatura: mm.getTemperatura(),
            sensacionTermica: mm.getSensacionTermica(),
            velocidadViento: mm.getVelocidadViento(),
            direccionVIento: mm.getDireccionViento(),
            amanecer: mm.getAmanecer(),
            ocaso: mm.getOcaso()

            
        }

        res.send(json);
    })
});
*/


app.listen(PORT, () => console.log(`Servidor iniciado en puerto: ${PORT}`));

module.exports = app;