/**
 * Created by Rahul Reddy Malkireddy on 1/1/15.
 */

var chai                = require('chai'),
    assert              = chai.assert;

describe('Basic API Tests', function(){
   describe('Get list of operators', function(){
       it('should give at least one operator', function(){
            assert.notOk(true, 'not implemented');
       });
       it('should return a JSON array', function(){
           assert.notOk(true, 'not implemented');
       });
   });

    describe('Get list of USSD codes for an operator', function(){
        it('should give at least one code', function(){
            assert.notOk(true, 'not implemented');
        });
        it('should give empty result when wrong operator code is sent', function(){
            assert.notOk(true, 'not implemented');
        });
        it('should give 400 bad request when an undefined parameter is sent', function(){
            assert.notOk(true, 'not implemented');
        });
        it('should return a JSON array', function(){
            assert.notOk(true, 'not implemented');
        });
    });

    describe('Verify request authorization header', function(){
        it('should accept requests having correct X-Mashape-Proxy-Secret header', function(){
            assert.notOk(true, 'not implemented');
        });
        it('should reject requests having incorrect/ missing X-Mashape-Proxy-Secret header ', function(){
            assert.notOk(true, 'not implemented');
        });
    });

    describe('Validate invalid routes', function(){
        it('should throw 404 Not found when invalid route is requested', function(){
            assert.notOk(true, 'not implemented');
        });
    });
});

describe('Individual API Tests', function(){
    describe('Get list of operators', function(){
        it('should have an object with operatorId property', function(){
            assert.notOk(true, 'not implemented');
        });
        it('should have an object with operatorName property', function(){
            assert.notOk(true, 'not implemented');
        });
        it('should have an object with operatorImageURL property', function(){
            assert.notOk(true, 'not implemented');
        });
    });

    describe('Get list of USSD codes for an operator', function(){
        it('should have an object with codeId property', function(){
            assert.notOk(true, 'not implemented');
        });
        it('should have an object with title property', function(){
            assert.notOk(true, 'not implemented');
        });
        it('should have an object with ussdCode property', function(){
            assert.notOk(true, 'not implemented');
        });
    });
});