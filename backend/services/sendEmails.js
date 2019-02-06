
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Exam = require('../models/exam');
const { getStudentByEmails } = require('./student');
const { getActiveQuestionCount, getRandomQuestions } = require('./question');

router.route('/send-invitation')
    .post(async (req, resp) => {
        const data = req.body;
        const questionCount = await getActiveQuestionCount();   //inside question service we will create
        const randomQuestions = await getRandomQuestions(3, questionCount);
        const students = await getStudentByEmails(data.emails);     //inside student service we will create
        const questions = [];
        randomQuestions.forEach(q => {
            questions.push({
                title: q.title,
                question: q.question,
                answers: []
            })
        });
        data.emails.forEach(email => {
            const payload = {
                email,
                timestamp: new Date().getTime()
            }
            let exam = {
                studentEmail: email,
                questions,
                token: jwt.sign(payload, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                    { expiresIn: '7d' }),
                status: 'sent',
                duration: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const student = students.find(s => s.email === email);
            Exam.create(exam).then(result => {
                const invitationLink = `<a href="${examUrl}?token=${exam.token}">link</a>`;
                let emailMessage = emailMessage.replace('##STUDENT_NAME##', `${student.name}`).replace('##EXAM_LINK##', invitationLink);
                sendEmail(email, 'you have 120 minute', emailMessage);
            }).catch(error => console.log(error));
        });

        resp.status(200).json({
            code: 1,
            data: `Good Luck`
        });
    });

    async function sendEmail(email, message, messageHTML = '') {
        const nodemailer = require("nodemailer");
    
        //transporter object for host information, user anf password
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                //should be stored inside dotenv
                user: 'ooiyfratgmukejdw@ethereal.email',
                pass: 'tVnMN5zUE7kEpBEaek'
            }
        });
    
        //Define the message
        let message = {
            from: "Student Screening",
            to: email,
            text: message,
            html: messageHTML
        };
    
        //send E-Mail
        await transporter.sendMail(message);
    }