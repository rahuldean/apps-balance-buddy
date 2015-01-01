/**
 * Created by Rahul Reddy Malkireddy on 1/1/15.
 */

module.exports = {
    db: getDatabaseForCurrentEnvironment(),
    server: {
        ip: process.env.SERVER_IP || 'localhost',
        port: process.env.SERVER_PORT || '8003'
    },
    headers: {
        mashape_header_name: 'X-Mashape-Proxy-Secret',
        mashape_api_secret: process.env.MASHAPE_SECRET || 'VagueAPIKey'
    }
};

function getDatabaseForCurrentEnvironment(){
    var db = "";
    switch(process.env.ENVIRONMENT){
        case 'test' :
            db = process.env.MONGODB || 'mongodb://localhost:27017/BalanceBuddy_Test';
            break;
        case 'production' :
            db = process.env.MONGODB || 'mongodb://localhost:27017/BalanceBuddy';
            break;
        default :
            db = 'mongodb://localhost:27017/BalanceBuddy';
    }
    return db;
}