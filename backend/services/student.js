const Student = require('../models/student');

function getStudentByEmails(emails) {
	return Student.find({ email: { $in: emails } }).exec();
}

function getStudentByEmail(email) {
	return Student.findOne({ email }, { _id: 0 }).exec();
}

module.exports = {
	getStudentByEmails,
	getStudentByEmail
}