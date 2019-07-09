const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var cors = require('cors');
app.use(express.json())
   app.use(cors());


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('./Routes/route')(app);


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("connexion avec succes");    
}).catch(err => {
    console.log('erreur de connexion', err);
    process.exit();
});



app.get('/', (req, res) => {
    res.send('Bienvenue')
});

app.listen(8080, () => {
    console.log("Server demarer");
});