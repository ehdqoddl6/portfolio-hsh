var express = require('express');
var url = require('url');
var router = express.Router();
var ProductsModel = require('../models/ProductsModel');

var queryString = require('querystring');
//var param = queryString.parse(curURL.query);

router.get('/', function(req, res){
    console.log("android");
    var curURL = req.url;
    var queryData = url.parse(curURL, true).query;
    var queryName = queryData.id;
    console.log(queryName);

    res.send(queryName);
});

router.get('/project', function(req, res){
    
    ProductsModel.find(function(err, products){ 
        res.render('admin/products', {products : products})
    });
});


module.exports = router;