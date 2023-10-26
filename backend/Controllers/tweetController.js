const admin = require('firebase-admin');
const db = admin.firestore();

// Function to create a new tweet
exports.createTweet = async (req, res) => {
    try {
        const { content, author } = req.body;
        const newTweet = {
            content,
            author,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        const docRef = await db.collection('tweets').add(newTweet);
        const tweet = await docRef.get();
        res.status(201).json({
            id: docRef.id,
            data: tweet.data(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating tweet');
    }
};

// Function to get all tweets
exports.getAllTweets = async (req, res) => {
    try {
        const tweets = [];
        const snapshot = await db.collection('tweets').get();
        snapshot.forEach((doc) => {
            tweets.push({
                id: doc.id,
                data: doc.data(),
            });
        });
        res.status(200).json(tweets);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting tweets');
    }
};

// Function to get a single tweet by ID
exports.getTweetById = async (req, res) => {
    try {
        const { id } = req.params;
        const docRef = await db.collection('tweets').doc(id).get();
        if (!docRef.exists) {
            res.status(404).send('Tweet not found');
        } else {
            res.status(200).json({
                id: docRef.id,
                data: docRef.data(),
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting tweet');
    }
};

// Function to update a tweet by ID
exports.updateTweetById = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const docRef = db.collection('tweets').doc(id);
        const updateData = {
            content,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        await docRef.update(updateData);
        const updatedTweet = await docRef.get();
        res.status(200).json({
            id: docRef.id,
            data: updatedTweet.data(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating tweet');
    }
};

// Function to delete a tweet by ID
exports.deleteTweetById = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('tweets').doc(id).delete();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting tweet');
    }
};

