var express = require('express');
var url = require('url');
var router = express.Router();
var ProjectsModel = require('../models/ProjectsModel');


router.get('/', function(req, res){
    console.log("android");
    var curURL = req.url;
    var queryData = url.parse(curURL, true).query;
    var queryName = queryData.id;
    console.log(queryName);

    ProjectsModel.find({ "category": queryName },function(err, projects){ 
        res.render('project/project_list', {projects : projects})
    });

});

router.post('/', function(req,res){
    var name = req.body.project_name;
    console.log(name);
    res.redirect('/project?id='+name);
});

router.get('/project', function(req, res){
    
    ProductsModel.find(function(err, products){ 
        res.render('admin/products', {products : products})
    });
});


module.exports = router;