var chai                = require('chai'),
    assert              = chai.assert,
    expect              = chai.expect,
    async               = require('async'),
    request             = require('supertest'),
    testData            = require('../config/TestData'),
    Operator            = require('../model/Operator'),
    Code                = require('../model/Code'),
    mongoose            = require('mongoose'),
    environment         = require('../config/environment');

describe('Basic API Tests', function(){
    var operatorIds     = [], // hold the created operator ids
        calls           = [], // hold async calls
        baseURL         = environment.server.ip + ":" + environment.server.port,
        mashape_header  = environment.headers.mashape_header_name,
        mashape_secret  = environment.headers.mashape_api_secret;

    before(function(done){
        if(! mongoose.connection.db){
            mongoose.connect(environment.db);
        }
        var operatorsData = testData.operators();
        var codesData = testData.codes();

        operatorsData.forEach(function(item){
            calls.push(function(callback){
                var operator = new Operator();
                operator.operatorName = item.operatorName;
                operator.operatorImageURL = item.operatorImageURL;
                operator.save(function(err, doc){
                    if(!err){
                        operatorIds.push(doc.operatorId);
                        callback(null, doc);
                    }

                    else{
                        console.log(err);
                        callback(err, null);
                    }
                });
            });
        });


        async.parallel(calls, function(err, result){
            if(err)
                return console.log(err);
            else
                populateCodes();
        });

        function populateCodes() {
            calls = [];

            codesData.forEach(function(value, index, arr){
                calls.push(function(callback){
                    var code = new Code();
                    code.operatorId = operatorIds[index];
                    code.title = value.title;
                    code.ussdCode = value.ussdCode;
                    code.save(function(err, doc){
                        if(!err){
                            callback(null, doc);
                        }

                        else{
                            console.log(err);
                            callback(err, null);
                        }
                    });
                })
            });

            async.parallel(calls, function(err, result){
                if(err)
                    return console.log(err);
                else
                    done();
            });
        }

    });

    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            console.log('**** Dropped database **** ');
            done();
        })
    });

    describe('Get list of operators', function(){
       it('should give at least one operator', function(done){
            request(baseURL)
                .get('/api/Operators')
                .set(mashape_header, mashape_secret)
                .expect(200)
                .end(function(err, res){
                   if(!err) {
                       expect(res.body.length).to.be.above(1);
                       done();
                   }
                    else
                       return(done(err));
                });
       });
       it('should return a JSON array', function(done){
           request(baseURL)
               .get('/api/Operators')
               .set(mashape_header, mashape_secret)
               .expect(200)
               .end(function(err, res){
                   if(!err) {
                       assert.isArray(res.body, 'Expect it to be a json array');
                       done();
                   }

                   else return(done(err));
               });
       });
   });

    describe('Get list of USSD codes for an operator', function(){
        it('should give at least one code', function(done){
            request(baseURL)
                .get('/api/Codes?operatorId=' + operatorIds[0])
                .set(mashape_header, mashape_secret)
                .expect(200)
                .end(function(err, result){
                    if(err)
                        return (done(err));
                    else {
                        expect(result.body.length).to.be.above(0);
                        done();
                    }
                })
        });
        it('should give empty result when wrong operator code is sent', function(done){
            request(baseURL)
                .get('/api/Codes?operatorId=' + '11ABCDABCDABCDABCDEABCDE')
                .set(mashape_header, mashape_secret)
                .expect(200)
                .end(function(err, result){
                    if(err)
                        return (done(err));
                    else {
                        expect(result.body).to.have.length(0);
                        done();
                    }
                })
        });
        it('should give 400 bad request when an undefined parameter is sent', function(done){
            request(baseURL)
                .get('/api/Codes?operatorId=')
                .set(mashape_header, mashape_secret)
                .expect(400, done)

        });
        it('should return a JSON array', function(done){
            request(baseURL)
                .get('/api/Codes?operatorId=' + operatorIds[1])
                .set(mashape_header, mashape_secret)
                .expect(200)
                .end(function(err, result){
                    if(err)
                        return (done(err));
                    else {
                        assert.isArray(result.body, 'Expect it to be a json array');
                        done();
                    }
                })
        });
    });

    describe('Verify request authorization header', function(){
        it('should accept requests having correct X-Mashape-Proxy-Secret header', function(done){
            request(baseURL)
                .get('/api/Operators')
                .set(mashape_header, mashape_secret)
                .expect(200, done);
        });
        it('should reject requests having incorrect/ missing X-Mashape-Proxy-Secret header ', function(done){
            request(baseURL)
                .get('/api/Operators')
                .expect(400, done);
        });
    });

    describe('Validate invalid routes', function(){
        it('should throw 404 Not found when invalid api route is requested with correct mashape header', function(done){
            request(baseURL)
                .get('/api/SomeVagueRoute')
                .set(mashape_header, mashape_secret)
                .expect(404, done);
        });
    });
});

describe('Individual API Tests', function(){
    var operatorIds     = [], // hold the created operator ids
        calls           = [], // hold async calls
        baseURL         = environment.server.ip + ":" + environment.server.port,
        mashape_header  = environment.headers.mashape_header_name,
        mashape_secret  = environment.headers.mashape_api_secret;

    before(function(done){
        if(! mongoose.connection.db){
            mongoose.connect(environment.db);
        }
        var operatorsData = testData.operators();
        var codesData = testData.codes();
        operatorsData.forEach(function(item){
            calls.push(function(callback){
                var operator = new Operator();
                operator.operatorName = item.operatorName;
                operator.operatorImageURL = item.operatorImageURL;
                operator.save(function(err, doc){
                    if(!err){
                        operatorIds.push(doc.operatorId);
                        callback(null, doc);
                    }

                    else{
                        console.log(err);
                        callback(err, null);
                    }
                });
            });
        });

        async.parallel(calls, function(err, result){
            if(err)
                return console.log(err);
            else
                populateCodes();
        });

        function populateCodes() {
            calls = [];

            codesData.forEach(function(value, index, arr){
                calls.push(function(callback){
                    var code = new Code();
                    code.operatorId = operatorIds[index];
                    code.title = value.title;
                    code.ussdCode = value.ussdCode;
                    code.save(function(err, doc){
                        if(!err){
                            callback(null, doc);
                        }

                        else{
                            console.log(err);
                            callback(err, null);
                        }
                    });
                })
            });

            async.parallel(calls, function(err, result){
                if(err)
                    return console.log(err);
                else
                    done();
            });
        }


    });

    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            console.log('**** Dropped database **** ');
            done();
        })
    });

    describe('Get list of operators', function(){
        it('should have a string with operatorId property', function(done){
            request(baseURL)
                .get('/api/Operators')
                .set(mashape_header, mashape_secret)
                .expect(200)
                .end(function(err, res){
                    if(!err){
                        expect(res.body[0].operatorId, 'operatorId not defined').to.not.be.undefined;
                        assert.isString(res.body[0].operatorId);
                        done();
                    }
                    else
                        return(done(err));
                })
        });
        it('should have an string with operatorName property', function(done){
            request(baseURL)
                .get('/api/Operators')
                .set(mashape_header, mashape_secret)
                .expect(200)
                .end(function(err, res){
                    if(!err){
                        expect(res.body[0].operatorName, 'operatorName not defined').to.not.be.undefined;
                        assert.isString(res.body[0].operatorName);
                        done();
                    }
                    else
                        return(done(err));
                })
        });
        it('should have an string with operatorImageURL property', function(done){
            request(baseURL)
                .get('/api/Operators')
                .set(mashape_header, mashape_secret)
                .expect(200)
                .end(function(err, res){
                    if(!err){
                        expect(res.body[0].operatorImageURL, 'operatorImageURL not defined').to.not.be.undefined;
                        assert.isString(res.body[0].operatorImageURL);
                        done();
                    }
                    else
                        return(done(err));
                })
        });
    });

    describe('Get list of USSD codes for an operator', function(){
        it('should have an object with codeId property', function(done){
            request(baseURL)
                .get('/api/Codes?operatorId=' + operatorIds[1])
                .set(mashape_header, mashape_secret)
                .expect(200)
                .end(function(err, result){
                    if(err)
                        return (done(err));
                    else {
                        expect(result.body[0].codeId, 'codeId not defined').to.not.be.undefined;
                        assert.isString(result.body[0].codeId);
                        done();
                    }
                })
        });
        it('should have an object with title property', function(done){
            request(baseURL)
                .get('/api/Codes?operatorId=' + operatorIds[1])
                .set(mashape_header, mashape_secret)
                .expect(200)
                .end(function(err, result){
                    if(err)
                        return (done(err));
                    else {
                        expect(result.body[0].title, 'title not defined').to.not.be.undefined;
                        assert.isString(result.body[0].title);
                        done();
                    }
                })
        });
        it('should have an object with ussdCode property', function(done){
            request(baseURL)
                .get('/api/Codes?operatorId=' + operatorIds[1])
                .set(mashape_header, mashape_secret)
                .expect(200)
                .end(function(err, result){
                    if(err)
                        return (done(err));
                    else {
                        expect(result.body[0].ussdCode, 'ussdCode not defined').to.not.be.undefined;
                        assert.isString(result.body[0].ussdCode);
                        done();
                    }
                })
        });
    });
});