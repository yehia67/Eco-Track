var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  bodyParser = require('body-parser');
  

 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const userRoute = require('./api/routes/userRoute');
const productsRoute = require('./api/routes/productsRoutes');

app.use('/user',userRoute);
app.use('/products',productsRoute);

app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
console.log('tracker RESTful API server started on: ' + port);
