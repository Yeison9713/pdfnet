const mongoose = require('mongoose');

async function main() {
    try {

        var mongoDB = 'mongodb://127.0.0.1/siged';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));


    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    main
}