
 //global objects
 let tracker = [];
 let toDo = [];
 let dataArr = [{t:0,y:1}];
 let labelsArr = [];

 let tactivity, sactivity, sh, sm;

// Now comes the code that must wait to run until the document is fully loaded
document.addEventListener("DOMContentLoaded", function (event) {

    // Button grab
    let tsubmit = document.getElementById("tsubmitbtn");
    let ssubmit = document.getElementById("ssubmitbtn");
    let disTab = document.getElementById("disTab");
    let schTab = document.getElementById("schTab");

    // Main Activity constructor
    let Activity = function (pactivity, pdate, ptime) {
        this.activity = pactivity;
        this.date = pdate;
        this.time = ptime;
        console.log("made an activity");

    }

    // Page functions
    $(document).on("pagebeforeshow","#Homepage",function(){
        updates()
      });

    $(document).on("pagebeforeshow","#Timer",function(){
        console.log("before Timer show")
        $("#tactivity").val("");
    });

    $(document).on("pagebeforeshow","#Schedule",function(){
        console.log("before Schedule show")
        $("#sactivity").val("");
        $("#datepicker").val("");
        $("#sh").val("");
        $("#sm").val("");
        updateSchTable();
    });
    
    // Schedule submit function
    ssubmit.addEventListener('click', function (){
        sactivity = $("#sactivity").val();
        let hours = $("#sh").val();
        let minutes = $("#sm").val();
        let date = $("#datepicker").val();
        let tDate = $("#datepicker").datepicker('getDate');
        
        if(sactivity === "" || date === ""){
            alert("please pick a date and activity")
        }
        else{
        hours = prependZero(Math.floor((hours < 10) ? ("0" + hours) : hours) , 2);
        minutes = prependZero(Math.floor((minutes < 10) ? ("0" + minutes) : minutes), 2);
        let time = hours + ":" + minutes;

        console.log(sactivity+", "+ date +", "+ time);
        let now = new Date();
        if(tDate > now){
            updatetoDo(sactivity,date,time)
        }
        if(tDate < now){
        updateTracker(sactivity,date,time);
        }
        $("#sactivity").val("");
        $("#datepicker").val("");
        $("#sh").val("");
        $("#sm").val("");
        }
    });    

    // datapicker function
    $( function() {
        $("#datepicker").datepicker();
      } );

      // Stopwatch function
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

        //nested page transition for stopwatch reset
        $(document).on("pagebeforeshow","#Timer",function(){
            reset();
        });


        reset();
        if(running) run();

        //timer sumbit function
        tsubmit.addEventListener('click', function (){
            let go = true; // error catcher
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
    
    // The Graoh!!
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'hours spent',
                data: [{x:1,y:0},{x:4,y:2},{x:8,y:3},{x:2,y:4}],
                backgroundColor: ['rgba(00,00,200,0.2)'],
                borderColor: [],
                borderWidth: 1
                        }]
            },
        options: {
            tooltips:{ 
                enabled: false
                     },
            legend: {display: false},
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                            }
                        }],
                        
                xAxes: [{
                    display: false,
                    type:'time',
                        }]
                    }        
                }
                            });
    
    // Places Zeros in time value                      
    function prependZero(time, length) {
           
        time = '' + (time | 0);
       
        while (time.length < length) time = '0' + time;
        return time;
    }  

    // updates table and chart
    function updates(){
        console.log("before home show");
        $.get("/getTracker",function(Serverlist, status){
            tracker = Serverlist;
            tracker.sort((a, b) => b.date - a.date);
        console.log(tracker);     
        updateTable();
        updateChart();
    });
    }

    //Update table functions
    function updateSchTable() {
        console.log("in get tracker");
        $.get("/getToDo",function(Serverlist, status){
            toDo = Serverlist;
       
        schTab.innerHTML = "";
        toDo.forEach(item => { 
        schTab.innerHTML += "<tr> <td>" + item.date + "</td> <td>" + item.activity + "</td> <td>" + item.time + "</td> </tr>";
    })
    });
    console.log("inside sch table update");
    }    
    

    function updateTable() {
       console.log("inside table update")
        disTab.innerHTML = "";
        tracker.forEach(item => { 
        disTab.innerHTML += "<tr> <td>" + item.date + "</td> <td>" + item.activity + "</td> <td>" + item.time + "</td> </tr>";
                                });
                            }
                            
    function updateChart(){
        console.log("in update chart");
        chart.data.datasets[0].data.pop();
        dataArr = [];
        labelsArr = []; 

        tracker.forEach(item => {
            date = item.date.replace(/\//g,"-");
            date = moment(date, "mm-dd-yyyy")
            time =item.time.split(":");
            let datum = {t:date , y: time[0]};
            dataArr.push(datum);
            labelsArr.push(date);
                                });

        console.log("after for each")        
        dataArr.sort((a, b) => a.t - b.t);
        console.log(dataArr);
        chart.data.datasets[0].data = dataArr;
        console.log(labelsArr);
     // chart.data.labels = labelsArr;
        chart.update();
                            };


    //Update Lists functions
    function updateTracker (pactivity,pdate,ptime) {
        console.log("in updateTracker");
        if (pdate === null){
            pdate =  $.datepicker.formatDate('dd/mm/yy', new Date());
        }
        let newActivity = new Activity(pactivity,pdate,ptime);
        $.ajax({
            url : "/AddTracker",
            type: "POST",
            data: JSON.stringify(newActivity),
            contentType: "application/json; charset=utf-8",
            dataType   : "json",
            success: function (result) {
                console.log(result);
            }
        });
        updateTable ();        
    }
    
    function updatetoDo (pactivity,pdate,ptime) {  
        let newActivity = new Activity(pactivity,pdate,ptime)
        $.ajax({
            url : "/AddToDo",
            type: "POST",
            data: JSON.stringify(newActivity),
            contentType: "application/json; charset=utf-8",
            dataType   : "json",
            success: function (result) {
                console.log(result);
            }
        });
        updateSchTable();        
    }

    
});





