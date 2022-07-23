var screen_width, screen_height = 0
var apple = '';
var speak_data = '';
var to_number = '';
var draw_apple = '';

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start()
{
    document.getElementById("stats").innerHTML = "System currently is listening please say a number to create that number of apples.";
    recognition.start();
}

recognition.onresult = function(event)
{
    content = event.results[0][0].transcript;
    document.getElementById("stats").innerHTML = "System recognized your speech as: " + content;
    to_number = Number(content)
    if(Number.isInteger(to_number))
    {
        document.getElementById("stats").innerHTML = 'Started drawing apple';
        draw_apple = 'set';
    }
    else
    {
        document.getElementById("stats").innerHTML = 'The speech has not recognized a number';
    }
}

function speaks()
{
    speak_data = to_number + " Apples drawn";
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data = '';
}

function preload()
{
    apple = loadImage("apple.png")
}

function setup()
{
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    canvas = createCanvas(screen_width, screen_height-150);   
}

function draw()
{
    if(draw_apple == "set")
    {
        for(var i = 1; i <= to_number; i++)
        {
            x = Math.floor(Math.random() * screen_width);
            y = Math.floor(Math.random() * screen_height);
            image(apple, x, y, 50, 50);
        }

        speaks();
        document.getElementById("stats").innerHTML = to_number + " Apples drawn";
        draw_apple = '';
    }
}