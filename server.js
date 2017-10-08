const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');

var app = express();
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	console.log(`${now} : ${req.method} ${req.url}`);
	fs.appendFile('server.log', log+'\n', (error)=>{
		if (error) {
			console.log(`Unable to append file: ${error}`);
		}
	})
	next();
});

// app.use((req, res, next) =>{
// 	res.render('maintanance.hbs', {
// 		pageName:'Maintanace Page'
// 	});
// })

app.use(express.static(__dirname+'/public'))

app.get('/', (req, res)=>{
	res.render('home.hbs',{
		pageName:'Home Page',
		welcomeMessage:'Welcome to our website'
	})
});

app.get('/about', (req, res)=>{
	res.render('about.hbs', {
		pageName:'About Page',
	});
});

app.get('/bad', (req, res)=>{
	res.send({ errorMessage:"Unable to handle request"})
});


app.listen(port, ()=>{
	console.log(`Server is running at ${port}`);
});