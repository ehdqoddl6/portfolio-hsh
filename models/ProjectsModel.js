var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({

    category : String, 
    name : String, 
    description : String,
    language : String,
    start : String,
    end : String,
    url : String,
    tool : String,
    role : String
    
});

module.exports = mongoose.model('projects', ProjectSchema); 