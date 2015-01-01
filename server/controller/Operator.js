var Operator                    = require('../model/Operator');

module.exports = {
    getAllOperators: getAllOperators
};

function getAllOperators(callback){
    Operator.find({}, '-_id -__v' , function(err, doc){
       callback(err, doc);
    });
}

