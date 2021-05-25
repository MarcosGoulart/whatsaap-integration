// {
//     SmsMessageSid: 'SMbee1dca33735f4b41eb4a78de763fdbf',
//     NumMedia: '0',
//     ProfileName: 'Marcos Goulart',
//     SmsSid: 'SMbee1dca33735f4b41eb4a78de763fdbf',
//     WaId: '555391978098',
//     SmsStatus: 'received',
//     Body: 'oi',
//     To: 'whatsapp:+14155238886',
//     NumSegments: '1',
//     MessageSid: 'SMbee1dca33735f4b41eb4a78de763fdbf',
//     AccountSid: 'AC5c90dd9a03c85f9f499d230fbf3ecbaa',
//     From: 'whatsapp:+555391978098',
//     ApiVersion: '2010-04-01'
// }'
const { userInfoStore, userInfoFactory } = require('../database');
const { services } = require('../services');
//const MessagingResponse = require('twilio').twiml.MessagingResponse;
const client = require('twilio')('AC5c90dd9a03c85f9f499d230fbf3ecbaa', '9d9ed937b4b6ff36794dfa6c74c26193');


const { inspect } = require('util');
module.exports = () => async (req, res) => {
    const { From, Body, ProfileName } = req.body;
    const number = From;
    let user = await userInfoStore.getByNumber(number);
    
    if (!user || !user.sessionId) {
        let data = await services.generateSessionId();
        let newUser = userInfoFactory.create({number, sessionId: data.id, key: data.key, affinityToken: data.affinityToken, clientPollTimeout: data.clientPollTimeout, profileName: ProfileName});
        const userAdded = await userInfoStore.updateOrInsert(newUser);
        if(userAdded){
            user = await userInfoStore.getByNumber(number);
            await services.chasitorInit(user);
            user.sequence++;
            await services.readChatDetails(user);
            await services.chatMessage(user, Body);
            user.sequence++;
            await services.syncChatSession(user);
            const response = await services.readChatDetails(user);
            if(response.messages){
                for(let i = 0; i < response.messages.length; i++){
                    //.log('response[i].type: ' + response.messages[i].type);
                    if(response.messages[i].type == 'ChatMessage'){
                        client.messages.create({ 
                            body: response.messages[i].message.text, 
                            from: 'whatsapp:+14155238886',       
                            to: number 
                        }) 
                        .then(message => console.log('sid:' + message.sid)) 
                        .done();
                    }
                }
            }
            
            res.sendStatus(200);
            res.end();
        } else {
            return res.status(404).send({ status: 'nok', error: 'unable to add user!' });
        }
    } else {
        const sync = await services.syncChatSession(user);
        if(sync){
            if(!sync.isValid){
                let data = await services.generateSessionId();
                let newUser = userInfoFactory.create({number, sessionId: data.id, key: data.key, affinityToken: data.affinityToken, clientPollTimeout: data.clientPollTimeout, profileName: ProfileName});
                const userAdded = await userInfoStore.updateOrInsert(newUser);
                if(userAdded){
                    user = await userInfoStore.getByNumber(number);
                    await services.chasitorInit(user);
                    user.sequence++;
                    await services.readChatDetails(user);
                } else {
                    return res.status(404).send({ status: 'nok', error: 'unable to update user!' });
                }
            }
        }
        await services.chatMessage(user, Body);
        user.sequence++;
        await services.syncChatSession(user);
        let response = await services.readChatDetails(user);
        console.log('responde: ' + response);
        if(response.messages){
            let text = '';
            for(let i = 0; i < response.messages.length; i++){
                if(response.messages[i].type == 'RichMessage'){
                    for(let j = 0; j < response.messages[i].message.items.length; j++) text +='\n'+j+': '+ response.messages[i].message.items[j];
                    client.messages.create({ 
                        body: text, 
                        from: 'whatsapp:+14155238886',       
                        to: number 
                    }) 
                    .then(message => console.log('sid:' + message.sid)) 
                    .done();
                }else if(response.messages[i].type == 'ChatMessage'){
                    client.messages.create({ 
                        body: response.messages[i].message.text, 
                        from: 'whatsapp:+14155238886',       
                        to: number 
                    }) 
                    .then(message => console.log('sid:' + message.sid)) 
                    .done();
                }
            }
        }
        res.sendStatus(200);
        res.end();
    }
}