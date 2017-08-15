var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var weightSchema = new Schema({
    w: {type: Number, required:true}
});


module.exports = mongoose.model('Weight', weigthSchema);