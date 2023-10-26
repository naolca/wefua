const admin = require('firebase-admin');
const db = admin.firestore();

// Function to add a reply to a tweet
const addReply = async (req, res) => {
    try {

        // Get user ID from request
        const { userId } = req.user;


        const { tweetId, replyText } = req.body;
        
        // Check if tweet exists
        const tweetRef = db.collection('tweets').doc(tweetId);
        const tweetDoc = await tweetRef.get();
        if (!tweetDoc.exists) {
            return res.status(404).json({ error: 'Tweet not found' });
        }

        // Add reply to Firestore
        const replyRef = db.collection('replies').doc();
        await replyRef.set({
            tweetId,
            userId,
            replyText,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return res.status(201).json({ message: 'Reply added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

// Function to get all replies for a tweet
const getRepliesForTweet = async (req, res) => {
    try {
        const { tweetId } = req.params;

        // Check if tweet exists
        const tweetRef = db.collection('tweets').doc(tweetId);
        const tweetDoc = await tweetRef.get();
        if (!tweetDoc.exists) {
            return res.status(404).json({ error: 'Tweet not found' });
        }

        // Get all replies for tweet
        const repliesRef = db.collection('replies');
        const querySnapshot = await repliesRef.where('tweetId', '==', tweetId).get();
        const replies = [];
        querySnapshot.forEach((doc) => {
            replies.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return res.status(200).json(replies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

// Export controller functions
module.exports = {
    addReply,
    getRepliesForTweet,
};
