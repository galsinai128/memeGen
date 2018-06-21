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
var gCurrLineIdx = 0;

function initCanvas() {

    canvas = document.querySelector('.canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 350;
    canvas.height = 350;
    var currLine = gMeme.txts[gCurrLineIdx];
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
        }
    } else {
        ctx.drawImage(currImg, 0, 0, canvas.width, canvas.height);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImg(currImg);
}

function drawText(ev, txtStr) {
    var elInputTxt = document.querySelector('.meme-input-line');
    elInputTxt.maxLength = gBottomTbX;

    gMeme.txts[gCurrLineIdx].line = txtStr;

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

    for (var i = 0; i < gMeme.txts.length; i++) {
        var currLine = gMeme.txts[i];
        ctx.fillText(currLine.line, alignXForCanvas, currLine.coorY);
        ctx.strokeText(currLine.line, alignXForCanvas, currLine.coorY);
    }

}

function addNewLine() {
    var elInputTxt = document.querySelector('.meme-input-line');

    var currMemePosY = gMeme.txts[gCurrLineIdx].coorY;

    if (gMeme.txts.length < 3) {
        gMeme.txts.push(createMemeProp(currMemePosY + 80));
        var idx = gMeme.txts.length - 1;

        elInputTxt.value = gMeme.txts[idx].line;
        gMeme.txts[idx].line = elInputTxt.value;
        gCurrLineIdx = idx;
    }
}


function onCanvasClick(ev) {
    var elInputTxt = document.querySelector('.meme-input-line');
    var currMemePosY = gMeme.txts[gCurrLineIdx].coorY;
    var x = ev.layerX;
    var y = ev.layerY;

    if (gMeme.txts.length === 1 && elInputTxt.value === ' ') {
        return;
    }

   
    // if ((x > 10 && x < gBottomTbX) &&
    //     (y > gTbHeight && y > gBottomTbY)) {
    //     gtopTxt = elInputTxt.value;
    //     elInputTxt.value = gBottomTxt;
    //     gPosTxt = gBottomTbY + 35;

    // } else if ((x > 10 && x < gBottomTbX) &&
    //     (y > 10 && y < gTbHeight + 20)) {
    //     gBottomTxt = elInputTxt.value;
    //     elInputTxt.value = gtopTxt;
    //     gPosTxt = 50;
    // }

}


function toggleLine() {
    var elInputTxt = document.querySelector('.meme-input-line');

    gCurrLineIdx = (gCurrLineIdx + 1)%gMeme.txts.length ;
 
    elInputTxt.value = gMeme.txts[gCurrLineIdx].line;
    gMeme.txts[gCurrLineIdx].line += elInputTxt.value

}

function findLineIdx(coor) {

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

function downloadImg(elLink) {
    var currImgId = gMeme.selectedImgid;
    elLink.download = `img/${currImgId}.jpg`;
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

