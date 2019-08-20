require('./config/config');
const express = require('express');
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/usuarios/:id', (req, res) => {
     let id = req.params.id;
     res.json({
          id
     });
});

app.post('/usuarios', (req, res) => {
     let body = req.body;
     if (body.Nombre === undefined) {

          res.status(400).json({
               ok: false,
               mensaje: 'Debe de pasar un nombre'
          })

     } else {
          res.json({
               body
          })
     }
});

app.listen(process.env.PORT, () => {
     console.log(`app ejecutando en el puerto ${process.env.PORT}`);
})