/**
 * Created by Rahul Reddy Malkireddy on 1/1/15.
 */

module.exports = {
    db: process.env.MONGODB || 'mongodb://localhost:27017/BalanceBuddy',
    server: {
        ip: process.env.SERVER_IP || 'localhost',
        port: process.env.SERVER_PORT || '8003'
    }
};