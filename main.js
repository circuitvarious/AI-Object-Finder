img = "";
status = "";
objects = [];

function setup(){
    canvas = createCanvas(600, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 420);
    video.hide();
    
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects"; 
    objects_name = document.getElementById("object_name").value;
}

function preload(){}

function draw() {
    image(video, 0, 0, 600, 420);
  
       if(status != "")
        {
            
            r = random(255);
            g = random(255);
            b = random(255);

            objectDetector.detect(video, gotResults);

          for (i = 0; i < objects.length; i++) {
            
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == objects_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_status").innerHTML = objects_name+ " found";
                synth = window.speechSynthesis; 
                utterThis = new SpeechSynthesisUtterance(objects_name + "Found"); 
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_status").innerHTML = objects_name+ " not found";
            }

          }
        }

}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
  


