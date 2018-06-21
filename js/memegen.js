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
        strHtml += `<li><div class="list-item-container"><img id="${img.url}" src="${img.url}" onclick="openGen(this)" alt="No Pciture to displaye"></div></li>`
    });
    elUlImgs.innerHTML = strHtml;

}

function openGen(elPic){
    var elModal = document.querySelector('.modal');
    document.querySelector('nav h1').classList.add('show')
    document.querySelector('body').classList.add('non-over-flow');
    document.querySelector('.hedaer-decoration').classList.add('hide');
    elModal.classList.add('open-modal');

   var imgObj =  findImg(elPic);
   createMeme(imgObj.id);
    drawImg(elPic);

}

function closeGen(){
    var elModal = document.querySelector('.modal');
    elModal.classList.remove('open-modal');
    document.querySelector('nav h1').classList.remove('show')
    document.querySelector('.hedaer-decoration').classList.remove('hide');
    document.querySelector('body').classList.remove('non-over-flow');

}

function displayAlignMenu(){
    var elAlignMenu = document.querySelector('.align-menu');
    elAlignMenu.classList.toggle('display-block');
}
