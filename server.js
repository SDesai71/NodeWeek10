const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
});

app.use((request, response,next) => {
	var time = new Date().toString();
	// console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error)=>{
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
});
//Maintenance Page
/*app.use((request, response,next) => {
	response.render('maintenance.hbs')
});
*/

app.get('/', (request, response) =>{
	response.send({
		name: 'Sahil',
		school: [
		'BCIT',
		'SFU',
		'UBC',
		'Hello'
		]
	});
});

app.get('/info', (request, response)=>{
	response.render('about.hbs', {
		title: 'About page',
		year: new Date().getFullYear(),
		welcome: 'Hello!'
	});

});

app.get('/404', (request, response)=>{
	response.send({
	error: 'Page not found'
	});

});
app.listen(port, () =>{
	console.log(`Server is up and running on port ${port}`);
});