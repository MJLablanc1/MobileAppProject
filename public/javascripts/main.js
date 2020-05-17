

// Now comes the code that must wait to run until the document is fully loaded
document.addEventListener("DOMContentLoaded", function (event) {

    let Activity = function (pactivity, pdate, ptime) {
        this.activity = pactivity;
        this.date = pdate;
        this.time = ptime;
        console.log("made an activity");
    }

    let tracker = [];

    
    let A = new Activity("Guitar (temp)","5/15/20","3:00" );
    let B = new Activity("Coding (temp)","5/15/20","1:00" );
    let C = new Activity("Movie (temp)","5/15/20","4:00" );
    tracker.push(A);
    tracker.push(B);
    tracker.push(C);


    let tsubmit = document.getElementById("tsubmitbtn");
    let disTab = document.getElementById("disTab");
    let tactivity;

    $(document).on('pagebeforeshow', '#Home', updateTable());
    $('#timer').on('click',  function () {
        console.log("before Timer show")
        $("#tactivity").val("");
    }); 


    function updateTable() {
        disTab.innerHTML = "";
        tracker.forEach(item => { 
        disTab.innerHTML += "<tr> <td>" + item.date + "</td> <td>" + item.activity + "</td> <td>" + item.time + "</td> </tr>";
    });
    console.log("inside table update");
    }

    function updateTracker (pactivity,pdate,ptime) {
        console.log("in updateTracker");
        if (pdate === null){
            pdate =  $.datepicker.formatDate('dd/mm/yy', new Date());
        }
        let timerActivity = new Activity(pactivity,pdate,ptime)
        tracker.push(timerActivity);
        updateTable ();        
    }

    
        
     
   let stopwatch = $('.stopwatch').each(function () {

        var element = $(this);
        var running = element.data('autostart');
        var hoursElement = element.find('.hours');
        var minutesElement = element.find('.minutes');
        var secondsElement = element.find('.seconds');
        var millisecondsElement = element.find('.milliseconds');
        var toggleElement = element.find('.toggle');
        var resetElement = element.find('.reset');
        var pauseText = toggleElement.data('pausetext');
        var resumeText = toggleElement.data('resumetext');
        var startText = toggleElement.text();

        let timeElapsed;
        let prevHours;
        let prevMinutes;

        var hours, minutes, seconds, milliseconds, timer;

        function prependZero(time, length) {
           
            time = '' + (time | 0);
           
            while (time.length < length) time = '0' + time;
            return time;
        }

        function setStopwatch(hours, minutes, seconds, milliseconds) {
            
            hoursElement.text(prependZero(hours, 2));
            minutesElement.text(prependZero(minutes, 2));
            secondsElement.text(prependZero(seconds, 2));
            millisecondsElement.text(prependZero(milliseconds, 3));
        }

        function runTimer() {
             
            var startTime = Date.now();
                prevHours = hours;
                prevMinutes = minutes;
            var prevSeconds = seconds;
            var prevMilliseconds = milliseconds;

            timer = setInterval(function () {
                 timeElapsed = Date.now() - startTime;

                hours = (timeElapsed / 3600000) + prevHours;
                minutes = ((timeElapsed / 60000) + prevMinutes) % 60;
                seconds = ((timeElapsed / 1000) + prevSeconds) % 60;
                milliseconds = (timeElapsed + prevMilliseconds) % 1000;

                setStopwatch(hours, minutes, seconds, milliseconds);
            }, 25);
        }

        function run() {
            running = true;
            runTimer();
            toggleElement.text(pauseText);
        }

        function pause() {
            running = false;
            clearTimeout(timer);
            toggleElement.text(resumeText);
        }

        function reset() {
            running = false;
            pause();
            hours = minutes = seconds = milliseconds = 0;
            setStopwatch(hours, minutes, seconds, milliseconds);
            toggleElement.text(startText);
        }

        toggleElement.on('click', function () {
            (running) ? pause() : run();
        });

        resetElement.on('click', function () {
            reset();
        });

        $('#timer').on('click', function () { console.log("stopwatch clicked"); reset()});

        reset();
        if(running) run();

        tsubmit.addEventListener('click', function (){
            let go = true;
            tactivity = $("#tactivity").val();
            console.log("te: " + timeElapsed + ". pH: " + prevHours + ". pM: " +prevMinutes)
            let hours = (timeElapsed / 3600000) + prevHours;
            let minutes = ((timeElapsed / 60000) + prevMinutes) % 60;
            console.log(hours + ":" + minutes)

            console.log("activity added: " + tactivity);
            if (tactivity === "") {
               alert("Please enter activity");
               go = false;
            }
            if (running === true) {
                alert("pause the timer");
                go = false;
            }
            if (go) {
            console.log("submit pressed")
            
            hours = prependZero(Math.floor((hours < 10) ? ("0" + hours) : hours) , 2);
            minutes = prependZero(Math.floor((minutes < 10) ? ("0" + minutes) : minutes), 2);

            let time = hours + ":" + minutes;
            console.log("time passed: " + time)
            updateTracker(tactivity,null,time);
            $("#tactivity").val("");
            reset();
            }

            });
            
        });
        
    });





