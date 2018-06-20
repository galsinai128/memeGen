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
        drawRectTotxt();
    }

}

function drawText(ev,elInput){
    ctx.font = "30px Arial";
    ctx.textAlign="left";
    ctx.fillText(elInput, 15, 50);
}

function drawRectTotxt(){
    ctx.fillStyle = "#afa8a8";
    ctx.strokeRect(10,10, canvas.width - 20, 50);
    ctx.strokeRect(10,(canvas.height-50)-10, canvas.width - 20, 50);

}



