//server.js
const express = require("express");
const app = express();
const { port } = require("./config");
var bodyParser = require('body-parser')
var cors = require('cors');
app.use(cors());

jsonParser = bodyParser.json();

var DB = [
    { category: 'פירות', name:'אבוקדו', number:3, price:5, totalPrice: 15 },
    { category: 'מוצרי חלב', name:'מילקי', number:6, price:4, totalPrice: 24 }
  ];

// http://localhost:3001/
app.get('/', async (request, response) => {
    response.status(200).send({
        message: "Hello from Express Server!"
    });
});

// http://localhost:3001/getInitialList
app.get('/getInitalList', async function (request, response) {
    var code = 200;

    response.status(code).send({
        message: DB
    });
});

// http://localhost:3001/addItem
app.post('/addItem', jsonParser, async (request, response) => {
    var code = 200;
    var content = "Doesnt Exists";
    var body = request.body;

    var addedItem = DB.find(ele => ele.category === body.category && ele.name === body.name);

    if(addedItem != undefined) {
        code = 201;
        let pervTotalPrice = parseInt(addedItem.number) * parseInt(addedItem.price)
        addedItem.number = parseInt(body.number);
        addedItem.price = parseInt(body.price);
        addedItem.totalPrice = parseInt(addedItem.totalPrice) - pervTotalPrice + parseInt(body.totalPrice);
        content = "Exists";
    }
    else {
        DB.push(body);
    }

    response.status(code).send({
        message: content
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));