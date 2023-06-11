var express = require('express');
var router = express.Router();
var UsersModel = require('../model/users');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/display');
});

router.get('/add', function (req, res, next) {
  res.render('add-form');
});
router.post('/add', function (req, res, next) {
  var a = req.body.txt1;
  var b = req.body.txt2;
  var mydata = {
    user_name: a,
    user_mobile: b
  }
  var result = UsersModel(mydata);

  result.save();
  res.redirect('/display');

});

router.get('/display', function (req, res, next) {
  UsersModel.find().then(function (mydata) {
    console.log(mydata);
    res.render('display', { userdata: mydata })
  })
});

router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  UsersModel.findByIdAndRemove(id).then(function (err, mydata) {
    res.redirect('/display');
  });

});

router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  UsersModel.findById(id).then(function (mydata) {
    console.log(mydata);
    res.render('edit-form', { userdata: mydata });
  });

});

router.post('/update/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  var mydata = {
    user_name: req.body.txt1,
    user_mobile: req.body.txt2
  }
  UsersModel.findByIdAndUpdate(id, mydata).then(function (result) {
    res.redirect('/display');
  });

});


router.get('/display-api', function (req, res, next) {
  UsersModel.find().then(function (mydata) {
    console.log(mydata);
    // res.send(JSON.stringify(mydata));
    res.send(JSON.stringify({ 'flag': 1, 'message': 'Record Found', 'studentdata': mydata }));
  })
});

router.get('/display-details-api/:id', function (req, res, next) {
  var id = req.params.id;
  UsersModel.findById(id).then(function (mydata) {
    console.log(mydata);
    // res.send(JSON.stringify(mydata));
    res.send(JSON.stringify({ 'flag': 1, 'message': 'Record Found', 'studentdata': mydata }));
  })
});

router.post('/add-api', function (req, res, next) {
  var a = req.body.txt1;
  var b = req.body.txt2;
  var mydata = {
    user_name: a,
    user_mobile: b
  }
  console.log("My Body Data is " + req.body.txt1);
  var result = UsersModel(mydata);

  result.save();
  res.send(JSON.stringify({ 'flag': 1, 'message': 'Record Added' }));

});

router.delete('/delete-api/', function (req, res, next) {
  var id = req.body.id;
  UsersModel.findByIdAndRemove(id).then(function (mydata) {
    console.log(mydata);
    // res.send(JSON.stringify(mydata));
    res.send(JSON.stringify({ 'flag': 1, 'message': 'Record Delete' }));
  })
});


router.put('/update-api/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  var mydata = {
    user_name: req.body.txt1,
    user_mobile: req.body.txt2
  }
  UsersModel.findByIdAndUpdate(id, mydata).then(function (result) {
    res.send(JSON.stringify({ 'flag': 1, 'message': 'Record Updated' }));
  });

});
module.exports = router;
