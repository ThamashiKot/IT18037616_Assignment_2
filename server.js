const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 8000;
const host = '0.0.0.0';

app.use(bodyParser.urlencoded({extended: true}))
//require('./app/routes')(app, {});


MongoClient.connect(db.url, (err, client) => {

    if (err) return console.log(err)

    require('./app/routes')(app, client.db('customer'));

    app.listen(port, host);

console.log(`Running on http://${host}:${port}`);

})


//const client = new MongoClient(db.url, {useNewUrlParser: true})
//client.connect(err => {
   // if (err) return console.log(err)
   // const db = client.db("customer")
   // require('./app/routes')(app,db);
   // app.listen(port, () =>{
      //  console.log("we are live on "+port);

  //  })
//});
