camera = document.querySelector("#camera");
let prediction1;
let emojiprediction1;
Webcam.set({
    width: 350,
    height: 300,
    Image_format: 'jpeg',
    jpg_quality: 100
});
Webcam.attach(camera);
function take_snapshot(){
    Webcam.snap(function(datauri){
        document.querySelector("#result").innerHTML = '<img src="'+datauri+'" id="imgres"></img>'
    })
}
let model = ml5.imageClassifier("https://storage.googleapis.com/tm-model/Bxn71f-i9/model.json", ModelLoaded);
function ModelLoaded(){
    console.log("Model is loaded!!!!!!!!");
}
function check(){
    let img = document.querySelector("#imgres");
    model.classify(img, gotresult);
}

function gotresult(error, result){
    if (error){
        console.log(error);
    } else {
        console.log(result);
    }
    prediction1 = result[0].label;
    if(prediction1 == "Amazing"){
        emojiprediction1 = "👌"
    }
    if(prediction1 == "Victory"){
        emojiprediction1 = "✌️"
    }
    if(prediction1 == "Thumbs Up"){
        emojiprediction1 = "👍"
    }
    if(prediction1 == "Thumbs Down"){
        emojiprediction1 = "👎"
    }
    document.querySelector("#result_gesture_name").innerHTML = result[0].label + " " + emojiprediction1;
    speak();
}

function speak(){
    let synth = window.speechSynthesis;
    let predictspeak1 = "the prediction is " + prediction1;
    let utterThis = new SpeechSynthesisUtterance(predictspeak1);
    synth.speak(utterThis);
}