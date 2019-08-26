require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use( require('./routes/usuarios'));

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
     if(err) throw new Error(err);

     console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
     console.log(`app ejecutando en el puerto ${process.env.PORT}`);
})