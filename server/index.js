const express = require('express');

const bodyParser = require('body-parser');
const issueRoutes = require('./routes/issueRoutes');
const { connectDB, sequelize } = require('./config/db');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/issues', issueRoutes);

connectDB();

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync();
        console.log('Database synced successfully');

        app.listen(5000, () => console.log('Server running on port 5000'));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();