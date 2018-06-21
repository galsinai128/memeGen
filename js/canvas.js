'use strict';

var canvas;
var ctx;
var currImg = null;
var gBottomTbY;
var gBottomTbX;
var gTbHeight = 50;
var gPosTxt;
var gCurrColorTxt = 'white';
var gCurrFontStyle = '30px Impact';
var gCurrTxtAlign = 'left';

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

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImg(currImg);
}


function drawText(ev, elInput) {
    var inputValue = elInput.value;
    ctx.font = gCurrFontStyle;
    ctx.textAlign = gCurrTxtAlign;
    ctx.fillStyle = gCurrColorTxt;
    if (!gPosTxt) {
        gPosTxt = 50;
    }
    if (ev.inputType === 'deleteContentBackward' && inputValue !== ' ') {
        elInput.value = '';
        clearCanvas();
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

function reduceText() {
    resizeText(false);
}

function enlargeText() {
    resizeText(true);
}

function resizeText(isPlus) {
    clearCanvas();
    var currFontSize = gCurrFontStyle.substring(0, 2);
    if (isPlus) {
        var newFontSize = ++currFontSize;
    }
    else {
        var newFontSize = --currFontSize;
    }
    gCurrFontStyle = `${newFontSize}px Impact`;
    var elInput = document.querySelector('.meme-input-line')
    drawText('', elInput);
}

function setAlign(elBtn) {
    clearCanvas();
    switch (elBtn) {
        case 'L':
            gCurrTxtAlign = 'left'
            break;
        case 'C':
            gCurrTxtAlign = 'right'
            break;
        case 'R':
            gCurrTxtAlign = 'center'
            break;
    }
    var elInput = document.querySelector('.meme-input-line')
    drawText('', elInput);
}
























function colorChange(el) {
    console.log('color', el.value)
    ctx.fillStyle = el.value;
}