const express = require('express');
const router = express.Router();

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

router.put('/admin/staff/:id', (req, res) => {
    console.log('admin route');
});

router.get('/admin/questions', (req, res) => {
    
    req.db.collection('questions').find().toArray(function(error, result){
        if(error) return res.status(500).json(error);
        return res.status(200).json(result);
    });
    
});

router.post('/admin/addquestion', (req, res) => {
    console.log('admin route');
});

router.put('/admin/question/:id', (req, res) => {
    console.log('admin route');
});

router.get('/admin/results', (req, res) => {
    //console.log('admin route');
    //return list of students with status
});

router.get('/admin/snapshots', (req, res) => {
    console.log('admin route');
});

router.put('/admin/snapshots/:studentid', (req, res) => {
    console.log('admin route');
});

router.get('/staff', (req, res) => {
    console.log('list of students with status');
});

router.put('/staff/invitation/:id', (req, res) => {
    console.log('invitation sent to student.');
});

router.get('/student/exam/:token', (req, res) => {
    console.log('start exam');
});

router.post('/student/exam/snapshot/:token', (req, res) => {
    console.log('save snapshot against token');
});

module.exports = router;