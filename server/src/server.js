var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var amqp = require('amqplib/callback_api');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/serverDB";

app.use(express.static('public'));
app.use(express.json());

var task;
var userWs;
var amqpChannel;
var server;

amqp.connect(process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost', async function (err, conn) {
    if(err){
        return console.log('Error connecting to RabbitMQ: '+err);
    }
    amqpChannel = await conn.createChannel();
    console.log("Connected to RabbitMQ");
    // queues creation
    await amqpChannel.assertQueue('tasksProgress');
    await amqpChannel.assertQueue('newTasks');
    amqpChannel.consume('tasksProgress', function(msg){
        var message = JSON.parse(msg.content.toString());
        console.log("Message received: "+ JSON.stringify(message));
        sendWs(message);
    }, { noAck: true });
});

MongoClient.connect(url, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')

    const db = client.db('serverDB');
    server = db.collection('server');
})

function sendWs(message) {
    if (!!userWs) {
        userWs.send(JSON.stringify(message));
    }
}

async function processTask() {

    if(!amqpChannel){
        console.error("Not connected to RabbitMQ");
    } else {

        var newTask = {
            id: task.id,
            text: task.text
        }

        amqpChannel.sendToQueue("newTasks", Buffer.from(JSON.stringify(newTask)));
    }

}

app.route('/tasks/:id')
    .get(function (req, res, next) {

        if (!!task && req.params.id == task.id) {
            res.send(task);
        } else {
            res.status(404).end();
        }

    }).delete(function (req, res) {

        if (!!task && req.params.id == task.id) {
            res.send(task);
            task = undefined;
        } else {
            res.status(404).end();
        }
    });

app.post('/tasks/', function (req, res) {

    if (!!task) {
        res.status(409).send('Tasks already created');
    } else {

        task = {
            id: 1,
            text: req.body.text,
            progress: 0,
            completed: false
        }

        res.status(201).send(task);

        server.insertOne({
            'requestType': "test"
        })

        processTask();
    }

})

app.ws('/taskProgress', async function (ws, req) {
    console.log('User connected');
    userWs = ws;
});

app.listen(3000);