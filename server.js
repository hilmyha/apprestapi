const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse app/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// run server
// call routes
var routes = require('./routers');
routes(app);

app.listen(3000, () => {
    console.log(`Server started on 3000`);
});