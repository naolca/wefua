const admin = require('firebase-admin');

// Initialize Firebase Admin SDK


// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Create new user
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        // Create and send JWT token
        const token = await admin.auth().createCustomToken(userRecord.uid);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Sign in a user
exports.signIn = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        // Sign in user
        const { user } = await admin.auth().signInWithEmailAndPassword(email, password);

        // Create and send JWT token
        const token = await admin.auth().createCustomToken(user.uid);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Check if user is signed in
exports.checkSignInStatus = async (req, res) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(req.headers.authorization.split(' ')[1]);
        const userRecord = await admin.auth().getUser(decodedToken.uid);
        req.user = userRecord;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Sign out a user
exports.signOut = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ msg: 'Signed out successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
