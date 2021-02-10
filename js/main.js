'use strict'




function init() {
    renderImages(18)
    gCtx = gElCanvas.getContext('2d');
    addListeners()

}





function renderImages(count) {
    var strHTML = ``
    for (var i = 1; i <= count; i++) {
        strHTML += `<img src="images/${i}.jpg" alt="photo" class="galery-img" onclick="onMemeEditor(${i})">`
    }
    document.querySelector('.images-container').innerHTML = strHTML
}



function onMemeEditor(idx) {
    document.querySelector('.images-container').classList.toggle('hidden')
    document.querySelector('.meme-editor').classList.toggle('hidden')
    document.querySelector('.search-bar').classList.toggle('hidden')
    updateMeme(idx)
    renderCanvas()
}




function onGalery() {
    document.querySelector('.images-container').classList.remove('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
}


function onNewLine() {
    newLine()
}

function onRemoveLine() {
    removeLine()
}

function onChangeSize(diff) {
    changeSize(diff)
}

function onChangeFont(elInput) {
    changeFont(elInput.value)
}

function onChangeColor(elInput) {
    changeColor(elInput.value)
}

function onChangeFontColor(elInput) {
    changeFontColor(elInput.value)
}


function onIconsModal() {
    renderIcons()
    document.querySelector('.icons-modal').classList.remove('hidden')
}

function onChoseIcon(idx) {
    choseIcon(idx)
}

function onCloseModal() {
    document.querySelector('.icons-modal').classList.add('hidden')
}