var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  bodyParser = require('body-parser');

const path = require('path');  
const layout = require('express-layout');
const routes = require('./routes');

//make way for some custom css, js and images
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/assets/css'));
app.use('/js', express.static(__dirname + '/public/assets/js'));
app.use('/images', express.static(__dirname + '/public/assets/images'));
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const userRoute = require('./api/routes/userRoute');
const productsRoute = require('./api/routes/productsRoutes');

app.use('/user',userRoute);
app.use('/products',productsRoute);
app.use('/', routes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middlewares = [
  layout(),
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded({ extended: true }),
];
app.use(middlewares);

app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.use(function(req, res) {
  res.status(500).send({url: req.originalUrl + 'Something broke!'})
});
console.log('tracker RESTful API server started on: ' + port);

module.exports = app