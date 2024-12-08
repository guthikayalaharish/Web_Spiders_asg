require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');


// Other imports and app setup



const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/tasks', taskRoutes);

// Error Handler
app.use(errorHandler);

// Connect to Database and Start Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
