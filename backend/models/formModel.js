const {DataTypes} = require('sequelize');
const Template = require('./templateModel');
const User = require('./userModel');
const sequelize = require('../config/db');

const Form = sequelize.define("Form", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references : {
            model: User,
            key: "id"
        }
    },
    template_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Template,
            key: "id"
        }
    }
}, {
    timestamps: true,
    underscored: true
})

module.exports = Form;