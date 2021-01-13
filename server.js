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

    var prom = new Promise((res, rej) => {

        res(DB.find(ele => ele.category === body.category && ele.name === body.name));

        /*for (i = 0; i < DB.length; i++) {
            if (DB[i].category === body.category && DB[i].name === body.name) {
                code = 201;
                let pervTotalPrice = parseInt(DB[i].number) * parseInt(DB[i].price)
                DB[i].number = parseInt(body.number);
                DB[i].price = parseInt(body.price);
                DB[i].totalPrice = parseInt(DB[i].totalPrice) - pervTotalPrice + parseInt(body.totalPrice);
                content = "Exists";
                res("Exists");
            }
        }
        res("Doesnt Exists");*/
    });
    
    /*prom.then(value => {
        if(value === "Doesnt Exists") DB.push(body);
    })*/

    prom.then(ele => {
        if(ele != undefined) {
            code = 201;
            let pervTotalPrice = parseInt(ele.number) * parseInt(ele.price)
            ele.number = parseInt(body.number);
            ele.price = parseInt(body.price);
            ele.totalPrice = parseInt(ele.totalPrice) - pervTotalPrice + parseInt(body.totalPrice);
            content = "Exists";
        }
        else {
            DB.push(body);
        }

        response.status(code).send({
            message: content
        });
    })
});

app.listen(port, () => console.log(`Server running on port ${port}`));