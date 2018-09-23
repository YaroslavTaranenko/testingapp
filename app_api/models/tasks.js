var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrect: {type: Boolean, default: false }
});

var questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    order: Number,
    answers: [answerSchema]
});

var taskSchema = new mongoose.Schema({
    name: {type: String, required: true},
    created: Date,
    questions: [questionSchema]
});

mongoose.model('Task', taskSchema, 'tasks');
