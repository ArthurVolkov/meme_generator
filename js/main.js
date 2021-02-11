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
    document.querySelector('.saved-images').classList.add('hidden')
    refresh()
    updateMeme(idx)
    renderCanvas()
    resizeCanvas()
    renderIcons()
}

function onRefresh() {
    refresh()
    renderCanvas()
}

function onGalery() {
    if (!document.querySelector('.images-container').classList.contains('hidden')) return
    document.querySelector('.images-container').classList.remove('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.search-bar').classList.toggle('hidden')
    document.querySelector('.saved-images').classList.add('hidden')
}

function onNewLine() {
    newLine()
}

function onRemoveLine() {
    removeLine()
}

function onAlignLine(pos) {
    alignLine(pos)
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

function onChoseIcon(idx) {
    choseIcon(idx)
}

function onIconsPaging(diff) {
    iconsPaging(diff)
}

function onOpenShare() {
    document.querySelector('.share').classList.toggle('open')
    removeBorder()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    let aspectX = []
    let aspectY = []
    gMeme.lines.forEach((line) => {
        aspectX.push(gElCanvas.width / line.pos.x)
        aspectY.push(gElCanvas.height / line.pos.y)
    })
    gElCanvas.width = elContainer.offsetWidth 
    gElCanvas.height = elContainer.offsetWidth
    gMeme.lines.forEach((line, idx) => {
        line.pos.x = gElCanvas.width / aspectX[idx]
        line.pos.y = gElCanvas.height / aspectY[idx]
    })
}

function onDownload(elLink) {
    download(elLink)
    document.querySelector('.share').classList.remove('open')
}

function onSave() {
    saveImage()
    document.querySelector('.share').classList.remove('open')
}

function renderStored() {
    var images = loadImages()
    if(!images) return
    var strHTML = images.map((image) => {
        return `<img src="${image}"/>`
    })
    document.querySelector('.saved-images').innerHTML = strHTML.join('')
}

function onSaved() {
    renderStored()
    document.querySelector('.images-container').classList.add('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.search-bar').classList.add('hidden')
    document.querySelector('.saved-images').classList.remove('hidden')
}