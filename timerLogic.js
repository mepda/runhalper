let week_one_time = [5*60, 1*60 + 1, 1.5*60 +1, 1*60 + 1, 1.5*60 +1,1*60 + 1, 1.5*60 +1, 1*60 + 1, 1.5*60 +1,1*60 + 1, 1.5*60 +1, 1*60 + 1, 1.5*60 +1,1*60 + 1, 1.5*60 +1, 1*60 + 1, 1.5*60 +1]
let walk = true;
let totalTime = week_one_time.reduce((acc, num)=> {return acc + num});
currentSegment = 0
segmentTime = week_one_time[currentSegment]
let segminutes;
let segseconds;

function decrementTime(){
    //display then reduce segment time / total time by one
    document.getElementById('walkOrRun').innerHTML = `${walk?'Walking':'Running'}`
   
    document.getElementById('walkOrRunGif').src =`${walk?'walking.gif':'running.gif'}`
    document.getElementById('walkOrRunGif').style.borderRadius = "15px";
    document.getElementById('walkOrRunGif').style.width = "200px";
    document.getElementById('walkOrRunGif').style.margin = "0 auto";
    segminutes = Math.floor(segmentTime/60)
    segseconds = Math.floor(segmentTime-segminutes*60)
    totminutes = Math.floor(totalTime/60);
    totseconds = Math.floor(totalTime - totminutes*60)
    document.getElementById('walkOrRunSegmentTime').innerHTML = `Interval Time Remaining: ${segminutes.toString().padStart(2,0)}:${segseconds.toString().padStart(2,0)}`;
    document.getElementById('totalTime').innerHTML = `Time remaining: ${totminutes.toString().padStart(2,0)}:${totseconds.toString().padStart(2,0)}`;
    document.getElementById("walkOrRun").classList.remove("flash");
    totalTime--
    segmentTime--
    
    if(segmentTime == 0){
        //toggle between walking and running
        walk? walk=false: walk=true;
        
        //move onto the next segment time in the array
        currentSegment++
        segmentTime = week_one_time[currentSegment]
        //grab the circle and change it's class to show a filled in circle
        setTimeout(function(){
            let completionIcon = document.getElementById("completionCircles").getElementsByTagName('i');
            completionIcon[currentSegment-1].classList.remove('fa-circle-o');
            completionIcon[currentSegment-1].classList.add('fa-circle')
            document.getElementById("walkOrRun").classList.add("flash");
        }, 1000)
        
    }

    if(totalTime == 0){
        setTimeout(function(){
            document.getElementById('walkOrRunSegmentTime').innerHTML = `Finished!`;
            document.getElementById('totalTime').innerHTML = `Training complete!`;
            clearInterval(timer)
        }, 1000)
    }
}
paused = true;
var timer;

function start(){
    timer = setInterval(decrementTime, 1000);
    document.getElementById("startStop").innerText = "Pause"
    paused=!paused;
}

function stop(){
    clearInterval(timer)
    document.getElementById("startStop").innerText = "Start"
    paused=!paused;
}


function startStop(){
    paused?start():stop();
}

let circles = document.getElementById('completionCircles')
for(let i = 0; i < week_one_time.length; i++){
    let newCircle = document.createElement('i');
    newCircle.classList.add('fa');
    newCircle.classList.add('fa-circle-o')
    circles.append(newCircle);
}
 