'use strict';

var canvas;
var ctx;
var currImg = null;
var gBottomTbY;
var gBottomTbX;
var gTbHeight = 50;
var gPosTxt;

var LEFT;
var CENTER;
var RIGHT;

function initCanvas() {
    canvas = document.querySelector('.canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 350;
    canvas.height = 350;
    var currLine = gMeme.txts[0];
    ctx.font = `${currLine.size}px Impact`;
    ctx.textAlign = currLine.align;
    ctx.fillStyle = currLine.color;

    gPosTxt = null;

    gBottomTbY = (canvas.height - 50) - 10;
    gBottomTbX = canvas.width - 20;

    setAlignCoords()
}

function setAlignCoords() {
    LEFT = 15;
    CENTER = canvas.width / 2;
    RIGHT = canvas.width - 15;
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

function drawText(ev, txtStr) {
    var elInputTxt = document.querySelector('.meme-input-line');
    elInputTxt.maxLength = gBottomTbX;

    gMeme.txts[0].line = txtStr;
    var currTxtWidth = ctx.measureText(txtStr).width;

    if (ev.inputType === 'deleteContentBackward' && txtStr !== ' ') {
        clearCanvas();
    }

    //checking alignment
    var currAlign = gMeme.txts[0].align
    var alignXForCanvas = LEFT;
    switch (currAlign) {
        case 'left':
            alignXForCanvas = LEFT;
            break;
        case 'center':
            alignXForCanvas = CENTER;
            break;
        case 'right':
            alignXForCanvas = RIGHT;
            break;
    }

    if ((currTxtWidth >= gBottomTbX - 20)) {
        elInputTxt.maxLength = elInputTxt.value.length;
        return;
    }
    clearCanvas();
    renderText(txtStr, alignXForCanvas);

}

function renderText(inputValue, alignXForCanvas) {

    ctx.fillText(inputValue, alignXForCanvas, 50);
    ctx.strokeText(inputValue, alignXForCanvas, 50);

}

function drawRectTotxt() {
    //first textbox
    // ctx.strokeRect(10, 10, gBottomTbX, gTbHeight);

    //second textbox
    // ctx.strokeRect(10, gBottomTbY, gBottomTbX, gTbHeight);
}

function onCanvasClick(ev) {
    var elInputTxt = document.querySelector('.meme-input-line');
    var x = ev.layerX;
    var y = ev.layerY;
    if ((x > 10 && x < gBottomTbX) &&
        (y > gTbHeight && y > gBottomTbY)) {
        gtopTxt = elInputTxt.value;
        elInputTxt.value = gBottomTxt;
        gPosTxt = gBottomTbY + 35;

    } else if ((x > 10 && x < gBottomTbX) &&
        (y > 10 && y < gTbHeight + 20)) {
        gBottomTxt = elInputTxt.value;
        elInputTxt.value = gtopTxt;
        gPosTxt = 50;
    }

}

function reduceText() {
    resizeText(false);
}

function enlargeText() {
    resizeText(true);
}

function resizeText(isPlus) {
    var currMeme = gMeme.txts[0];
    if (isPlus) {
        currMeme.size = currMeme.size + 1;
    }
    else {
        currMeme.size = currMeme.size - 1;
    }
    clearCanvas();
    drawText('', currMeme.line);
}

function setAlign(elBtn) {
    var currMeme = gMeme.txts[0];
    switch (elBtn) {
        case 'L':
            currMeme.align = 'left'
            break;
        case 'C':
            currMeme.align = 'center'
            break;
        case 'R':
            currMeme.align = 'right'
            break;
    }
    clearCanvas();
    var elInput = document.querySelector('.meme-input-line');
    drawText('', elInput.value, true);
}



function colorChange(el) {
    var currMeme = gMeme.txts[0];
    currMeme.color = el.value;
    clearCanvas();
    drawText('', currMeme.line)
}