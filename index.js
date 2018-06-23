function setupEnvironment() {
    require('dotenv').config();
}

function daysUntilTarget() {
    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    const targetDate = new Date(2018, 11, 7);    
    const currentDate = new Date();    
    return Math.ceil((targetDate - currentDate) / (dayInMilliseconds));
}

function countdownMessage(daysRemaining) {
    const product = `${process.env.PRODUCT}`;
    switch(true) {
        case (daysRemaining === 0):
            return `@everyone Today is the release day for ${product}!`;
        case (daysRemaining === 1):
            return `@here Get ready for tomorrow! One more day until ${product} release!`;
        case (daysRemaining > 1):
            return `${daysRemaining} more days until ${product} release...`;
        default:
            return '';
    }
}    

function webhook() {    
    const Discord = require('discord.js');    
    return new Discord.WebhookClient(process.env.ID, process.env.TOKEN);
}

function sendMessageIfNotReleased() {
    const daysRemaining = daysUntilTarget();
    if (daysRemaining >= 0) {
        setupEnvironment();
        const hook = webhook();
        const message = countdownMessage(daysRemaining);
        hook.send(message);
    }
}

module.exports = function (context, myTimer) {
    sendMessageIfNotReleased();
    context.done();
};
