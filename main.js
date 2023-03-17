prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tH24A5pPx/model.json', modelLoaded);
function modelLoaded(){
    console.log('model loaded');
}
function speak1(){
    var synth = window.speechSynthesis;
    speak_data_1 = "This is looking" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function speak2(){
    var synth = window.speechSynthesis;
    speak_data_2 = "All the" + prediction;;
    var utterThis = new SpeechSynthesisUtterance(speak_data_2);
    synth.speak(utterThis);
}
function speak3(){
    var synth = window.speechSynthesis;
    speak_data_3 = "That was a marvelous" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data_3);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction = results[0].label;
        if (results[0].label == "Amazing"){
            speak1();
            document.getElementById("update_emoji").innerHTML="&#128076";
        }
        if (results[0].label == "Best"){
            speak2();
            document.getElementById("update_emoji").innerHTML="&#128077";
        }
        if (results[0].label == "Victory"){
            speak3();
            document.getElementById("update_emoji").innerHTML="&#9996";
        }
    }
}