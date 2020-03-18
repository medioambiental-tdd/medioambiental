const express = require('express');
const app     = express();
const PORT = process.env.PORT || 5000;
var operaciones = require('./model/operaciones')

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/tiempo/:municipio/:test?',(req,res) =>{
    operaciones.getDatoTextual(req.params.municipio,function(mt){
        var json = {
            zona: mt.getZona(),
            fecha: mt.getDia(),
            texto: mt.getTexto()
        }

        res.send(json);
    })
});

app.get('/tiempo/prediccion/:municipio/:test?',(req,res) =>{
    operaciones.getDatoTextual(req.params.municipio,function(mm){
        var json = {
            
        }

        res.send(json);
    })
});



app.listen(PORT, () => console.log(`Servidor iniciado en puerto: ${PORT}`));

module.exports = app;