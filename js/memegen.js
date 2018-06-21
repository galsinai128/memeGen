'use strict';


function init() {
    initImgs();
    var imgs = getImgs();
    renderImgs(imgs);
    renderOptionsForFilter();
    renderPopularKeysList();
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


function renderOptionsForFilter(){
    var elFilter = document.querySelector('#keywords');
    var strHtml = '';
    strHtml+=`<option value="ALL">`
    for (var i in gKeywordMap){
        strHtml+=`<option value=${i}>`
    }
    elFilter.innerHTML = strHtml;
}

function filterImagesList(popularStr){
    var elFilter = document.querySelector('.filter-search');
    if (!popularStr){
        var filter = elFilter.value;
    }
    else {
        var filter = popularStr;
    }
    var elUlImgs = document.querySelector('.imgs-list');
    var strHtml = '';
    if (filter === 'ALL') {
        renderImgs(gImgs);
        elFilter.value = '';
        return;
    } 
    for (var i = 0; i < gImgs.length; i++){
        for (var j = 0; j < gImgs[i].keywords.length; j++){
            var keyword = gImgs[i].keywords[j];
            if (filter === keyword){
                strHtml += `<li><div class="list-item-container">
                            <img id="${gImgs[i].url}" src="${gImgs[i].url}" 
                            onclick="openGen(this)" alt="No Pciture to displaye"></div></li>`
            } 
        }
    }
    elUlImgs.innerHTML = strHtml;
    elFilter.value = '';
    gPopularKeywordMap[filter]++;
    saveToStorage('popular-keys',gPopularKeywordMap);
    renderPopularKeysList();
}

function renderPopularKeysList(){
    var elPopularItems = document.querySelector('.popular-searches');
    var strHtml = '';
    for (var i in gPopularKeywordMap){
        if (gPopularKeywordMap[i]>2){
            strHtml += `<li onclick="searchPopularItem(this.textContent)" class="popular-item" 
                        style="font-size:${gPopularKeywordMap[i]*0.2}rem">${i}</li>`
        }
    }
    elPopularItems.innerHTML = strHtml;
}

function searchPopularItem(str){
    filterImagesList(str);
}