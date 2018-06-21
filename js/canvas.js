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
var gtopTxt = null;
var gBottomTxt = null;


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


function drawText(ev, elInput, isPropChange) {
    var inputValue = elInput;
    ctx.font = gCurrFontStyle;
    ctx.textAlign = gCurrTxtAlign;
    ctx.fillStyle = gCurrColorTxt;

    if (!gPosTxt) {
        gPosTxt = 50;
    } else {
        gBottomTxt = inputValue;
    }

    if (ev.inputType === 'deleteContentBackward' && inputValue !== ' ') {
        elInput.value = '';
        clearCanvas();
    } else {

        ctx.fillText(inputValue, 15, gPosTxt, gBottomTbX);
        ctx.strokeText(inputValue, 15, gPosTxt, gBottomTbX);
        if (isPropChange) {

            ctx.fillText(gBottomTxt, 15, gBottomTbY + 35, gBottomTbX);
            ctx.strokeText(gBottomTxt, 15, gBottomTbY + 35, gBottomTbX);
        }

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
    var elInputTxt = document.querySelector('.meme-input-line');
    var x = ev.layerX;
    var y = ev.layerY;
    if ((x > 10 && x < gBottomTbX) &&
        (y > gTbHeight && y > gBottomTbY)) {
        gtopTxt = elInputTxt.value;
        elInputTxt.value = ' ';
        gPosTxt = gBottomTbY + 35;
        
    } else if ((x > 10 && x < gBottomTbX) &&
        (y > 10 && y < gTbHeight + 20)) {
        gBottomTxt = elInputTxt.value;
        // elInputTxt.value = ' ';
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
    clearCanvas();
    var currFontSize = gCurrFontStyle.substring(0, 2);
    if (isPlus) {
        var newFontSize = ++currFontSize;
    }
    else {
        var newFontSize = --currFontSize;
    }
    gCurrFontStyle = `${newFontSize}px Impact`;
    var elInput = document.querySelector('.meme-input-line');
    drawText('', elInput.value,true);
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
    var elInput = document.querySelector('.meme-input-line');
    drawText('', elInput.value,true);
}
























function colorChange(el) {
    console.log('color', el.value)
    gCurrColorTxt = el.value;
    var elInputTxt = document.querySelector('.meme-input-line').value;
    clearCanvas();
    drawText('', elInputTxt, true)


}