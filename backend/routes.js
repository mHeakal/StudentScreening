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
                console.log("Result of findone"+result);

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
                                res.status(200).json({ success: true, message: "Login successfull", token: jwtToken+'', name: result.name+'', email: result.email+'', role: result.role+'' })
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

// router.post('/admin/staff/add', (req, res) => {
//     console.log('add staff '+req.body);
//     console.log(req.body.name +" "+req.body['name']);
//     // res.json(req);
//      if(req.body.name && req.body.email) {

//         var passwordGenerated = randStr.generate(8);
//         console.log('password '+passwordGenerated);
//         req.db.collection("staff").insertOne({role:'staff', name: req.body.name, email:req.body.email, password: passwordGenerated}, (err, result)=> {
//             if(err){
//                 console.log("staff added error "+ err);
//                 res.status(500).json({success: false, message:"There is error occured during insertion"});
//                 res.end();
//             } else {
//                 console.log("staff added "+ result);
//                   res.status(200).json({success: true, message:"Staff added successfully"});
//                   res.end();
//             }
//         });
//     }
// });


// router.put('/admin/staff/change_status/:id/:isActive', (req, res) => {
//     console.log('admin route change status '+req.params.id+", "+req.params.isActive);

//     if(req.params.id) {
        
//         req.db.collection('staff').updateOne({ _id: ObjectID(req.params.id), role:{ $ne:"admin"}},
//         // {'$set':{status :req.params.isActive}},
//         {$set: {status: req.params.isActive }},
//           (err, result) => {
//             console.log("staff update "+ result);
//              if(err){
//                 res.status(500).json({success: false, message:"There is an error on updating."})
//              }else {
//                  res.status(200).json({success: true, message:"Update successfull"})
//             }
            

//          });
//     } 

// });


// router.patch('/admin/staff/:id', (req, res) => {

//     console.log('admin route');
// });

router.get('/admin/staff', (req, res) => {
    //get all Staff.
    req.db.collection('staff').find({email:{$ne:'admin@admin.com'}}).toArray(function(error, result){
        if(error) return res.status(500).json(error);
        return res.status(200).json(result);
    });
    
});

router.post('/admin/staff/:staff', (req, res) => {
    //add Staff
    var passwordGenerated = randStr.generate(8);
    req.body.password = passwordGenerated;
    req.db.collection('staff').insertOne(req.body,(error,result) =>{
        if(error) return res.status(500).json(error);
        return res.status(200).json({success: true});
    })
});

router.delete('/admin/staff/:id', (req, res) => {
    // Delete Staff
    req.db.collection('staff').deleteOne({_id:ObjectID(req.params.id)},
        (error,result) =>{
        if(error) return res.status(500).json(error);
        // console.log("updated");
        return res.status(200).json({success: true});
    })
});

router.patch('/admin/staff/:id', (req, res) => {
    // update staff status
    req.db.collection('staff').updateOne({_id:ObjectID(req.params.id)},
        {'$set':{status:req.body.status}},
        (error,result) =>{
        if(error) return res.status(500).json(error);
        // console.log("updated");
        return res.status(200).json({success: true});
    })
});
 
router.get('/admin/questions', (req, res) => {
    //get all questions.
    req.db.collection('questions').find().toArray(function(error, result){
        if(error) return res.status(500).json(error);
        return res.status(200).json(result);
    });
    
});

router.post('/admin/questions/:question', (req, res) => {
    //add question
    //console.log("posting");
    req.db.collection('questions').insertOne(req.body,(error,result) =>{
        if(error) return res.status(500).json(error);
        return res.status(200).json({success: true});
    })
});

router.delete('/admin/questions/:id', (req, res) => {
    // Delete question
    req.db.collection('questions').deleteOne({_id:ObjectID(req.params.id)},
        (error,result) =>{
        if(error) return res.status(500).json(error);
        // console.log("updated");
        return res.status(200).json({success: true});
    })
});

router.patch('/admin/questions/:id', (req, res) => {
    // update question status
    req.db.collection('questions').updateOne({_id:ObjectID(req.params.id)},
        {'$set':{status:req.body.status}},
        (error,result) =>{
        if(error) return res.status(500).json(error);
        // console.log("updated");
        return res.status(200).json({success: true});
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

// router.get('/staff', (req, res) => {
//     console.log('list of staff with status');

//     req.db.collection('staff').find({role: { $ne:"admin"}}).project({_id:1, name:1, status:1}).toArray(function(error, result){

//         if(error){
//             console.log(error);
//              return res.status(500).json(error);
//         }
//         else {
//             let data = {status: 'success', 'data': result};
//             return res.status(200).json(data);
//         } 
//     });
// });

router.patch('/staff/invitation/:id', (req, res) => {
    console.log('invitation sent to student.');
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

//Exam relavent code....
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

const { getStudentByEmails } = require('./services/student');

    router.post('/staff/exam/sendinvitation',async (req, resp) => {
        const student = req.body;
        const questionCount = req.db.collection('questions').find({ status: true }).count().exec();   //inside question service we will create
        //const randomQuestions = await getRandomQuestions(3, questionCount);
        const students = await getStudentByEmails(data.emails);     //inside student service we will create
        const random = Math.floor(Math.random() * questionCount);
        randomQuestions = req.db.collection('questions').find({status:true},{_id:0,status:0}).skip(random).limit(3)
        // const questions = [];
        // randomQuestions.forEach(q => {
        //     questions.push({
        //         question: q.question,
        //         answers: []
        //     })
        // });
        data.emails.forEach(email => {
            const payload = {
                email,
                timestamp: new Date().getTime()
            }
            
            let exam = {
                studentEmail: email,
                randomQuestions,
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


module.exports = router;