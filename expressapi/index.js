var express = require("express");
var app = express();app.listen(3000, () => {
 console.log("Server running on port 3000");
});

	




app.get("/consulta1", (req,res, next) => {
	var querys="select  v.hospital_ID,h.nombre,h.direccion,count(v.fecha_muerte)  from hospital as h  right JOIN victima as v  ON h.ID=v.hospital_ID where v.fecha_muerte!='0000-00-00 00:00:00'  and h.nombre!='' group by v.hospital_ID;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});





	con.connect(function(err) {
	  if (err) throw err;
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();		
	  });
	});

		
});




app.get("/consulta2", (req,res, next) => {




	var querys="select v.nombre ,v.apellido,v.estado,t.efectividad_victima from victima as v,tratamiento as t ,victima_tratamiento as m where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and t.ID=m.tratamiento_ID and t.nombre='Transfusiones de sangre' and v.estado='En cuarentena' and t.efectividad_victima>5;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	con.connect(function(err) {
	  if (err) throw err;
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	});

	
		
});


app.get("/consulta3", (req,res, next) => {

	var querys="select  v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado,count(m.victima_ID) as total from victima as v , victima_asociado as m where v.fecha_muerte!='0000-00-00 00:00:00' and v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID group by v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado having count(m.victima_ID)>3;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	con.connect(function(err) {
	  if (err) throw err;
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	});
	
});








app.get("/consulta4", (req,res, next) => {

	var querys="select t.nombre, t.apellido, t.direccion ,t.fecha_primera_sospecha, t.fecha_confirmacion,t.fecha_muerte,t.estado, t.tipo, t.fecha_inicio, t.fecha_fin, t.nombrea, t.apellidoa, t.fecha_conocio,count(t.tipo) as Total_Asociados from (select distinct v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado, c.tipo, c.fecha_inicio, c.fecha_fin, a.nombre as nombrea, a.apellido as apellidoa, a.fecha_conocio from victima as v , victima_asociado as m ,asociado as a, victima_contacto as r ,contacto as c where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and a.ID=m.asociado_ID and v.ID=r.victima_ID and v.hospital_ID=r.victima_hospital_ID and c.ID=r.contacto_ID and v.estado='Sospecha' and c.tipo='Beso' group by c.fecha_inicio ,c.fecha_fin) as t group by t.nombre, t.apellido, t.direccion ,t.fecha_primera_sospecha, t.fecha_confirmacion,t.fecha_muerte,t.estado, t.tipo, t.nombrea, t.apellidoa, t.fecha_conocio having count(t.tipo)>2 ;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	con.connect(function(err) {
	  if (err) throw err;
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	});
	
});







app.get("/consulta5", (req,res, next) => {

	var querys="select  v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado,count(t.nombre) as Total_T_Oxigeno from victima as v , victima_tratamiento as m ,tratamiento as t where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and t.ID=m.tratamiento_ID and t.nombre='Oxigeno' group by v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado, t.nombre,t.efectividad,t.fecha_inicio, t.fecha_fin,t.efectividad_victima order by Total_T_Oxigeno asc limit 5;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	con.connect(function(err) {
	  if (err) throw err;
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	});
	
});




app.get("/consulta6", (req,res, next) => {

	var querys="select  v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado from victima as v , victima_tratamiento as m ,tratamiento as t, victima_ubicacion as r ,ubicacion as u where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and t.ID=m.tratamiento_ID and v.ID=r.victima_ID and v.hospital_ID=r.victima_hospital_ID and u.ID=r.ubicacion_ID and u.ubicacion='1987 Delphine Well' and t.nombre='Manejo de la presion arterial' ;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	con.connect(function(err) {
	  if (err) throw err;
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	});
	
});







app.get("/consulta7", (req,res, next) => {

	var querys="select  v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado,t.total, count(m.victima_ID) as SumAllegados from victima as v , victima_asociado as m ,asociado as a, (select distinctrow v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado,count(t.nombre) as total from victima as v , victima_tratamiento as m ,tratamiento as t where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and t.ID=m.tratamiento_ID and v.hospital_ID!=1 and t.nombre!='' group by v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado having count(t.nombre)=2 ) as t where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and m.asociado_ID=a.ID and v.nombre=t.nombre and v.apellido=t.apellido group by v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado having count(m.victima_ID)<2 ;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	con.connect(function(err) {
	  if (err) throw err;
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	});
	
});




app.get("/consulta8", (req,res, next) => {

	var querys="select v.nombre, v.apellido, v.direccion , (v.fecha_primera_sospecha),MONTH(v.fecha_primera_sospecha) AS Mes, v.fecha_confirmacion,v.fecha_muerte,v.estado,count(t.nombre) as Total_T_Aplicados from victima as v , victima_tratamiento as m ,tratamiento as t where v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and t.ID=m.tratamiento_ID and t.nombre!='' group by v.nombre, v.apellido, v.direccion ,v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado order by Total_T_Aplicados desc ;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	con.connect(function(err) {
	  if (err) throw err;
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	});
	
});






app.get("/consulta9", (req,res, next) => {

	var querys="select  v.hospital_ID,h.nombre,h.direccion,((count(v.fecha_muerte) /1002)*100) as Porcentaje from hospital as h inner JOIN victima as v  ON h.ID=v.hospital_ID  group by v.hospital_ID,h.nombre,h.direccion;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	con.connect(function(err) {
	  if (err) throw err;
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	});
	
});





app.get("/consulta10", (req,res, next) => {

	var querys="select g.hospi,g.dire,g.tipo,g.suma ,h.porcen from (select distinctrow t.hospi , t.dire, t.tipo ,sum(t.total) as suma from (select distinctrow v.nombre, v.apellido, v.direccion , v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado ,h.nombre as hospi,h.direccion as dire, c.tipo,count(c.tipo) as total from hospital as h, victima as v, victima_contacto as m ,contacto as c where h.ID= v.hospital_ID and v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and m.contacto_ID=c.ID and c.tipo!='' group by v.nombre, v.apellido, v.direccion , v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado ,h.nombre ,h.direccion , c.tipo) as t group by t.hospi , t.dire, t.tipo) as g , (select distinctrow f.hospi , f.dire , f.tipo ,MAX(f.suma) as maximo ,((MAX(f.suma)/sum(f.suma))*100) as porcen  from (select distinctrow t.hospi , t.dire, t.tipo ,sum(t.total) as suma from (select distinctrow v.nombre, v.apellido, v.direccion , v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado ,h.nombre as hospi,h.direccion as dire, c.tipo,count(c.tipo) as total from hospital as h, victima as v, victima_contacto as m ,contacto as c where h.ID= v.hospital_ID and v.ID=m.victima_ID and v.hospital_ID=m.victima_hospital_ID and m.contacto_ID=c.ID and c.tipo!='' group by v.nombre, v.apellido, v.direccion , v.fecha_primera_sospecha, v.fecha_confirmacion,v.fecha_muerte,v.estado ,h.nombre ,h.direccion , c.tipo) as t group by t.hospi , t.dire, t.tipo) as f group by f.hospi , f.dire ) as h where g.hospi=h.hospi and  g.dire=h.dire and  g.suma =h.maximo ;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	con.connect(function(err) {
	  if (err) throw err;
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	});
	
});






app.get("/eliminarTemporal", (req,res, next) => {

	var querys="Drop table if exists Temporal;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	
	
});




app.get("/eliminarModelo", (req,res, next) => {

	var querys="DROP TABLE victima_tratamiento,victima_contacto,victima_ubicacion,victima_asociado,victima, tratamiento,contacto,ubicacion,asociado,hospital;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	
	    con.query(querys, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     res.json(result);
	     con.end();	
	  });
	
	
});



app.get("/cargarTemporal", (req,res, next) => {

	var querys="CREATE DATABASE if not exists GVE CHARACTER SET utf8 COLLATE utf8_general_ci;";
	

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678"
	});



	
  	con.query(querys, function (err, result) {
    	if (err) throw err;
    	console.log("Database created");
  	});
	











var querys2="CREATE TABLE IF NOT EXISTS Temporal ( ID INT auto_increment primary key, nombre_victima 		varchar(255), apellido_victima 	varchar(255), direccion_victima 	varchar(255), fecha_primera_sospecha 	datetime, fecha_confirmacion 	datetime, fecha_muerte		datetime, estado_victima		varchar(255), nombre_asociado		varchar(255), apellido_asociado	varchar(255), fecha_conocio		datetime, contacto_fisico		varchar(255), fecha_inicio_contacto	datetime, fecha_fin_contacto	datetime, nombre_hospital		varchar(255), direccion_hospital	varchar(255), ubicacion_victima	varchar(255), fecha_llegada		datetime, fecha_retiro		datetime, tratamiento			varchar(255), efectividad			INT, fecha_inicio_tratamiento datetime, fecha_fin_tratamiento	datetime, efectividad_en_victima	INT );";
	

	 mysql = require('mysql');

	 con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "12345678",
	  database: "GVE"
	});



	
	   con.query(querys2, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     
	     	
	  });
	








 querys2="LOAD DATA LOCAL INFILE '/home/kruiz/Desktop/GRAND_VIRUS_EPICENTER.csv' INTO TABLE GVE.Temporal FIELDS TERMINATED BY ';' LINES TERMINATED BY '\n' IGNORE 1 ROWS (nombre_victima, apellido_victima, direccion_victima, fecha_primera_sospecha, fecha_confirmacion, fecha_muerte, estado_victima, nombre_asociado, apellido_asociado, fecha_conocio, contacto_fisico, fecha_inicio_contacto, fecha_fin_contacto, nombre_hospital, direccion_hospital, ubicacion_victima, fecha_llegada, fecha_retiro, tratamiento, efectividad, fecha_inicio_tratamiento, fecha_fin_tratamiento, efectividad_en_victima);";
	

	 

	con.query(querys2, 
	  function (err, result, fields) {
	     if (err) throw err;		    
	     console.log(result);
	     con.end();	 
	     	
	  });

	
	   










	
});




app.get("/cargarModelo", (req,res, next) => {

	var aux="CREATE TABLE IF NOT EXISTS hospital (ID INT auto_increment primary key,nombre		varchar(255),direccion	varchar(255));";

	let comandos = [aux];

	aux="CREATE TABLE  IF NOT EXISTS victima (ID INT auto_increment primary key,nombre			varchar(255), apellido 		varchar(255),direccion 		varchar(255),fecha_primera_sospecha 	datetime,fecha_confirmacion	datetime,fecha_muerte		datetime,estado			varchar(255),hospital_ID		INT);";
	comandos.push(aux);
	aux="CREATE TABLE  IF NOT EXISTS tratamiento (ID INT auto_increment primary key,nombre			varchar(255), efectividad 		INT, fecha_inicio	 	datetime, fecha_fin		datetime, efectividad_victima	INT );";
	comandos.push(aux);

	aux="CREATE TABLE  IF NOT EXISTS contacto (ID INT auto_increment primary key,tipo			varchar(255), fecha_inicio	 	datetime, fecha_fin		datetime);";
	comandos.push(aux);

	aux="CREATE TABLE  IF NOT EXISTS ubicacion (ID INT auto_increment primary key, ubicacion		varchar(255), fecha_llegada	 	datetime, fecha_salida		datetime );";
	comandos.push(aux);

	aux="CREATE TABLE  IF NOT EXISTS asociado ( ID INT auto_increment primary key, nombre		varchar(255), apellido	varchar(255), fecha_conocio	datetime );";
	comandos.push(aux);


	aux="CREATE TABLE  IF NOT EXISTS victima_tratamiento ( tratamiento_ID		INT, victima_ID		INT, victima_hospital_ID	INT );";
	comandos.push(aux);

	aux="CREATE TABLE  IF NOT EXISTS victima_contacto (victima_ID		INT, victima_hospital_ID	INT, contacto_ID		INT );";
	comandos.push(aux);

	aux="CREATE TABLE  IF NOT EXISTS victima_ubicacion ( ubicacion_ID		INT, victima_ID		INT, victima_hospital_ID	INT );";
	comandos.push(aux);

	aux="CREATE TABLE  IF NOT EXISTS victima_asociado ( asociado_ID		INT, victima_ID		INT, victima_hospital_ID	INT );";
	comandos.push(aux);

	aux="alter table victima add foreign key (hospital_ID) references hospital(ID);";
	comandos.push(aux);

	aux="alter table victima_tratamiento add foreign key (victima_hospital_ID) references hospital(ID);";
	comandos.push(aux);

	aux="alter table victima_tratamiento add foreign key (victima_ID) references victima(ID);";
	comandos.push(aux);

	aux="alter table victima_tratamiento add foreign key (victima_hospital_ID) references hospital(ID);";
	comandos.push(aux);

	aux="alter table victima_tratamiento add foreign key (tratamiento_ID) references tratamiento(ID);";
	comandos.push(aux);

	aux="alter table victima_contacto add foreign key (victima_ID) references victima(ID);";
	comandos.push(aux);

	aux="alter table victima_contacto add foreign key (victima_hospital_ID) references hospital(ID);";
	comandos.push(aux);

	aux="alter table victima_contacto add foreign key (contacto_ID) references contacto(ID);";
	comandos.push(aux);

	aux="alter table victima_ubicacion add foreign key (victima_ID) references victima(ID);";
	comandos.push(aux);

	aux="alter table victima_ubicacion add foreign key (victima_hospital_ID) references hospital(ID);";
	comandos.push(aux);

	aux="alter table victima_ubicacion add foreign key (ubicacion_ID) references ubicacion(ID);";
	comandos.push(aux);

	aux="alter table victima_asociado add foreign key (victima_ID) references victima(ID);";
	comandos.push(aux);

	aux="alter table victima_asociado add foreign key (victima_hospital_ID) references hospital(ID);";
	comandos.push(aux);

	aux="alter table victima_asociado add foreign key (asociado_ID) references asociado(ID);";
	comandos.push(aux);

	aux="INSERT INTO hospital select DISTINCTROW 0,nombre_hospital,direccion_hospital  from Temporal ;";
	comandos.push(aux);

	aux="INSERT INTO tratamiento select DISTINCTROW 0,tratamiento,efectividad,fecha_inicio_tratamiento,fecha_fin_tratamiento,efectividad_en_victima  from Temporal ;";
	comandos.push(aux);

	aux="INSERT INTO contacto select DISTINCTROW 0,contacto_fisico,fecha_inicio_contacto,fecha_fin_contacto from Temporal ;";
	comandos.push(aux);

	aux="INSERT INTO ubicacion select DISTINCTROW 0,ubicacion_victima,fecha_llegada,fecha_retiro from Temporal ;";
	comandos.push(aux);

	aux="INSERT INTO asociado select DISTINCTROW 0,nombre_asociado,apellido_asociado,fecha_conocio from Temporal ;";
	comandos.push(aux);

	aux="INSERT INTO victima select DISTINCTROW 0,T.nombre_victima,T.apellido_victima,T.direccion_victima, T.fecha_primera_sospecha,T.fecha_confirmacion,T.fecha_muerte,T.estado_victima,h.ID from Temporal as T, hospital as h where (T.nombre_hospital=h.nombre and T.direccion_hospital=h.direccion) ;";
	comandos.push(aux);	

	aux="INSERT INTO victima_tratamiento select DISTINCTROW m.ID ,v.ID ,v.hospital_ID from Temporal as T, victima as v, tratamiento as m where T.nombre_victima=v.nombre and T.apellido_victima=v.apellido and T.direccion_victima=v.direccion and T.fecha_primera_sospecha=v.fecha_primera_sospecha and T.fecha_confirmacion=v.fecha_confirmacion and T.fecha_muerte=v.fecha_muerte and T.estado_victima=v.estado and T.tratamiento=m.nombre and T.efectividad=m.efectividad and T.fecha_inicio_tratamiento=m.fecha_inicio and T.fecha_fin_tratamiento=m.fecha_fin and T.efectividad_en_victima=m.efectividad_victima ;";
	comandos.push(aux);

	aux="INSERT INTO victima_contacto select DISTINCTROW v.ID ,v.hospital_ID ,c.ID from Temporal as T, victima as v, contacto as c where T.nombre_victima=v.nombre and T.apellido_victima=v.apellido and T.direccion_victima=v.direccion and T.fecha_primera_sospecha=v.fecha_primera_sospecha and T.fecha_confirmacion=v.fecha_confirmacion and T.fecha_muerte=v.fecha_muerte and T.estado_victima=v.estado and T.contacto_fisico=c.tipo and T.fecha_inicio_contacto=c.fecha_inicio and T.fecha_fin_contacto=c.fecha_fin ;";
	comandos.push(aux);

	aux="INSERT INTO victima_ubicacion select DISTINCTROW u.ID ,v.ID ,v.hospital_ID from Temporal as T, victima as v, ubicacion as u where T.nombre_victima=v.nombre and T.apellido_victima=v.apellido and T.direccion_victima=v.direccion and T.fecha_primera_sospecha=v.fecha_primera_sospecha and T.fecha_confirmacion=v.fecha_confirmacion and T.fecha_muerte=v.fecha_muerte and T.estado_victima=v.estado and T.ubicacion_victima=u.ubicacion and T.fecha_llegada=u.fecha_llegada and T.fecha_retiro=u.fecha_salida ;";
	comandos.push(aux);

	aux="INSERT INTO victima_asociado select DISTINCTROW a.ID ,v.ID ,v.hospital_ID from Temporal as T, victima as v, asociado as a where T.nombre_victima=v.nombre and T.apellido_victima=v.apellido and T.direccion_victima=v.direccion and T.fecha_primera_sospecha=v.fecha_primera_sospecha and T.fecha_confirmacion=v.fecha_confirmacion and T.fecha_muerte=v.fecha_muerte and T.estado_victima=v.estado and T.nombre_asociado=a.nombre and T.apellido_asociado=a.apellido and T.fecha_conocio=a.fecha_conocio ;";
	comandos.push(aux);
	

		var mysql = require('mysql');

		var con = mysql.createConnection({
		  host: "127.0.0.1",
		  user: "root",
		  password: "12345678",
		  database: "GVE"
		});

		var querys="";

	for(let i = 0; i < 34; i++) {
		
		
		querys=comandos[i];
		
		if(i==(33)){

			con.query(querys, 
			  function (err, result, fields) {
			     if (err) throw err;		    
			     console.log(result);
			     con.end();
			     res.json("OK");
			     
			  });
		console.log("FINALIZO LA CARGA9..........................");

		}else{

			con.query(querys, 
			  function (err, result, fields) {
			     if (err) throw err;		    
			     console.log(result);
			  });

		}
		  
	}
		

	
	
	
	
});
















