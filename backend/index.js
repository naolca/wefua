const admin = require('firebase-admin');
const express = require('express'); 
const Tweet = require('./Models/Tweet');
const Reply = require('./Models/Reply');

const app = express(); 
const PORT = 3000; 

const serviceAccount = require('/home/firaol/Desktop/wefua/wefua/backend/wefua-5a385-firebase-adminsdk-ahbcm-bf9e75e3b7.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://wefua-5a385.firebaseio.com',
});


const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })
const userRef = db.collection('users');


app.get('/', (req, res) => {
    res.send("fira")
    // const newTweet = new Tweet('user_id_here', 'This is a tweet about Firestore.', new Date());
    // const tweetRef = db.collection('tweets').doc(); // Create a new document with a random ID
    // tweetRef.set(newTweet.toObject()); // Save the tweet document
});

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
