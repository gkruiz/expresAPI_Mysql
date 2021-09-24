














#INICIA CARGA DE ARCHIVO CSV

LOAD DATA LOCAL INFILE '/home/kruiz/Desktop/GRAND_VIRUS_EPICENTER.csv'
INTO TABLE GVE.Temporal 

FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(nombre_victima,
apellido_victima,
direccion_victima,
fecha_primera_sospecha,
fecha_confirmacion,
fecha_muerte,
estado_victima,
nombre_asociado,
apellido_asociado,
fecha_conocio,
contacto_fisico,
fecha_inicio_contacto,
fecha_fin_contacto,
nombre_hospital,
direccion_hospital,
ubicacion_victima,
fecha_llegada,
fecha_retiro,
tratamiento,
efectividad,
fecha_inicio_tratamiento,
fecha_fin_tratamiento,
efectividad_en_victima);





#INICIA INSERTAR DATOS

INSERT INTO hospital
select DISTINCTROW 0,nombre_hospital,direccion_hospital 
from Temporal ;

INSERT INTO tratamiento
select DISTINCTROW 0,tratamiento,efectividad,fecha_inicio_tratamiento,fecha_fin_tratamiento,efectividad_en_victima 
from Temporal ;

INSERT INTO contacto
select DISTINCTROW 0,contacto_fisico,fecha_inicio_contacto,fecha_fin_contacto
from Temporal ;


INSERT INTO ubicacion
select DISTINCTROW 0,ubicacion_victima,fecha_llegada,fecha_retiro
from Temporal ;

INSERT INTO asociado
select DISTINCTROW 0,nombre_asociado,apellido_asociado,fecha_conocio
from Temporal ;

#INICIA GUARDA INFO FORANEAS

#VICTIMA 
INSERT INTO victima
select DISTINCTROW 0,T.nombre_victima,T.apellido_victima,T.direccion_victima,
T.fecha_primera_sospecha,T.fecha_confirmacion,T.fecha_muerte,T.estado_victima,h.ID
from Temporal as T, hospital as h 
where (T.nombre_hospital=h.nombre and T.direccion_hospital=h.direccion)
;



#VIC_TRATAMIENTO

INSERT INTO victima_tratamiento
select DISTINCTROW m.ID ,v.ID ,v.hospital_ID 
from Temporal as T, victima as v, tratamiento as m
where 
T.nombre_victima=v.nombre and 
T.apellido_victima=v.apellido and 
T.direccion_victima=v.direccion and
T.fecha_primera_sospecha=v.fecha_primera_sospecha and 
T.fecha_confirmacion=v.fecha_confirmacion and 
T.fecha_muerte=v.fecha_muerte and 
T.estado_victima=v.estado and 

T.tratamiento=m.nombre and 
T.efectividad=m.efectividad and 
T.fecha_inicio_tratamiento=m.fecha_inicio and 
T.fecha_fin_tratamiento=m.fecha_fin and 
T.efectividad_en_victima=m.efectividad_victima 
;


#VIC_CONTACTO

INSERT INTO victima_contacto
select DISTINCTROW v.ID ,v.hospital_ID ,c.ID 
from Temporal as T, victima as v, contacto as c
where 
T.nombre_victima=v.nombre and 
T.apellido_victima=v.apellido and 
T.direccion_victima=v.direccion and
T.fecha_primera_sospecha=v.fecha_primera_sospecha and 
T.fecha_confirmacion=v.fecha_confirmacion and 
T.fecha_muerte=v.fecha_muerte and 
T.estado_victima=v.estado and 

T.contacto_fisico=c.tipo and 
T.fecha_inicio_contacto=c.fecha_inicio and 
T.fecha_fin_contacto=c.fecha_fin 
;



#VIC_UBICACION

INSERT INTO victima_ubicacion
select DISTINCTROW u.ID ,v.ID ,v.hospital_ID 
from Temporal as T, victima as v, ubicacion as u
where 
T.nombre_victima=v.nombre and 
T.apellido_victima=v.apellido and 
T.direccion_victima=v.direccion and
T.fecha_primera_sospecha=v.fecha_primera_sospecha and 
T.fecha_confirmacion=v.fecha_confirmacion and 
T.fecha_muerte=v.fecha_muerte and 
T.estado_victima=v.estado and 

T.ubicacion_victima=u.ubicacion and 
T.fecha_llegada=u.fecha_llegada and 
T.fecha_retiro=u.fecha_salida
;




#VIC_ASOCIADO

INSERT INTO victima_asociado
select DISTINCTROW a.ID ,v.ID ,v.hospital_ID 
from Temporal as T, victima as v, asociado as a
where 
T.nombre_victima=v.nombre and 
T.apellido_victima=v.apellido and 
T.direccion_victima=v.direccion and
T.fecha_primera_sospecha=v.fecha_primera_sospecha and 
T.fecha_confirmacion=v.fecha_confirmacion and 
T.fecha_muerte=v.fecha_muerte and 
T.estado_victima=v.estado and 

T.nombre_asociado=a.nombre and 
T.apellido_asociado=a.apellido and 
T.fecha_conocio=a.fecha_conocio
;








