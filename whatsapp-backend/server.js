import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';

//app config
const app = express();
const port = process.env.PORT || 9001;
const pusher = new Pusher({
    appId: "1217012",
    key: "d8c2d21f3b4a651b5773",
    secret: "bc1df631e31021e5cdfd",
    cluster: "ap2",
    useTLS: true
  });


//middlewares
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader("Access-Control-Allow-Headers", '*')
    next();
});


//DB config
const connection_url = 'mongodb+srv://whatsapp-user:hJA9Bz4osWK6TGox@cluster0.b7oub.mongodb.net/whatsapp-clone-db?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//pusher--real time db
const db = mongoose.connection;

db.once("open", ()=> {
    console.log("DB initialized");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        // console.log('change occuredd man!!',change);

        if(change.operationType == 'insert') {
            const   messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        }
        else {
            console.log("Error triggering Pusherrr!i!i");
        }

    })
});

//api routes
app.get('/', (req,res) => res.status(200).send('hello abishek'));
app.get('/messages/sync', (req,res) => {
    Messages.find((err,data) =>{
        if(err) {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
});

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err,data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})


//api listen
app.listen(port, () => console.log(`listening to localhost: ${port}`))
