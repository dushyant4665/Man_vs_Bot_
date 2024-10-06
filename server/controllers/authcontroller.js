exports.registerUser = async (req, res) => {
    console.log('Request body:', req.body); // Log incoming data
    const { username, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error); // Log error details
        res.status(500).json({ error: 'Registration failed. ' + error.message });
   }
};