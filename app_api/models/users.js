var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: String,
    studyClass: String
});