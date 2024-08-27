const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses'); // Assuming you have a route for courses
const userRoutes = require('./routes/user'); // Add this line to import user routes for dashboard

// Register routes
app.use('/auth', authRoutes);
app.use('/api/courses', courseRoutes); 
app.use('/api', userRoutes); // Register user routes under '/api'

// Default route for testing
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Sure Trust API',
        endpoints: {
            signup: '/auth/signup',
            login: '/auth/login',
            courses: '/api/courses',
            dashboard: '/api/dashboard' // Add dashboard endpoint information
        },
        status: 'API is running',
        version: '1.0.0'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
