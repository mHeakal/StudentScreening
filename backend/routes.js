const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
var randStr = require('randomstring');
//Define Routes:
router.post('/', (req, res) => {
    //console.log('login route');
    //reroute...
});
//Define Routes:

// Student exam routes

router.get('/student/authenticated/:token', (req, res) => {
    console.log('Student route' + req.params);
    console.log(req.params['token'] + " ");
    req.db.collection("students").findOne({ exam_token: req.params['token'], exam_token_status: true }, { name: 1 }

        , function (err, result) {
            if (err) {
                console.log('err ' + err);
                res.status(401).json({ success: false, message: "No exam found." })
            }
            console.log("Result of findone" + result);
            if (result) {
                if (result.name) {
                    res.status(200).json({ success: true, message: "User is authenticated" })
                }
            }
        });

});

router.get('/student/questions/:token', (req, res) => {
    console.log('Student route' + req.params);
    console.log(req.params['token'] + " ");
    req.db.collection("students").findOne({ exam_token: req.params['token'], exam_token_status: true }, { name: 1, exam: 1 }
        , function (err, result) {

            console.log("Result of findone" + result);
            if (err) {
                console.log('err ' + err);
                res.status(401).json({ success: false, message: "No exam found." })
            }
            else if (result) {
                if (result.name) {
                    req.db.collection('students').updateOne({ exam_token: { $eq: req.params['token'] } },
                    { $set: { exam_token_status: false } });
             
                    res.status(200).json({ success: true, message: "User is authenticated", exam: { name: result.name, questions: result.exam.questions } })
                }
            }
        });

});

router.patch('/student/questions/snapshot', (req, res) => {
    console.log('Student route' + req.body.id);
    console.log(req.params['token'] + " ");
    req.db.collection("students").findOne({ exam_token: req.params['token'], exam_token_status: true }, { name: 1, exam: 1 }
        , function (err, result) {

            console.log("Result of findone" + result);
            if (err) {
                console.log('err ' + err);
                res.status(401).json({ success: false, message: "No exam found." })
            }
            else if (result) {
                if (result.name) {
                     res.status(200).json({ success: true, message: "User is authenticated", exam: { name: result.name, questions: result.exam.questions } })
                }
            }
        });

});
router.patch('/student/questions/submit-answer', (req, res) => {
    console.log('Student route' + req.body.token);
    console.log(req.body['token'] + " "+req.body.answer_0);

    // need to implement the security for multiple answer submission
    req.db.collection("students").updateOne({ exam_token: req.body.token, exam_token_status: false}, 
        // { "$push": { 'exam.questions.$[p0].question.answer': req.body.answer_0, 'exam.questions.$[p1].question.answer': req.body.answer_1, 'exam.questions.$[p2].question.answer': req.body.answer_2 } }
        // , {
        //     arrayFilters: [ { "p0":0  }, { "p1":1  }, { "p2":2  } ]
        //   }
        { $set: {status: "answered"}, "$push": { 'exam.questions.0.answer': req.body.answer_0, 'exam.questions.1.answer': req.body.answer_1, 'exam.questions.2.answer': req.body.answer_2 } }
        
        , function (err, result) {

            console.log("Result of update" + result);
            if (err) {
                console.log('err ' + err);
                res.status(401).json({ success: false, message: "No exam found." })
            }
            else if (result) {
                if (result.nModified == 1) {
                    res.status(200).json({ success: true, message: "Answer has been submitted"})
                }
            }
        });

});
// student route end

router.post('/login', (req, res) => {
    console.log('login route');
    console.log('add staff ' + req.body);
    console.log(req.body.email + " " + req.body['email']);

    if (req.body.email && req.body.password) {

        let email = req.body.email;
        req.db.collection("staff").findOne({ email: req.body.email, password: req.body.password }, { name: 1, email: 1, role: 1 }
            // );
            , function (err, result) {
                if (err) console.log('err ' + err);
                console.log("Result of findone" + result);

                if (result.email) {
                    const payload = { email, timestamp: new Date().getTime() }
                    let jwtToken = jwt.sign(payload, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                        { expiresIn: '7d' });
                    console.log('JWT Token ' + jwtToken);
                    req.db.collection('staff').updateOne({ email: { $eq: email } },
                        // {'$set':{status :req.params.isActive}},
                        { $set: { token: jwtToken } },
                        (err, updateResult) => {
                            console.log("User update  " + updateResult);
                            if (err) {
                                res.status(500).json({ success: false, message: "There is an error on updating." })
                            } else {
                                res.status(200).json({ success: true, message: "Login successfull", token: jwtToken + '', name: result.name + '', email: result.email + '', role: result.role + '' })
                            }
                        });

                }
                else {
                    res.status(401).json({ success: false, message: "Invalid username or password." })
                }

            }

        );
    }
});

router.get('/admin', (req, res) => {

    console.log('admin route');
});

router.get('/admin/staff', (req, res) => {
    //get all Staff.
    req.db.collection('staff').find({ email: { $ne: 'admin@admin.com' } }).toArray(function (error, result) {
        if (error) return res.status(500).json(error);
        return res.status(200).json(result);
    });

});

router.post('/admin/staff/:staff', (req, res) => {
    //add Staff
    var passwordGenerated = randStr.generate(8);
    req.body.password = passwordGenerated;
    req.db.collection('staff').insertOne(req.body, (error, result) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json({ success: true });
    })
});

router.delete('/admin/staff/:id', (req, res) => {
    // Delete Staff
    req.db.collection('staff').deleteOne({ _id: ObjectID(req.params.id) },
        (error, result) => {
            if (error) return res.status(500).json(error);
            // console.log("updated");
            return res.status(200).json({ success: true });
        })
});

router.patch('/admin/staff/:id', (req, res) => {
    // update staff status
    req.db.collection('staff').updateOne({ _id: ObjectID(req.params.id) },
        { '$set': { status: req.body.status } },
        (error, result) => {
            if (error) return res.status(500).json(error);
            // console.log("updated");
            return res.status(200).json({ success: true });
        })
});

router.get('/admin/questions', (req, res) => {
    //get all questions.
    req.db.collection('questions').find().toArray(function (error, result) {
        if (error) return res.status(500).json(error);
        return res.status(200).json(result);
    });

});

router.post('/admin/questions/:question', (req, res) => {
    //add question
    //console.log("posting");
    req.db.collection('questions').insertOne(req.body, (error, result) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json({ success: true });
    })
});

router.delete('/admin/questions/:id', (req, res) => {
    // Delete question
    req.db.collection('questions').deleteOne({ _id: ObjectID(req.params.id) },
        (error, result) => {
            if (error) return res.status(500).json(error);
            // console.log("updated");
            return res.status(200).json({ success: true });
        })
});

router.patch('/admin/questions/:id', (req, res) => {
    // update question status
    req.db.collection('questions').updateOne({ _id: ObjectID(req.params.id) },
        { '$set': { status: req.body.status } },
        (error, result) => {
            if (error) return res.status(500).json(error);
            // console.log("updated");
            return res.status(200).json({ success: true });
        })
});

router.get('/admin/results', (req, res) => {
    //console.log('admin route');
    //return list of students with status
});


router.get('/admin/snapshots', (req, res) => {
    console.log('admin route');
});

router.patch('/admin/snapshots/:studentid', (req, res) => {
    console.log('admin route');
});

router.get('/staff/students', (req, res) => {
    //get all students.
    req.db.collection('students').find().toArray(function (error, result) {
        if (error) return res.status(500).json(error);
        //console.log(result);
        return res.status(200).json(result);
    });
});

router.post('/staff/invitation/:student', async (req, res) => {
    //send Invitation
    //Generate exam token for student.
    try {
        var tokenGenerated = randStr.generate(21);
        req.body.exam_token = tokenGenerated;
        var today = new Date();
        var newdate = new Date();
        newdate.setDate(today.getDate() + 2);
        req.body.exam_token_expiry = newdate;
        req.body.status = "sent";
        //Get 3 random questions and set against student.
        const questions = req.db.collection('questions').aggregate([{ $sample: { size: 3 } }, { $match: { status: true } }]);
        const answer = [];
        var questionObject = [];
        let obj;

        await questions.forEach(q => {

            obj = Object.assign({}, { question: q.question, answer: answer, result: '' });
            questionObject.push(obj);
        });

        req.body.exam = Object.assign({}, { result: '', questions: questionObject });

        req.db.collection('students').updateOne({ email: req.body.email },
            {
                '$set': {
                    exam_token: req.body.exam_token,
                    exam_token_expiry: req.body.exam_token_expiry,
                    status: req.body.status,
                    exam: req.body.exam
                }
            },
            (error, result) => {
                if (error) return res.status(500).json(error);
                return res.status(200).json({ success: true });
            });
        //send email to with generated token
        const body = `<a href='http://localhost:4200/exam/${req.body.exam_token}'>Click to start Exam.</a>`
        sendEmail(req.body.email,"Welcome Student!",body);
    }
    catch (error) {
        console.log(error);
    }

});


router.get('/student/exam/:token', (req, res) => {
    console.log('start exam');
    let exam = req.db.collection('exams').find({ token: req.params.token, status: 'sent' }).then(exam => {
        return resp.status(200).json({
            code: 1,
            data: exam
        });
    }).catch(err => {
        return resp.status(200).json({
            code: 0,
            data: null
        });
    });
});

router.post('/student/exam/snapshot/:token', (req, res) => {
    console.log('save snapshot against token');
});

async function sendEmail(email, message, messageHTML = '') {
    const nodemailer = require("nodemailer");
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        //Define the message
        let emailData = {
            from: "Student Screening",
            to: email,
            subject:"Exam link",
            text: message,
            html: messageHTML
        };

        //send E-Mail
        await transporter.sendMail(emailData, (error, result) => {
            if (error) console.log(error);
            //if (result) console.log(result);
        });
    }
    catch (error) {
        console.log(error);
    }

}



module.exports = router;