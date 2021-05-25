// @ts-check
const { host, bot } = require('../config');
const axios = require('axios').default;
const log = require('loglevel');
const { inspect } = require('util');

const request = axios.create({
    baseURL: host.api,
});

const generateSessionId = async () => {
    let options = {
        headers: {
          'Content-Type':'application/json',
          'X-LIVEAGENT-AFFINITY': 'null',
          'X-LIVEAGENT-API-VERSION': host.apiVersion,
        }
      }

    try { 
        const response = await request.get('/System/SessionId', options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
} 

const chasitorInit = async (user) => {
  
    let headers = { 
      headers:{
        'Content-Type':'application/json',
        'X-LIVEAGENT-AFFINITY': user.affinityToken,
        'X-LIVEAGENT-API-VERSION': host.apiVersion,
        'X-LIVEAGENT-SESSION-KEY': user.key,
        'X-LIVEAGENT-SEQUENCE': user.sequence
      }
    }
    let body = {
        'sessionId': user.sessionId,
        'organizationId': bot.ORGANIZATION_ID,
        'deploymentId': bot.DEPLOYMENT_ID,
        'buttonId': bot.BUTTON_ID,
        'userAgent': bot.USER_AGENT,
        'language': bot.LANGUAGE,
        'screenResolution': bot.SCREEN_RESOLUTION,
        'visitorName': user.profileName,
        'prechatDetails': [],
        'prechatEntities': [],
        'receiveQueueUpdates': true,
        'isPost': true
    }
    try { 
      const response = await request.post('/Chasitor/ChasitorInit', body, headers);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

const readChatDetails = async (user) => {
    let headers = { 
        headers:{
          'Content-Type':'application/json',
          'X-LIVEAGENT-AFFINITY': user.affinityToken,
          'X-LIVEAGENT-API-VERSION': host.apiVersion,
          'X-LIVEAGENT-SESSION-KEY': user.key,
        }
    }
    try { 
        const response = await request.get('/System/Messages', headers);
        console.log(inspect(response));
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const chatMessage = async (user, message) => {
    let headers = { 
      headers:{
        'Content-Type':'application/json',
        'X-LIVEAGENT-AFFINITY': user.affinityToken,
        'X-LIVEAGENT-API-VERSION': host.apiVersion,
        'X-LIVEAGENT-SESSION-KEY': user.key,
        'X-LIVEAGENT-SEQUENCE': user.sequence
      }
    }
    let body = {
        'text': message,
    }
    try { 
      const response = await request.post('/Chasitor/ChatMessage', body, headers);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

const syncChatSession = async (user) =>{
    let headers = { 
      headers:{
        'Content-Type':'application/json',
        'X-LIVEAGENT-AFFINITY': user.affinityToken,
        'X-LIVEAGENT-API-VERSION': host.apiVersion,
        'X-LIVEAGENT-SESSION-KEY': user.key,
      }
    }
    try {
   
      const response = await request.get('/System/ResyncSession', headers);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

module.exports = {
    generateSessionId,
    chasitorInit,
    readChatDetails,
    chatMessage,
    syncChatSession,
};