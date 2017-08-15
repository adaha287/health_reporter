var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var weightSchema = new Schema({
    w: {type: Number, min: 40, max: 90, required:true}
});


module.exports = mongoose.model('Weight', weigthSchema);