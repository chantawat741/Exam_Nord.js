let express = require('express');
let router = express.Router();
let dbCon = require('../lib/db');

//display work page
router.get('/', (req, res, next) =>{
    dbCon.query('SELECT * FROM works ORDER BY ID asc',(err , rows) => {
        if(err) {
            req.flash('error',err);
            res.render('works',{ data: '' });
        } else {
            res.render('works',{ data: rows });
        }
    })
})

//display add work page
router.get('/add', (req, res, next) => {
    res.render('works/add',{
        NameWorkPerformed: '',
        ActionStartTime: '',
        FinishedTime: '',
        Status: '',
        RecordDate: '',
        ModifyDate: ''
    })
})

// add a new work
router.post('/add', (req, res, next) => {
    let NameWorkPerformed = req.body.NameWorkPerformed;
    let ActionStartTime = req.body.ActionStartTime;
    let FinishedTime = req.body.FinishedTime;
    let Status = req.body.Status;
    let RecordDate = req.body.RecordDate;
    let ModifyDate = req.body.ModifyDate;
    let error = false;

    if (NameWorkPerformed.length === 0 || author.length === 0) {
        error.true;
        //set flash message
        req.flash('error', 'Please enter NameWorkPerformed, ActionStartTime, FinishedTime, Status, RecordDate ');
        // render to add.ejs with flash message
        req.render('works/add', {
            NameWorkPerformed: NameWorkPerformed,
            ActionStartTime: ActionStartTime,
            FinishedTime: FinishedTime,
            Status: Status,
            RecordDate: RecordDate,
            ModifyDate: ''
        })
    }

    //if no error
    if (!error){
        let from_data = {
            NameWorkPerformed: NameWorkPerformed,
            ActionStartTime: ActionStartTime,
            FinishedTime: FinishedTime,
            Status: Status,
            RecordDate: RecordDate,
            ModifyDate: ''
        }
        
        //insert query
        dbCon.query('INSERT INTO works SET ?',from_data, (err, result) => {
            if (err){
                req.flash('error',err)

                res.render('works/add', {
                    NameWorkPerformed: from_data.NameWorkPerformed,
                    ActionStartTime: from_data.ActionStartTime,
                    FinishedTime: from_data.FinishedTime,
                    Status: from_data.Status,
                    RecordDate: from_data.RecordDate,
                    ModifyDate: ''
                })
            }else{
                req.flash('success', 'Work successfully added');
                res.redirect('/works');
            }
        })
    }
})

//display Edit work page
router.get('/edit/(:id)', (req, res, next) => {
    let id = req.params.id;

    dbCon.query("SELECT * FROM works WHERE id = " + id , (err, rows ,fields) => {
        if (rows.length <= 0) {
            req.flash('error' ,'Work not found with id =' + id)
            res.redirect('/works');
        }else{
            res.render('works/edit', {
                title: 'Edit Work',
                id: rows[0].id,
                NameWorkPerformed: rows[0].NameWorkPerformed,
                ActionStartTime: rows[0].ActionStartTime,
                FinishedTime: rows[0].FinishedTime,
                Status: rows[0].Status,
                RecordDate: rows[0].RecordDate,
                ModifyDate: rows[0].RecordDate
            })
        }
    });
})

// update work page
router.post('/update/:id', (req, res, next) => {
    let id = req.params.id;
    let NameWorkPerformed = req.body.NameWorkPerformed;
    let ActionStartTime = req.body.ActionStartTime;
    let FinishedTime = req.body.FinishedTime;
    let Status = req.body.Status;
    let ModifyDate = req.body.ModifyDate;
    let error = false;

    if (NameWorkPerformed.length === 0 || author.length === 0) {
        error.true;
        req.flash('error', 'Please enter NameWorkPerformed, ActionStartTime, FinishedTime, Status, RecordDate ');
        req.render('works/edit', {
            id: req.params.id,
            NameWorkPerformed: NameWorkPerformed,
            ActionStartTime: ActionStartTime,
            FinishedTime: FinishedTime,
            Status: Status,
            ModifyDate: ModifyDate
        })
    }

    //if no error
    if (!error){
        let from_data = {
            NameWorkPerformed: NameWorkPerformed,
            ActionStartTime: ActionStartTime,
            FinishedTime: FinishedTime,
            Status: Status,
            ModifyDate: ModifyDate
        }
        
        //update query
        dbCon.query("UPDATE works SET ? WHERE id =" + id, from_data, (err, result) => {
            if (err){
                req.flash('error',err)
                res.render('works/edit', {
                    id: req.params.id,
                    NameWorkPerformed: from_data.NameWorkPerformed,
                    ActionStartTime: from_data.ActionStartTime,
                    FinishedTime: from_data.FinishedTime,
                    Status: from_data.Status,
                    ModifyDate: from_data.ModifyDate
                })
            }else{
                req.flash('success', 'Work successfully Update');
                res.redirect('/works');
            }
        })
    }
})

// delect work 
router.get('/delete/(:id)', (req, res, next) => {
    let id = req.params.id;

    dbCon.query("DELETE FROM works WHERE id =" + id ,(err, result) => {
        if (err){
            req.flash('error',err)
            res.redirect('/works');
        }else{
            req.flash('success', 'Work successfully deleted! ID = ' + id);
            res.redirect('/works');
        }
    })
})

module.exports = router;
