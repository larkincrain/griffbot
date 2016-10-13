//The Griffon Bot!
var _ = require('lodash');

var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RtmClient = require('@slack/client').RtmClient;

var token = 'xoxb-85805621765-5cX8Nx8FiaAPJrYrPt8tmGIn';
var griffBot = new RtmClient(token, {logLvel: 'debug'});

var teamConversationList = {};
var teamMembersLists = {};

var mobileEnrollmentConversation;

//Start the Real Time Messaging app!
griffBot.start();

//Check to see if we're authenticated
griffBot.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log('Logged in as ' + rtmStartData.self.name + ' of team ' + rtmStartData.team.name + ', but not yet connected');
  console.log('Start Data: ');
  //console.log(rtmStartData);

  teamConversationList = rtmStartData.channels;
  teamMembersLists = rtmStartData.users;
  //
  console.log('All the conversations: ');
  console.log(teamConversationList);
  //
  // console.log('All the team members: ');
  // console.log(teamMembersLists);

});


griffBot.on(RTM_EVENTS.MESSAGE, function (message) {
  // Listens to all `message` events from the team

  console.log('New message: ');
  console.log(message);

  if (message.text.indexOf('hey eric') > -1 ) {
    //then we shoudl respond with sarcasm!
    griffBot.sendMessage(
      ':face_with_rolling_eyes: ' + message.text,
      message.channel,
      function (){
        console.log('Sassed em good, boss');
      }
    );
  }
});

// you need to wait for the client to fully connect before you can send messages
griffBot.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {

  console.log('Connected to the server');

  //Ok, let's print the mobile enrollment conversation
  mobileEnrollmentConversation =  _.filter(teamConversationList,
      {name: 'mobile-enrollment'}
  )[0];
});
