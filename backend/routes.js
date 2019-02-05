const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
//Define Routes:
router.post('/', (req, res) => {
    //console.log('login route');
    //reroute...
});

router.get('/admin', (req, res) => {
    console.log('admin route');
});

router.post('/admin/addstaff', (req, res) => {
    console.log('admin route');
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
    req.db.collection('questions').insert(req.body,(error,result) =>{
        if(error) return res.status(500).json(error);
        return res.status(200).json({success: true});
    })
});

router.patch('/admin/questions/:id', (req, res) => {
    // update question status
    req.db.collection('questions').updateOne({_id:ObjectID(req.params.id)},
        {'$set':{status:"Inactive"}},
        (error,result) =>{
        if(error) return res.status(500).json(error);
        console.log("updated");
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
    console.log('list of students with status');
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