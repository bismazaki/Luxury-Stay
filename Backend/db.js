const mongoose = require('mongoose');

// Connect to MongoDB
let db_url = process.env.ATLAS_URL
if(!db_url){
    console.log('URL not found')
}
else {
    console.log(`Atlas url ${db_url}`)
}

mongoose.connect(db_url , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

module.exports = MongoConnect;

// Import models
