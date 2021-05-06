const http = require('http');
const https = require('https');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = 'AC5c90dd9a03c85f9f499d230fbf3ecbaa';
const authToken = '54c01eac499fa32f3f90af822ec9065d';
const client = require('twilio')(accountSid, authToken);


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/sms', async (req, res) => {
    const twiml = new MessagingResponse();
    console.log(req.body);

    callback = function(response) {
        var str = ''
        response.on('data', function (chunk) {
          str += chunk;
        });
      
        response.on('end', function () {
          console.log(str);
        });
      }

    const options = {
        host: 'https://co1617285573244.my.salesforce.com/services/apexrest/message',
        method: 'POST',
        body: {
            message: req.body.body,
            asof: req.body.from
        }
    }
    try {
        let request = https.request(options, callback);
        request.end();
    }catch(e) {
        console.log(e);
    }
    
    
    twiml.message('Dale!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.get('/', function (req, res) {
    console.log('entrou GET');
    client.messages 
        .create({ 
            body: 'msg pro-ativa', 
            from: 'whatsapp:+14155238886',       
            to: 'whatsapp:+555391978098' 
        }) 
        .then(message => console.log(message.sid)) 
        .done();
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});