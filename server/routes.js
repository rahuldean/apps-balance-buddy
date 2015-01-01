/* Handle all the requested routes */
var OperatorController                  = require('./controller/Operator'),
    CodeController                  = require('./controller/Code');
exports.manage = function(app){

    // Check if each api request has the auth header
    app.use('/api', function(req, res, next){
        var secret = req.get('X-Mashape-Proxy-Secret');
        if(typeof secret !== 'undefined' && secret !== ''){
            next();
        }
        else
        res.sendStatus(400);
    });
    app.get('/', function(req, res){
        res.sendStatus(200);
    });

    app.get('/api/Operators', function(req, res){
        OperatorController.getAllOperators(function(err, document){
            if(err){
                console.log(err);
                res.send([]);
            } else {
                res.send(document);
            }
        })
    });

    app.get('/api/Codes', function(req, res){
        if(typeof req.query.operatorId !== 'undefined' && req.query.operatorId !== ''){
            CodeController.getCodesForAnOperator(req.query.operatorId, function(err, doc){
                if(!err){
                    res.send(doc);
                }
                else
                    res.sendStatus(400);
            })
        }
        else
            res.sendStatus(400);
    });

    app.get('/api/*', function(req, res){
        res.sendStatus(404);
    });
};