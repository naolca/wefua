const admin = require('firebase-admin');
const express = require('express'); 



const serviceAccount = require('./wefua-5a385-firebase-adminsdk-ahbcm-bf9e75e3b7.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://wefua-5a385.firebaseio.com',
});
const userRoutes = require('./Routes/userRoutes');
const tweetRoutes = require('./Routes/tweetRoutes');
const replyRoutes = require('./Routes/replyRoutes');

const app = express(); 
const PORT = 3000; 
app.use(express.json());



const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })











app.use('/users', userRoutes);
app.use('/tweets', tweetRoutes);
app.use('/replies', replyRoutes);

app.listen(PORT, (error) =>{ 
    if(!error) 
    console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
else
console.log("Error occurred, server can't start", error); 
} 
); 
