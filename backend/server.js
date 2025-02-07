require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const User = require('./models/userModel');
const bcrypt = require('bcryptjs');



const userRoutes = require('./routes/userRoutes');
const templateRoutes = require('./routes/templateRoutes')
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes, templateRoutes);

const PORT = process.env.PORT || 3001;

const initializeDefaultAdminUser = async() => {
    try {
        const adminExists = await User.findOne({ where: { isAdmin: true } });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await User.create({
                name: "Admin",
                email: "admin@example.com",
                password: hashedPassword,
                isAdmin: true
            });
            console.log("Admin is successfully created: admin@example.com / admin123");
        } else {
            console.log("Admin exists");
        }
    } catch (error) {
        console.error("Error while creating administrator:", error);
    }


}

initializeDefaultAdminUser();

sequelize.sync().then(() => console.log("Connected to db"));
app.listen(3001, () => console.log("Server is running on port 3001"));

