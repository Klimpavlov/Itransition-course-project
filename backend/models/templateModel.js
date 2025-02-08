const {DataTypes} = require('sequelize');
const sequelize =  require('../config/db');

const Template = sequelize.define("Template", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: true,
    underscored: true
});

module.exports = Template;