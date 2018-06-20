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
        strHtml += `<li><img src="${img.url}" onclick="openGen(this)" alt="No Pciture to displaye"></li>`
    });
    elUlImgs.innerHTML = strHtml;

}