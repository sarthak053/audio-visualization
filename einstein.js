
const container = document.getElementById("container");
var canvas = document.getElementById("canvas");
var file = document.getElementById("Fileupload");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
const sprite = new Image();
sprite.src = "images/einstein.png"



//container.addEventListener('typing', function typing())

file.addEventListener('change', function () {

    const files = this.files;
    var audio = document.getElementById("audio1");
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();


    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();


    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 128;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);



    const barWidth = 15;
    let barHeight;
    let x;

    function renderFrame() {


        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(renderFrame);

    }
    renderFrame();
});



function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.3;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * 1.7);
        ctx.drawImage(sprite, 0, barHeight, barHeight / 2, barHeight / 2);

        x += barWidth;
        ctx.restore();


    }
    let size = dataArray[15] * 1.5 > 100 ? dataArray[15] : 100;
    ctx.drawImage(sprite, canvas.width / 2 - size / 2, canvas.height / 2 - size / 2, size, size);
}










