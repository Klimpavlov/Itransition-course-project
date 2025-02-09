const {DataTypes} = require('sequelize');
const Form = require('/formModel');
const Question = require('/questionModel');
const sequelize = require('../config/db');
const User = require("./userModel");
const Template = require("./templateModel");

const Answer = sequelize.define("Answer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references : {
            model: Form,
            key: "id"
        }
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Question,
            key: "id"
        }
    },
    answerText: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true
})

module.exports = Answer;