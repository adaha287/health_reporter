var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var weightSchema = new Schema({
    w: {type: Number, min: 40, max: 90, required: true},
    date: {type: Date, required: true, default: Date.now}
});


module.exports = mongoose.model('Weight', weigthSchema);