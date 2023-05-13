
const fs = require('fs');
const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

});


client.on('message', message => {
	
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        //get the output from search and send back.
        const msg = searchByKey(message.body,jsonData);
        message.reply(msg);
        
        
    });
    

}); 

 

client.initialize();


// function for serching data from json file. 
function searchByKey(key,data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].key.includes(key)) {
        const valueArray = data[i].value;
        const randomIndex = Math.floor(Math.random() * valueArray.length);
        return valueArray[randomIndex];
        }
    }
    return null;
}