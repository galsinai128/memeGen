'use strict';


function init() {
    initImgs();
    var imgs = getImgs();
    renderImgs(imgs);
}

function renderImgs(imgs) {
    var elUlImgs = document.querySelector('.imgs-list');
    var strHtml = '';
    imgs.forEach(function (img) {
        strHtml += `<li><div><img src="${img.url}" onclick="openGen(this)" alt="No Pciture to displaye"></div></li>`
    });
    elUlImgs.innerHTML = strHtml;

}

function openGen(elPic){
    var elModal = document.querySelector('.modal');
    elModal.classList.add('open-modal');
    drawImg(elPic);
}

function closeGen(){
    var elModal = document.querySelector('.modal');
    elModal.classList.remove('open-modal');
}