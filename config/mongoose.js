const mongoose = require('mongoose');
const URL = "mongodb+srv://mongoDB:mongo@12345@coder-cluster-ywewf.mongodb.net/test?retryWrites=true&w=majority";
const env = require('./environment');
mongoose.connect(URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to Mongodb"));

db.once('open', function(){

    console.log('Connected to database:: MongoDB');
});

module.exports = db;
