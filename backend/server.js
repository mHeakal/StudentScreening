const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const routes = require('./routes');
const Mongoclient = require('Mongodb').MongoClient;
const client = Mongoclient('url');

let db;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use((req, res, next) => {
    if(!db) client.connect(error => {
        req.db = client.db('dbname');
        return next();
    })
    req.db = db;
    return next();
})

app.use('/api', routes);
app.listen(8000, ()=>{console.log("Server started.")});

