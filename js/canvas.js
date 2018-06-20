'use strict';

var canvas;
var ctx;
var currImg = null;
var gBottomTbY;
var gBottomTbX;
var gTbHeight = 50;
var gPosTxt;

function initCanvas() {
    canvas = document.querySelector('.canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 350;
    canvas.height = 350;
    gPosTxt = null;

    gBottomTbY = (canvas.height - 50) - 10;
    gBottomTbX = canvas.width - 20;

}

function drawImg(imgUrl) {
    initCanvas();

    if (!currImg || currImg !== imgUrl) {
        currImg = imgUrl;
        var img = new Image()
        img.src = imgUrl.src;
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawRectTotxt();
        }
    } else {
        ctx.drawImage(currImg, 0, 0, canvas.width, canvas.height);
        drawRectTotxt();
    }
}

function drawText(ev, elInput) {
    var inputValue = elInput.value;
    ctx.font = "30px Impact";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    if (!gPosTxt) {
        gPosTxt = 50;
    }
    if (ev.inputType === 'deleteContentBackward' && inputValue !== ' ') {
        elInput.value = '';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImg(currImg);
    } else {

        ctx.fillText(inputValue, 15, gPosTxt, gBottomTbX);
        ctx.strokeText(inputValue, 15, gPosTxt, gBottomTbX);

    }

}

function drawRectTotxt() {

    ctx.fillStyle = "#afa8a8";
    //first textbox
    ctx.strokeRect(10, 10, gBottomTbX, gTbHeight);

    //second textbox
    ctx.strokeRect(10, gBottomTbY, gBottomTbX, gTbHeight);
}

function onCanvasClick(ev) {
    var x;
    var y;
    if (ev.pageX || ev.pageY) {
        x = ev.pageX;
        y = ev.pageY;
    }
    else {
        x = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    if ((x > 10 && x < gBottomTbX) &&
        (y > gTbHeight && y > gBottomTbY)) {
            document.querySelector('.meme-input-line').value = ' ';
        gPosTxt = gBottomTbY + 35;
    }
}

function reduceText(){
    var currFontSize = +ctx.font.substring(0,2);
    var newFontSize = --currFontSize;
    ctx.font = `${newFontSize}px Impact`;
}

function enlargeText(){
    console.log('+')
}


