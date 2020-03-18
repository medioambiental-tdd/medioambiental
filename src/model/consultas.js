function get_consulta_textual(zona,get_textual,callback){
    get_textual(zona,function(mt){
        var json = {
            zona: mt.getZona(),
            fecha: mt.getDia(),
            texto: mt.getTexto()
        }

        callback(json);
    })
}

module.exports = {
    get_consulta_textual
}