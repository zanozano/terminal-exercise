//DEPENDENCIAS
const axios = require('axios');
const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const http = require('http');
const url = require('url');
//LIST
let userList = [];
//USER
let userReq = '';
//HTTP
http.createServer(function (req, res) {
	//SERVER
	console.log('Servidor Activo');
	res.writeHead(200, {
		'Content-Type': 'text/html; charset=utf-8',
	});
	if (req.url.startsWith('/citas')) {
		//AXIOS
		axios
			.get('https://randomuser.me/api')
			.then((data) => {
				userReq = {
					nombre: data.data.results[0].name.first,
					apellido: data.data.results[0].name.last,
					id: uuidv4().slice(25),
					timestamp: moment().format('MMMM Do YYYY, hh:mm:ss a'),
				};
				//PUSH USUARIOS
				userList.push(userReq);
				//LODASH
				let i = 1;
				_.forEach(userList, (usuario) => {
					//HTML
					res.write(
						`<p><b>${i}</b> Nombre: <b>${usuario.nombre}</b> - Apellido: <b>${usuario.apellido}</b> - ID: <b>${usuario.id}</b> - Hora: <b>${usuario.timestamp}</b></p> \n`
					);
					//CONSOLE
					console.log(
						chalk.blue.bgWhite(
							`${i} Nombre: ${usuario.nombre} - Apellido: ${usuario.apellido} - ID: ${usuario.id} - Hora: ${usuario.timestamp}`
						)
					);
					i += 1;
				});
				res.end();
			})
			.catch((e) => {
				console.log(e);
			});
	}
}).listen(8080, () => console.log('Escuchando el puerto 8080'));
