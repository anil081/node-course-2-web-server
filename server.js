const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
 
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log + '\n');

 next();
});
//  
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});
app.get('/', (req, res) => {
//res.send('<h1>Hello Express!</h1>');
// res.send({
// 	name: 'Anil',
// 	likes: ['swimming',

// 	'volley'
// ]
// });
res.render('home.hbs', {
	pageTitle: 'Home page',
	message: 'Welcome to home page',
	header: 'My Header'
});
});
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		header: 'My Header'
	});
})

app.get('/projects', (req, res) => {
 res.render('projects.hbs', {
 	pageTitle: 'Projects'
 });
});
app.get('/bad', (req, res) => {
res.send({ errorMessage: 'unable to fetch data'})
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});