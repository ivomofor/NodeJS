const express = require('express');
const app = express();
const route = require('./route');
const bodyParser = require('body-parser');
const helmet = require('helmet');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//security settings
app.use(helmet());

//app settings 
app.set('port', process.env.port || 4000);
app.set('view engine','ejs');

// Using Routes
route(app);


// Meadelware and Error functions
app.use('/public', express.static(__dirname + '/public'));
app.use((req, res)=>{
    res.type('text/plain');
    res.status(400);
    res.send(' 404 Sorry the page could not FOUND...');
});
app.use((err,req, res, next)=>{
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('Sorry page not found... Server Error');
});

// Express Running on PORT 4000
app.listen(app.get('port'), ()=>{
    console.log('Express Running on http://localhost:'+app.get('port')+' Type Ctrl to Exit...');
});