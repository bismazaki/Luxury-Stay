const MongoConnect = require('./db');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

MongoConnect();
const app = express();
const port  = 2000;

app.use(cors());

//middleware
app.use(express.json());

//Routes
app.use('/api/User', require('./Route/User'));

//server starting
app.listen(port, ()=>{
    console.log(`Server bhaag rh hai ispe http://localhost:${port}`);
});


