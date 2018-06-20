'use strict';

var canvas;
var ctx;

function initCanvas() {
    canvas = document.querySelector('.canvas');
    ctx = canvas.getContext('2d');

}

function drawImg(imgUrl) {
    initCanvas();

    canvas.width = 350;
    canvas.height = 350;
    var img = new Image()
    img.src = imgUrl.src;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
    }
}

function drawText(elInput){
    ctx.font = "30px Arial";
    ctx.fillText(elInput, 10, 50);
}
