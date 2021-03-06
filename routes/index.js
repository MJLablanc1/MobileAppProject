var express = require('express');
var router = express.Router();



let Servertracker = [];
let ServerToDo = [];

let Activity = function (pactivity, pdate, ptime) {
  this.activity = pactivity;
  this.date = pdate;
  this.time = ptime;
  console.log("made an activity");
}

Servertracker.push(new Activity("Guitar (temp)","5/15/20","3:00" ));
Servertracker.push(new Activity("Coding (temp)","8/15/20","1:00" ));
Servertracker.push(new Activity("Movie (temp)","2/15/20","4:00" ));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getToDo', function(req, res) {
  res.status(200).json(ServerToDo);
});

router.get('/getTracker', function(req, res) {
  res.status(200).json(Servertracker);
});


router.post('/AddTracker', function(req, res) {
  const newActivity = req.body;
  Servertracker.push(newActivity);
  res.sendStatus(200);
});


router.post('/AddToDo', function(req, res) {
  const newActivity = req.body;
  ServerToDo.push(newActivity);
  res.sendStatus(200);
});

router.delete('/DeleteAct/:parm', (req, res) => {
  const delparm = req.params.parm;
  let found = false;
  console.log("delparm in server is: " + delparm)

  for(var i = 0; i < Servertracker.length; i++) // find the match
  {
    console.log("in for loop i is "+ i )
      if(i == delparm){
        console.log("in if")
        Servertracker.splice(i,1);  // remove object from array
          found = true;
      }
  }

  if (!found) {
    console.log("not found");
    return res.status(500).json({
      status: "error"
    });
  } else {
  res.send('Movie with ID: ' + delID + ' deleted!');
  }
});

router.delete('/DeletetoDo/:parm', (req, res) => {
  const delparm = req.params.parm;
  let found = false;
  console.log("delparm in server is: " + delparm)

  for(var i = 0; i < ServerToDo.length; i++) // find the match
  {
    console.log("in for loop i is "+ i )
      if(i == delparm){
        console.log("in if")
        ServerToDo.splice(i,1);  // remove object from array
          found = true;
      }
  }

  if (!found) {
    console.log("not found");
    return res.status(500).json({
      status: "error"
    });
  } else {
  res.send('Movie with ID: ' + delID + ' deleted!');
  }
});


module.exports = router;
