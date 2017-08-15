var Weight = require('./weightModel');


module.exports = function(router){

    /* Log a weight */
    router.post('/logWeight', function(req, res){
        var weight = new Weight()
        var weight.w = req.body.weight;
        if(weight.w > 40.0 && weight.w < 90.0){
            
            res.json({success: true, message: 'Saved weight'})
        }
        else{
            res.json({success: false, message: 'Weight not correctly entered, should be between 40 and 90 kilograms'})
        }
    });
    return router;
};