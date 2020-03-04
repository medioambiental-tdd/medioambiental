# Historias de usuario

## [HU1] Solicitar predicción meteorológica por municipio y dia.

### Descripción de alto nivel

* Como un usuario necesito poder solicitar la predicción metereológica por municipio y día. 

### Dado/Y/Entonces/Cuando

Dado un municipio concreto de España y un día específico en el periodo que comprende el día actual y los dos posteriores se devolverá la siguiente información:
* Estado del cielo
* Probabilidad de precipitación
* Probabilidad de nieve
* Temperatura
* Sensación térmica
* Velocidad y dirección del viento
* Amanecer y ocaso

## [HU2] Solicitar predicción meteorológica textual por provincia,CCAA o nacional.


### Descripción de alto nivel

* Como un usuario necesito poder solicitar la predicción metereológica en forma de breve descripción textual por provincias, Comunidades autónomas o nacional. 

### Dado/Y/Entonces/Cuando

El sistema devolverá una breve descripción meteorológica en formato textual para ámbito provincial, nacional o autonómico acorde a los datos de entrada.



## [HU3] Solicitar predicción por zona costera.


### Descripción de alto nivel

* Como un usuario necesito poder solicitar la predicción metereológica de una playa concreta. 

### Dado/Y/Entonces/Cuando

El sistema devolverá una predicción meteorológica correspondiente a una playa situada en una determinada provincia acorde a los datos de entrada.


## [HU4] Solicitar predicción por zona de montaña.



### Descripción de alto nivel

* Como un usuario necesito poder solicitar la predicción metereológica de una zona de montaña concreta. 

### Dado/Y/Entonces/Cuando

El sistema devolverá una predicción meteorológica correspondiente a una zona de montaña especificada en los datos de entrada.


## [HU5] Solicitar mapa de riesgo de incendios nacionales por fecha.




### Descripción de alto nivel

* Como un usuario necesito poder solicitar una imagen que contienen un mapa de riesgo de incendios en una determinada zona (Península,Baleares o Canarias) para el día actual.

### Dado/Y/Entonces/Cuando

Dada una zona como parámetro de entrada se devolverá la imagencon el  mapa de riesgo de incendios correspondiente.



## [HU6] Solicitar datos de calidad del aire de la estación más cercana a un municipio.



### Descripción de alto nivel

* Como un usuario necesito poder solicitar datos de contaminación medioambiental obtenidos en la estación más cercana a un municipio.

### Dado/Y/Entonces/Cuando

Dada un municipio como parámetro de entrada se devolverá diversas medidas de contaminación medioambiental así como la estación desde la que se han realizado dichas medidas.

