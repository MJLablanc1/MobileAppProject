var express = require('express');
var router = express.Router();



let Servertracker = [];
let ServerToDO = [];

let Activity = function (pactivity, pdate, ptime) {
  this.activity = pactivity;
  this.date = pdate;
  this.time = ptime;
  console.log("made an activity");
}

// save typing time, make up 3 for testing
Servertracker.push(new Activity("Guitar (temp)","5/15/20","3:00" ));
Servertracker.push(new Activity("Coding (temp)","5/15/20","1:00" ));
Servertracker.push(new Activity("Movie (temp)","5/15/20","4:00" ));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getToDo', function(req, res) {
  res.status(200).json(ServerToDo);
});

router.get('/getTracker', function(req, res) {
  res.status(200).json(Servertracker);
});

/* Add one new note */
router.post('/AddTracker', function(req, res) {
  console.log("in new tracker");
  console.log(req.body);
  const newActivity = req.body;
  console.log(newActivity)
  Servertacker.push(newActivity);
  res.status(200).json(newActivity);
  console.log("leaving new tracker");
});

/* Add one new note */
router.post('/AddToDo', function(req, res) {
  const newActivity = req.body;
  ServerToDo.push(newActivity);
  res.status(200).json(newActivity);
});


module.exports = router;
