const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
var randStr = require('randomstring');
const jwt = require('jsonwebtoken')

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
                console.log(result);

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

router.post('/admin/staff/add', (req, res) => {
    console.log('add staff '+req.body);
    console.log(req.body.name +" "+req.body['name']);
    // res.json(req);
     if(req.body.name && req.body.email) {

        var passwordGenerated = randStr.generate(8);
        console.log('password '+passwordGenerated);
        req.db.collection("staff").insertOne({role:'staff', name: req.body.name, email:req.body.email, password: passwordGenerated}, (err, result)=> {
            if(err){
                console.log("staff added error "+ err);
                res.status(500).json({success: false, message:"There is error occured during insertion"});
                res.end();
            } else {
                console.log("staff added "+ result);
                  res.status(200).json({success: true, message:"Staff added successfully"});
                  res.end();
            }
        });
    }
});


router.put('/admin/staff/change_status/:id/:isActive', (req, res) => {
    console.log('admin route change status '+req.params.id+", "+req.params.isActive);

    if(req.params.id) {
        
        req.db.collection('staff').updateOne({ _id: ObjectID(req.params.id), role:{ $ne:"admin"}},
        // {'$set':{status :req.params.isActive}},
        {$set: {status: req.params.isActive }},
          (err, result) => {
            console.log("staff update "+ result);
             if(err){
                res.status(500).json({success: false, message:"There is an error on updating."})
             }else {
                 res.status(200).json({success: true, message:"Update successfull"})
            }
            

         });
    } 

});


router.patch('/admin/staff/:id', (req, res) => {

    console.log('admin route');
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
    req.db.collection('questions').insert(req.body,(error,result) =>{
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

router.get('/staff', (req, res) => {
    console.log('list of staff with status');

    req.db.collection('staff').find({role: { $ne:"admin"}}).project({_id:1, name:1, status:1}).toArray(function(error, result){

        if(error){
            console.log(error);
             return res.status(500).json(error);
        }
        else {
            let data = {status: 'success', 'data': result};
            return res.status(200).json(data);
        } 
    });
});

router.patch('/staff/invitation/:id', (req, res) => {
    console.log('invitation sent to student.');
});

router.get('/student/exam/:token', (req, res) => {
    console.log('start exam');
});

router.post('/student/exam/snapshot/:token', (req, res) => {
    console.log('save snapshot against token');
});

module.exports = router;