const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/api');


const app = express();

mongoose.connect('mongodb://localhost/DBuniv', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.Promise = global.Promise

app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json())
app.use(routes)


app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});