#INICIA CONSULTAS 

#CONSULTA 1

select  v.hospital_ID,h.nombre,h.direccion,count(v.fecha_muerte) as Numero_Fallecidos from hospital as h  
right JOIN victima as v  ON h.ID=v.hospital_ID
where v.fecha_muerte!="0000-00-00 00:00:00"  and h.nombre!=""
group by v.hospital_ID;
;

#CONSULTA 2
select v.nombre ,v.apellido,v.estado,t.efectividad_victima from victima as v,tratamiento as t ,victima_tratamiento as m
where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and t.ID=m.tratamiento_ID and t.nombre="Transfusiones de sangre"
and v.estado="En cuarentena" and t.efectividad_victima>5
;

#CONSULTA 3

select  v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
v.fecha_confirmacion,v.fecha_muerte,v.estado,count(m.victima_ID) as Total_Asociados
from victima as v , victima_asociado as m
where v.fecha_muerte!="0000-00-00 00:00:00" and v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID
group by v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
v.fecha_confirmacion,v.fecha_muerte,v.estado
having count(m.victima_ID)>3
;

#CONSULTA 4

select t.nombre, t.apellido, t.direccion ,t.fecha_primera_sospecha,
	t.fecha_confirmacion,t.fecha_muerte,t.estado,
	t.tipo,
	t.fecha_inicio,
	t.fecha_fin,
	t.nombrea,
	t.apellidoa,
	t.fecha_conocio,count(t.tipo) as Total_Asociados from 
		(select distinct v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
		v.fecha_confirmacion,v.fecha_muerte,v.estado,
		c.tipo,
		c.fecha_inicio,
		c.fecha_fin,
		a.nombre as nombrea,
		a.apellido as apellidoa,
		a.fecha_conocio
		from victima as v , victima_asociado as m ,asociado as a,
		victima_contacto as r ,contacto as c
		where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and a.ID=m.asociado_ID
		and v.ID=r.victima_ID and v.hospital_ID=r.victima_hospital_ID and c.ID=r.contacto_ID
		and v.estado='Sospecha' and c.tipo='Beso' 
		group by c.fecha_inicio ,c.fecha_fin) as t
	group by t.nombre, t.apellido, t.direccion ,t.fecha_primera_sospecha,
	t.fecha_confirmacion,t.fecha_muerte,t.estado,
	t.tipo,
	t.nombrea,
	t.apellidoa,
	t.fecha_conocio
    having count(t.tipo)>2
;




#CONSULTA 5

select  v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
v.fecha_confirmacion,v.fecha_muerte,v.estado,count(t.nombre) as Total_T_Oxigeno
from victima as v , victima_tratamiento as m ,tratamiento as t
where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and t.ID=m.tratamiento_ID
and t.nombre="Oxigeno"
group by v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
v.fecha_confirmacion,v.fecha_muerte,v.estado,
t.nombre,t.efectividad,t.fecha_inicio,
t.fecha_fin,t.efectividad_victima
order by Total_T_Oxigeno asc
;


select distinctrow *from Temporal where tratamiento="Oxigeno"
group by nombre_victima, apellido_victima, direccion_victima ,fecha_primera_sospecha,
fecha_confirmacion,fecha_muerte,estado_victima,
tratamiento ,efectividad,fecha_inicio_tratamiento,
fecha_fin_tratamiento,efectividad_en_victima
;

#CONSULTA 6

select  v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
v.fecha_confirmacion,v.fecha_muerte,v.estado
from victima as v , victima_tratamiento as m ,tratamiento as t,
victima_ubicacion as r ,ubicacion as u
where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and t.ID=m.tratamiento_ID
and v.ID=r.victima_ID and v.hospital_ID=r.victima_hospital_ID and u.ID=r.ubicacion_ID
and u.ubicacion="1987 Delphine Well" and t.nombre="Manejo de la presion arterial"
;

select distinctrow *from Temporal where tratamiento="Manejo de la presion arterial"
and ubicacion_victima="1987 Delphine Well"
group by nombre_victima, apellido_victima, direccion_victima ,fecha_primera_sospecha,
fecha_confirmacion,fecha_muerte,estado_victima,
tratamiento ,efectividad,fecha_inicio_tratamiento,
fecha_fin_tratamiento,efectividad_en_victima
;


#CONSULTA 7


select  v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
v.fecha_confirmacion,v.fecha_muerte,v.estado,t.total, count(m.victima_ID) as SumAllegados
from victima as v , victima_asociado as m ,asociado as a,

	(select distinctrow v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
	v.fecha_confirmacion,v.fecha_muerte,v.estado,count(t.nombre) as total
	from victima as v , victima_tratamiento as m ,tratamiento as t
	where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and t.ID=m.tratamiento_ID
	and v.hospital_ID!=1 and t.nombre!=""
	group by v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
	v.fecha_confirmacion,v.fecha_muerte,v.estado
	#,t.nombre,t.efectividad,t.fecha_inicio
	#,t.fecha_fin,t.efectividad_victima
	having count(t.nombre)=2  ) as t

where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and m.asociado_ID=a.ID
and v.nombre=t.nombre and v.apellido=t.apellido
group by v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
v.fecha_confirmacion,v.fecha_muerte,v.estado
having count(m.victima_ID)<2
;


#CONSULTA 8
use GVE;
select v.nombre, v.apellido, v.direccion , (v.fecha_primera_sospecha),MONTH(v.fecha_primera_sospecha) AS Mes,
v.fecha_confirmacion,v.fecha_muerte,v.estado,count(t.nombre) as Total_T_Aplicados
from victima as v , victima_tratamiento as m ,tratamiento as t
where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and t.ID=m.tratamiento_ID
and t.nombre!=""
group by v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha,
v.fecha_confirmacion,v.fecha_muerte,v.estado
order by Total_T_Aplicados desc
;



#CONSULTA 9

select  v.hospital_ID,h.nombre,h.direccion,((count(v.fecha_muerte) /1002)*100) as Porcentaje
from hospital as h  
inner JOIN victima as v  ON h.ID=v.hospital_ID
#where  h.nombre!=""
group by v.hospital_ID,h.nombre,h.direccion;
;

select count(v.fecha_muerte) from victima as v;



#CONSULTA 10

	select g.hospi,g.dire,g.tipo,g.suma ,h.porcen from 
	(select distinctrow t.hospi , t.dire, t.tipo ,sum(t.total) as suma from
        
			(select distinctrow v.nombre, v.apellido, v.direccion , v.fecha_primera_sospecha,
			v.fecha_confirmacion,v.fecha_muerte,v.estado ,h.nombre as hospi,h.direccion as dire, c.tipo,count(c.tipo) as total
			 from
			hospital as h, victima as v, victima_contacto as m ,contacto as c
			where h.ID= v.hospital_ID and v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID
			and m.contacto_ID=c.ID 
            and c.tipo!=''
			group by v.nombre, v.apellido, v.direccion , v.fecha_primera_sospecha,
			v.fecha_confirmacion,v.fecha_muerte,v.estado ,h.nombre ,h.direccion , c.tipo) as t
		group by t.hospi , t.dire, t.tipo) as g ,
        
        (select distinctrow f.hospi , f.dire , f.tipo ,MAX(f.suma) as maximo ,((MAX(f.suma)/sum(f.suma))*100) as porcen  from
    
		(select distinctrow t.hospi , t.dire, t.tipo ,sum(t.total) as suma from
        
			(select distinctrow v.nombre, v.apellido, v.direccion , v.fecha_primera_sospecha,
			v.fecha_confirmacion,v.fecha_muerte,v.estado ,h.nombre as hospi,h.direccion as dire, c.tipo,count(c.tipo) as total
			 from
			hospital as h, victima as v, victima_contacto as m ,contacto as c
			where h.ID= v.hospital_ID and v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID
			and m.contacto_ID=c.ID 
            and c.tipo!=''
			group by v.nombre, v.apellido, v.direccion , v.fecha_primera_sospecha,
			v.fecha_confirmacion,v.fecha_muerte,v.estado ,h.nombre ,h.direccion , c.tipo) as t
		group by t.hospi , t.dire, t.tipo) as f
    group by f.hospi , f.dire ) as h
    
    where g.hospi=h.hospi and  g.dire=h.dire and  g.suma =h.maximo
;
        
