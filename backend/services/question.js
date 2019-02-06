// const Question = require('../models/question');

// function getRandomQuestions(limit = 3, questionCount = 0) {
// 	const random = Math.floor(Math.random() * questionCount);
// 	if (questionCount < limit) {
// 		random = 0;
// 	}
// 	return Question.find({
// 		status: true
// 	}, {
// 			_id: 0,
// 			status: 0
// 		}).skip(random).limit(limit);
// }

// function getActiveQuestionCount() {
// 	return Question.find({ status: true }).count().exec();
// }

// module.exports = {
// 	getActiveQuestionCount,
// 	getRandomQuestions
// }