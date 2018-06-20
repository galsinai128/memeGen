'use strict';
var gImgs = [];
var gImageId = 0;



function initImgs(){
    gImgs = createImgs();
}

function createImg(keywords){
    return {
        id : ++gImageId,
        url : `img/${gImageId}.jpg`,
        keywords : keywords 
    }
}

function createImgs(){
    var imgs = [
        createImg(['happy','vication','nature']),
        createImg(['angry','bad','right']),
        createImg(['love','girlfriend','animals','friends']),
        createImg(['happy','friends','animals','love','sleep']),
        createImg(['right','happy','bad','fight']),
        createImg(['animals','sleep','work']),
        createImg(['right','happy','party']),
        createImg(['right','bad','nature']),
        createImg(['right','good']),
        createImg(['angry','friends','nature']),
        createImg(['stupid','funny','cincan']),
        createImg(['bad','cincan']),
        createImg(['happy','friends','party','sucsess']),
        createImg(['angry','bad','right']),
        createImg(['shock','ugly','surprise']),
        createImg(['animals','begs','dance']),
        createImg(['happy','right']),
        createImg(['angry','bad','friends','girlfriend']),
        createImg(['happy','right','drunk']),
        createImg(['morphius']),
        createImg(['friend','right']),
        createImg(['happy','opera','right','friend']),
        createImg(['happy','funny','sad']),
        createImg(['happy','bad','sad']),
        createImg(['freind','funny','toys']),
    ];

    return imgs;
}

function getImgs(){
    return gImgs;
}

