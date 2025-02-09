const {DataTypes} = require('sequelize');
const Template = require('/templateModel')
const sequelize = require('../config/db');

const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    template_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Template,
            key: "id"
        },
    },
    type: {
        type: DataTypes.ENUM('text', 'number', 'checkbox', 'textarea'),
        allowNull: false
    },
    question_text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    show_in_results: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true
});

module.exports = Question;