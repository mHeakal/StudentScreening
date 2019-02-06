const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
	studentEmail: {
		type: String,
		require: true
	},
	questions: {
		type: Array,
		require: true
	},
	token: {
		type: String,
		require: true,
		unique: true
	},
	duration: {
		type: Number
	},
	status: {
		type: String,
		enum: ['sent', 'answered', 'passed', 'failed'],
		required: true
	},
	createdAt: {
		type: Date,
	},
	updatedAt: {
		type: Date
	}
});

module.exports = mongoose.model("Exam", examSchema);