var express = require('express')
var app = express()
var path = require('path');
var rootPath = path.normalize(__dirname);

var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')
var data = {};

app.engine('jade', engines.jade)

app.set('views', rootPath+'/views')
app.set('view engine', 'jade')
console.log(rootPath);
app.use('/layouts', express.static(rootPath+'/layouts'))
app.use('/assets', express.static(rootPath+'/assets'))
app.use('/bower', express.static(rootPath+'/bower_components'))

app.get('/', function (req, res) {
  res.render('index', {data: data})
})

var server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})