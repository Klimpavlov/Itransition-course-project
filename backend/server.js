require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');


const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3001;
sequelize.sync().then(() => console.log("Connected to db"));

app.listen(3001, () => console.log("Server is running on port 3001"));

// const startServer = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log("Connected to db");
//         await sequelize.sync({ alter: true });
//         app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//     } catch (error) {
//         console.error('Connection db error:', error);
//     }
//
// }
//
// startServer();


