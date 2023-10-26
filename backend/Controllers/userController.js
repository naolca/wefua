const admin = require('firebase-admin');
const db = admin.firestore();

// Function to create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userRef = db.collection('users').doc();
        const newUser = {
            id: userRef.id,
            name,
            email,
            password,
        };
        await userRef.set(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
};

// Function to get a user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userRef = db.collection('users').doc(id);
        const user = await userRef.get();
        if (!user.exists) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(user.data());
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting user');
    }
};

// Function to update a user by ID
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const userRef = db.collection('users').doc(id);
        const user = await userRef.get();
        if (!user.exists) {
            res.status(404).send('User not found');
        } else {
            const updatedUser = {
                id: user.id,
                name: name || user.data().name,
                email: email || user.data().email,
                password: password || user.data().password,
            };
            await userRef.update(updatedUser);
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
};

// Function to delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userRef = db.collection('users').doc(id);
        const user = await userRef.get();
        if (!user.exists) {
            res.status(404).send('User not found');
        } else {
            await userRef.delete();
            res.status(200).send('User deleted successfully');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
