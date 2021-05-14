const http = require('http');
const https = require('https');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = 'AC5c90dd9a03c85f9f499d230fbf3ecbaa';
const authToken = '7665284468f5c06eef4cd0ac04a3a0f9';
const client = require('twilio')(accountSid, authToken);


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/sms', async (req, res) => {
    const twiml = new MessagingResponse();
    console.log(req.body);
    // callback = function(response) {
    //     var str = ''
    //     response.on('data', function (chunk) {
    //       console.log('on');
    //       str += chunk;
    //     });
      
    //     response.on('end', function () {
    //       console.log('end');
    //       console.log(str);
    //     });
    //   }

    // const options = {
    //   host: 'https://d.la3-c2-ia4.salesforceliveagent.com/chat/rest/',
    //   method: 'POST',
    //   body: {
    //     message: req.body.body,
    //   }
    // }
    // let request = https.request(options, callback);
    
    // request.end();
    
    twiml.message('Dale!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.get('/', function (req, res) {
    console.log('entrou GET');
    console.log(req.query);
    console.log(req.body);
    client.messages 
        .create({ 
            body: 'mgs-proativa', 
            from: 'whatsapp:+14155238886',       
            to: 'whatsapp:+555391978098' 
        }) 
        .then(message => console.log(message.sid)) 
        .done();
        res.sendStatus(200);
        res.end();
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

var initESW = function(gslbBaseURL) {
  embedded_svc.settings.displayHelpButton = true; //Or false
  embedded_svc.settings.language = ''; //For example, enter 'en' or 'en-US'

  //embedded_svc.settings.defaultMinimizedText = '...'; //(Defaults to Chat with an Expert)
  //embedded_svc.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)

  //embedded_svc.settings.loadingText = ''; //(Defaults to Loading)
  //embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)

  // Settings for Chat
  //embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
    // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
    // Returns a valid button ID.
  //};
  //embedded_svc.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
  //embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
  //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)

  embedded_svc.settings.enabledFeatures = ['LiveAgent'];
  embedded_svc.settings.entryFeature = 'LiveAgent';

  embedded_svc.init(
    'https://co1617285573244.my.salesforce.com',
    'https://sdodemo-main-166ce2cf6b6-172-1788dbc74ee.force.com',
    gslbBaseURL,
    '00D5Y0000024iD6',
    'WebChat',
    {
      baseLiveAgentContentURL: 'https://c.la3-c2-ia4.salesforceliveagent.com/content',
      deploymentId: '5725Y000000oyIy',
      buttonId: '5735Y000000oyjs',
      baseLiveAgentURL: 'https://d.la3-c2-ia4.salesforceliveagent.com/chat',
      eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I5Y000000oqDlUAI_1793d815746',
      isOfflineSupportEnabled: false
    }
  );


  /*<!-- <a id="liveagent_button_online_5735Y000000oyjs" href="javascript://Chat" style="display: none;" onclick="liveagent.startChat('5735Y000000oyjs')">Online Chat</a><div id="liveagent_button_offline_5735Y000000oyjs" style="display: none;">Offline Chat</div><script type="text/javascript">
			if (!window._laq) { window._laq = []; }
			window._laq.push(function(){liveagent.showWhenOnline('5735Y000000oyjs', document.getElementById('liveagent_button_online_5735Y000000oyjs'));
			liveagent.showWhenOffline('5735Y000000oyjs', document.getElementById('liveagent_button_offline_5735Y000000oyjs'));
			});</script>
			
			<script type='text/javascript' src='https://c.la3-c2-ia4.salesforceliveagent.com/content/g/js/51.0/deployment.js'></script>
			<script type='text/javascript'>
			liveagent.init('https://d.la3-c2-ia4.salesforceliveagent.com/chat', '5725Y000000oyIy', '00D5Y0000024iD6');
			</script> -->*/
};