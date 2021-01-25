var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({

    category : String, //제품명
    name : String, //가격
    description : String, //설명
    language : String,
    start : String,
    end : String,
    url : String,
    tool : String,
    role : String
    
});

module.exports = mongoose.model('projects', ProjectSchema); 