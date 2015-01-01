var Operator                    = require('../model/Code'),
    mongoose                    = require('mongoose');

module.exports = {
    getCodesForAnOperator: getCodesForAnOperator
};

function getCodesForAnOperator(operatorId, callback){
    if(typeof operatorId !== 'undefined' && operatorId !== '' &&  mongoose.Types.ObjectId.isValid(operatorId)){
        Operator.find( { operatorId: mongoose.Types.ObjectId(operatorId) }, '-_id -__v' , function(err, document){
            callback(err, document);
        });
    }
    else
        callback({message: 'invalid operatorId'}, null);
}
