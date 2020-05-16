var express = require('express'),
  app = express(),
  port = process.env.PORT || 4001,
  bodyParser = require('body-parser');
  

 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/dummyDataRoutes'); //importing route
routes(app); //register the route


app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
console.log('sending dummy data each 2 seconds port:' + port);
