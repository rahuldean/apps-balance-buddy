var mongoose                = require('mongoose'),
    schema                  = mongoose.Schema,
    Operator                = require('./Code');

var CodeSchema              = schema({
    operatorId: { type: schema.ObjectId, ref: Operator },
    codeId: { type: schema.ObjectId, auto: true },
    title: { type: String, default: ''},
    ussdCode: { type: String, default: '' }
});

module.exports              = mongoose.model('Code', CodeSchema);
