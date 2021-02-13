'use strict'

function init() {
    renderImages()
    setTimeout(() => renderImages(), 200)
    gCtx = gElCanvas.getContext('2d');
    addListeners()
    renderTags()
    renderSearhList()
}

function renderImages() {
    var imagesToShow = getImagesToShow()
    var strHTML = imagesToShow.map((image) => {
        return `<img src="images/${image.id}.jpg" alt="photo" class="galery-img" onclick="onMemeEditor(${image.id})">`
    })
    document.querySelector('.images-container').innerHTML = strHTML.join('')
    var images = Array.from(document.querySelectorAll('.galery-img'))
    images.forEach((image) => {
        if (Math.abs((image.naturalWidth - image.naturalHeight) < image.naturalWidth / 10)) {
            image.classList.add('box')
        } else if (image.naturalWidth < image.naturalHeight) {
            image.classList.add('portrait')
        } else image.classList.add('landscape')
    })
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
    var images = Array.from(document.querySelectorAll('.galery-img'))
    var curImg = images[gMeme.selectedImgId - 1]
    var aspect = curImg.naturalWidth / curImg.naturalHeight
    let aspectX = []
    let aspectY = []
    gMeme.lines.forEach((line) => {
        aspectX.push(gElCanvas.width / line.pos.x)
        aspectY.push(gElCanvas.height / line.pos.y)
    })
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetWidth / aspect
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
    if (!images) return
    var strHTML = images.map((image) => {
        return `<img src="${image}" class="saved-img"/>`
    })
    document.querySelector('.saved-images').innerHTML = strHTML.join('')
    var images = Array.from(document.querySelectorAll('.saved-img'))
    setTimeout(() => {
        images.forEach((image) => {
            if (Math.abs((image.naturalWidth - image.naturalHeight) < image.naturalWidth / 10)) {
                image.classList.add('box')
            } else if (image.naturalWidth < image.naturalHeight) {
                image.classList.add('portrait')
            } else image.classList.add('landscape')
        })
    }, 10)
}

function onSaved() {
    renderStored()
    document.querySelector('.images-container').classList.add('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.search-bar').classList.add('hidden')
    document.querySelector('.saved-images').classList.remove('hidden')
}

function renderTags(all = false) {
    let tags = getTags(all)
    var strHTML = tags.map((tag) => {
        return `<div class="tag pointer flex align-center tag-size-${tag.rate}" onclick="onFilter(this)">${tag.value}</div>`
    })
    document.querySelector('.tags-container').innerHTML = strHTML.join('')
}

function onFilter(elTag) {
    setFilter(elTag.innerText)
    let elMore = document.querySelector('.more-tags')
    if (elMore.innerText === 'more...') {
        renderTags()
    } else {
        renderTags(true)
    }
    renderImages()
}

function showMoreTags(elMore) {
    document.querySelector('.tags-container').classList.toggle('more')
    if (elMore.innerText === 'more...') {
        renderTags(true)
        elMore.innerText = 'less...'
    } else {
        renderTags()
        elMore.innerText = 'more...'
    }
}

function onSearch() {
    var elInput = document.querySelector('.search-input')
    setFilter(elInput.value)
    renderTags()
    renderImages()
}

function renderSearhList() {
    var tags = getTags(true)
    var strHTML = tags.map((tag) => {
        return `<option value="${tag.value}"></option>`
    })
    document.getElementById('tags').innerHTML = strHTML.join('')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}
