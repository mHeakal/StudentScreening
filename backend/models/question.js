const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: { type: String, require: true },
    question: { type: String, required: true },
    status: { type: Boolean, required: true }
});

module.exports = mongoose.model("Question", questionSchema);
