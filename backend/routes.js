const express = requre('express');
const route = express.route();

//Define Routes:
route.post('/', (req, res) => {
    //console.log('login route');
    //reroute...
});

route.get('/admin', (req, res) => {
    console.log('admin route');
});

route.post('/admin/addstaff', (req, res) => {
    console.log('admin route');
});

route.put('/admin/staff/:id', (req, res) => {
    console.log('admin route');
});

route.post('/admin/addquestion', (req, res) => {
    console.log('admin route');
});

route.put('/admin/question/:id', (req, res) => {
    console.log('admin route');
});

route.get('/admin/results', (req, res) => {
    //console.log('admin route');
    //return list of students with status
});

route.get('/admin/snapshots', (req, res) => {
    console.log('admin route');
});

route.put('/admin/snapshots/:studentid', (req, res) => {
    console.log('admin route');
});