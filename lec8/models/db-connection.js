var mongoose = require('mongoose'),
    mongoUrl = 'mongodb://bookingsapp:ipLGp34xiPZQw8k4@cluster0-shard-00-00-eagem.mongodb.net:27017,cluster0-shard-00-01-eagem.mongodb.net:27017,cluster0-shard-00-02-eagem.mongodb.net:27017/bookings?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

mongoose.connect(mongoUrl);
mongoose.connection.on('connected', function(){
    console.log('connected to MongoDB');
});
module.exports = mongoose.connection;
//close MongoDB connection when stopping server
process.on('SIGINT', function(){
    mongoose.connection.close(function(){console.log('disconnected from MongoDB');});
});