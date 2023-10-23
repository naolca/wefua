const admin = require('firebase-admin');
const express = require('express'); 

const app = express(); 
const PORT = 3000; 

const serviceAccount = require('/home/firaol/Desktop/wefua/wefua/backend/wefua-5a385-firebase-adminsdk-ahbcm-bf9e75e3b7.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://wefua-5a385.firebaseio.com',
});



app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
