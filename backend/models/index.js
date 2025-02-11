const User = require('./userModel');
const Template = require('./templateModel');
const Question = require('./questionModel');
const Form = require('./formModel');
const Answer = require('./answerModel');

User.hasMany(Template, { foreignKey: 'user_id' });
Template.belongsTo(User, { foreignKey: 'user_id' });

Template.hasMany(Question, { foreignKey: 'template_id' });
Question.belongsTo(Template, { foreignKey: 'template_id' });

Template.hasMany(Form, { foreignKey: 'template_id' });
Form.belongsTo(Template, { foreignKey: 'template_id' });

User.hasMany(Form, { foreignKey: 'user_id' });
Form.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Form.hasMany(Answer, { foreignKey: 'form_id' });
Answer.belongsTo(Form, { foreignKey: 'form_id' });

Question.hasMany(Answer, { foreignKey: 'question_id' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });

module.exports = { User, Template, Question, Form, Answer };
