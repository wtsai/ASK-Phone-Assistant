/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This sample shows how to create a Lambda function for handling Alexa Skill requests that:
 *
 * - Custom slot type: demonstrates using custom slot types to handle a finite set of known values
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Phone Assistant what is the extension number for someone."
 *  Alexa: "(reads back extension number for someone)"
 */

'use strict';

var AlexaSkill = require('./AlexaSkill'),
    People = require('./People'),
    CellPhone = require('./CellPhone'),
    StockPrice = require('./StockPrice');

var APP_ID = 'amzn1.ask.skill.xxxxxxxxxxxxxxxxxxxxxxx'; //replace with 'amzn1.[your-unique-value-here]';

/**
 * PhoneAssistant is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var PhoneAssistant = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
PhoneAssistant.prototype = Object.create(AlexaSkill.prototype);
PhoneAssistant.prototype.constructor = PhoneAssistant;

PhoneAssistant.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to the Phone Helper. You can ask a question like,  what is the extension number for someone? ... Now, what can I help you with.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

PhoneAssistant.prototype.intentHandlers = {
    "AssistantIntent": function (intent, session, response) {
        var itemSlot = intent.slots.Person,
            itemName;
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = "Extension number for " + itemName,
            reply = People[itemName],
            speechOutput,
            repromptOutput;
        if (reply) {
            speechOutput = {
                speech: reply,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, reply);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know the extension number for " + itemName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that extension number. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },
    "CellPhoneIntent": function (intent, session, response) {
        var itemSlot = intent.slots.Person,
            itemName;
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = "Cell number for " + itemName,
            reply = CellPhone[itemName],
            speechOutput,
            repromptOutput;
        if (reply) {
            speechOutput = {
                speech: reply,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, reply);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know the cell number for " + itemName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that cell number. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },
    "StockIntent": function (intent, session, response) {
        var itemSlot = intent.slots.Company,
            itemName;
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = "Stock Price" + itemName,
            reply = StockPrice[itemName],
            speechOutput,
            repromptOutput;
        if (reply) {
            speechOutput = {
                speech: reply,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, reply);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know the stock price for " + itemName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that stock price. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },
    "JokeNewYearIntent": function (intent, session, response) {
        var speechOutput = "Shin Nian Kwai Le. Hong Bao Na Lai ";
        response.tell(speechOutput);
    },
    "JokeSoftwareIntent": function (intent, session, response) {
        var speechOutput = "The one who must not be named. You know who";
        response.tell(speechOutput);
    },
    "JokeSingIntent": function (intent, session, response) {
        var speechOutput = "Trust me. You would not like it";
        response.tell(speechOutput);
    },
    "JokeCoffeeIntent": function (intent, session, response) {
        var speechOutput = "Sold out. Come early next time. ";
        response.tell(speechOutput);
    },
    "JokeAlphaIntent": function (intent, session, response) {
        var speechOutput = "Well, the one you are speaking to.";
        response.tell(speechOutput);
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions about Phone Assistant such as,  what is the extension number for someone? what can I help you with?";
        var repromptText = "You can say things like,  what is the extension number for someone, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var phoneAssistant = new PhoneAssistant();
    phoneAssistant.execute(event, context);
};
