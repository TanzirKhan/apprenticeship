const CHECKTIME = 7;
const TIMEMULTIPLIER = 1000;

//instantiates aircraft objects
let DC35 = new Planes('DC35', 16, 23);
let AB300 = new Planes('AB300', 37, 22);
let AB330 = new Planes('AB330', 16, 22);
let LH456 = new Planes('LH456', 16, 22);

//instantiates runway objects
let runway1 = new Runways(true, 'runway1', 'r1');
let runway2 = new Runways(true, 'runway2', 'r2');
let runway3 = new Runways(true, 'runway3', 'r3');
let runway4 = new Runways(true, 'runway4', 'r4');
let runway5 = new Runways(true, 'runway5', 'r5');

//instantiates HTML elements
const SELECTION = document.getElementById('selection');
const LANDING = document.getElementById('landing');
const TAKEOFF = document.getElementById('takeOff');
//const PROGRESS = document.getElementsByClassName('ticking');


//all plane objects
let planes = [DC35, AB300, AB330, LH456];

//all runway objects
let runways = [runway1, runway2, runway3, runway4, runway5];


//sets initial color of runways to green
function checkAvailable(){
    for(let i = 0; i < runways.length; i++){
        runways[i].changeColor();
    }
}

//checkAvailable();

/*for(let i = 0; i < PROGRESS.length; i++){
    PROGRESS[i].style.backgroundColor = "red";
}*/
//onlick function that will append a plane to a runway and pass values into the runway
function addPlanes(state){
    let plane;
    let width = 100;
    switch(parseInt(SELECTION.value)){
        case 1:
            plane = DC35;
            break;
        case 2:
            plane = AB300;
            break;
        case 3:
            plane = AB330;
            break;
        case 4:
            plane = LH456;
            break;
    }
    
    for(let i = 0; i < runways.length; i++){
       if(runways[i].available == true){
            runways[i].available = false;
            if(state == 'landing'){
                fly(i, plane.landingTime);
            }
            else if(state == 'takeOff'){
                fly(i, plane.takeOffTime);
            }
            break;
        }
    }
    
    //represents the time taken using the progress bars
    function fly(i, time){
        let width = 100;
        let chunk = 1.25/time;
        let tick = setInterval(function(){
            progressBar(i);
        },10);
        function progressBar(i){
            if(width <= 0){
                runways[i].available = true;
                clearInterval(tick);
            }
            else{
                width -= chunk;
                runways[i].progress.style.width = width + "%";
            }        
        }
    }

    
}

LANDING.addEventListener("click", function(){
    let time = new Date();
    if(time.getHours() < 22 && time.getHours() > 7){
        addPlanes('landing');
    }
    else{
        alert("OUTSIDE WORKING HOURS, GET OUT");
    }
})

TAKEOFF.addEventListener("click", function(){
    let time = new Date();
    if(time.getHours() < 22 && time.getHours() > 7){
        addPlanes('takeOff');
    }
    else{
        alert("OUTSIDE WORKING HOURS, GET OUT");
    }
})
