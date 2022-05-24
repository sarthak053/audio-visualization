
const container = document.getElementById("container");
var canvas = document.getElementById("canvas");
var file = document.getElementById("Fileupload");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 4;
ctx.shadowColor = 'white';


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

    analyser.fftSize = 64;

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
        barHeight = dataArray[i] * 1.1;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * 1.8);
        const hue = i * 3;
        ctx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight / 3 + '%)';
        ctx.font = dataArray[i] + 'px Helvetica';
        ctx.fillText('S', 40, barHeight * 1.6);
        ctx.strokeText('S', 40, barHeight * 1.6);
        x += barWidth;
        ctx.restore();

    }
    const fontSize = dataArray[15] * 2;
    ctx.font = fontSize + 'px Helvetica';
    ctx.fillText('A', canvas.width / 2 - fontSize / 3, canvas.height / 2 + fontSize / 3);
    ctx.strokeText('A', canvas.width / 2 - fontSize / 3, canvas.height / 2 + fontSize / 3);

}










