var mongoose            = require('mongoose'),
    schema              = mongoose.Schema;

var OperatorSchema      = schema({
    operatorName : { type: String, required: true },
    operatorId: { type: schema.ObjectId, auto: true},
    operatorImageURL: { type: String, default: ''}
});

module.exports          = mongoose.model('Operator', OperatorSchema);