const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const routes = require('./routes');
const config = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

let db;
MongoClient.connect(process.env.DB_CONNECTION, (error,client) => {
    if(error) return console.log(error);
    db = client.db('StudentScreening');
    db.collection('User').createIndex({ email: 1 }, { sparse: true, unique: true });
})

app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));



app.use((req, res, next) => {
    if(req.headers.authorization){
        console.log('Header authorization '+ req.headers.authorization)
    }
    req.db = db;
    //console.log(req);
    return next();
})

app.use('/api', routes);
app.listen(8000, ()=>{console.log("Server started.")});

