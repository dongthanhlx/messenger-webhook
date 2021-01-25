'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());

app.listen(process.env.PORT || 1337, () => {console.log('webhook is listening')});  

app.post('/webhook', (req, res) => {
    let body = req.body;

    if (body.object == 'page') {
        body.entry.forEach(entry => {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
})

app.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = "EAAKroalQkfQBAA1alZAA0FOtenAJaXKuTnnXOn154scb98B2fxTcMzEidNqX2iYrXaVMxCvT8l4RhYPOpmiQYPRajfuel7mknTMjRk1cLbwEQz4NOvMwncM41Yv9KssnEvhAFFk10rxNp9ZCZCZBww7KfKZBALKzqD4wpc2JZA5UFEXhJjkmkz";
    
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
})