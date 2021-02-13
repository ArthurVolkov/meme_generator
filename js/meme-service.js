'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gIconsUnicode = [
    'f556', 'f567', 'f06e', 'f579', 'f119', 'f57a', 'f57f', 'f580', 'f581', 'f582', 'f583', 'f584', 'f585', 'f586', 'f587', 'f588', 'f589', 'f58a', 'f58b', 'f58c'
]
var gIcons = [
    '\uf556', '\uf567', '\uf06e', '\uf579', '\uf119', '\uf57a', '\uf57f', '\uf580', '\uf581', '\uf582', '\uf583', '\uf584', '\uf585', '\uf586', '\uf587', '\uf588', '\uf589', '\uf58a', '\uf58b', '\uf58c'
]
var gIconsPage = 0;
var gIconsPerPage = 5;
var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gElCanvas = document.getElementById('my-canvas');
var gCtx;
var gImgs = [
    { id: 1, url: 'images/2.jpg', keywords: ['happy', 'nature'] },
    { id: 2, url: 'images/1.jpg', keywords: ['politics', 'celebrity', 'trump'] },
    { id: 3, url: 'images/3.jpg', keywords: ['happy', 'animal', 'love'] },
    { id: 4, url: 'images/4.jpg', keywords: ['babe', 'nature'] },
    { id: 5, url: 'images/5.jpg', keywords: ['babe', 'love', 'animal', 'sleep'] },
    { id: 6, url: 'images/6.jpg', keywords: ['animal', 'sleep'] },
    { id: 7, url: 'images/7.jpg', keywords: ['happy', 'celebrity', 'movie', 'smyle'] },
    { id: 8, url: 'images/8.jpg', keywords: ['babe', 'happy', 'nature'] },
    { id: 9, url: 'images/9.jpg', keywords: ['celebrity'] },
    { id: 10, url: 'images/10.jpg', keywords: ['celebrity', 'movie'] },
    { id: 11, url: 'images/11.jpg', keywords: ['celebrity', 'movie'] },
    { id: 12, url: 'images/12.jpg', keywords: ['celebrity', 'movie'] },
    { id: 13, url: 'images/13.jpg', keywords: ['babe', 'nature'] },
    { id: 14, url: 'images/14.jpg', keywords: ['politics', 'celebrity', 'trump'] },
    { id: 15, url: 'images/15.jpg', keywords: ['happy', 'babe'] },
    { id: 16, url: 'images/16.jpg', keywords: ['happy', 'animal'] },
    { id: 17, url: 'images/17.jpg', keywords: ['happy', 'politics', 'celebrity', 'smyle'] },
    { id: 18, url: 'images/19.jpg', keywords: ['celebrity'] },
    { id: 19, url: 'images/20.jpg', keywords: ['happy', 'celebrity', 'movie', 'smyle'] },
    { id: 20, url: 'images/21.jpg', keywords: ['celebrity', 'movie'] },
    { id: 21, url: 'images/22.jpg', keywords: ['happy', 'celebrity', 'movie'] },
    { id: 22, url: 'images/23.jpg', keywords: ['happy', 'celebrity'] },
    { id: 23, url: 'images/24.jpg', keywords: ['happy', 'celebrity', 'smyle'] },
    { id: 24, url: 'images/25.jpg', keywords: ['politics', 'celebrity'] },
    { id: 25, url: 'images/25.jpg', keywords: ['movie'] },
];
var gTags = [
    {
        value: 'happy',
        rate: 5
    },
    {
        value: 'animal',
        rate: 7
    },
    {
        value: 'celebrity',
        rate: 3
    },
    {
        value: 'politics',
        rate: 4
    },
    {
        value: 'love',
        rate: 4
    },
    {
        value: 'babe',
        rate: 2
    },
    {
        value: 'sleep',
        rate: 1
    },
    {
        value: 'movie',
        rate: 3
    },
    {
        value: 'trump',
        rate: 5
    },
    {
        value: 'nature',
        rate: 3
    },
    {
        value: 'smyle',
        rate: 6
    },
]
var gMeme;
var gStoredImages = [];
var gFilterBy;


function refresh() {
    gMeme = {
        isSave: false,
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Line 1',
                size: 30,
                pos: {
                    x: gElCanvas.width / 2,
                    y: 50
                },
                align: 'center',
                color: 'white',
                stroke: 'black',
                font: 'Impact',
                isDragging: false
            },
            {
                pos: {
                    x: gElCanvas.width / 2,
                    y: gElCanvas.height - 20
                },
                txt: 'line 2',
                size: 30,
                align: 'center',
                color: 'white',
                stroke: 'black',
                font: 'Impact',
                isDragging: false
            }
        ],
    }
}

function updateMeme(idx) {
    gMeme.selectedImgId = idx;
}

function updateText(elInput) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].txt = elInput.value
    renderCanvas()
}

function renderCanvas() {
    drawImg(gMeme.selectedImgId, renderText)
}

function drawImg(idx, callback) {
    gMeme.selectedImgId = idx
    const img = new Image()
    img.src = `images/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        callback()
    }
}

function renderText() {
    let currLineIdx = gMeme.selectedLineIdx;
    gMeme.lines.forEach((line, idx) => {
        gMeme.selectedLineIdx = idx;
        if (idx === currLineIdx) {
            drawText('selected')
        } else drawText()
    })
    gMeme.selectedLineIdx = currLineIdx
}

function drawText(selected = 0) {
    let text = gMeme.lines[gMeme.selectedLineIdx].txt;
    let x = gMeme.lines[gMeme.selectedLineIdx].pos.x;
    let y = gMeme.lines[gMeme.selectedLineIdx].pos.y;
    let fontSize = gMeme.lines[gMeme.selectedLineIdx].size
    let font = gMeme.lines[gMeme.selectedLineIdx].font
    let color = gMeme.lines[gMeme.selectedLineIdx].color
    let stroke = gMeme.lines[gMeme.selectedLineIdx].stroke

    gCtx.lineWidth = 2
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = `${fontSize}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    if (gMeme.isSave) return
    gCtx.strokeStyle = selected ? 'green' : 'black'
    var lineHeight = fontSize * 1.25
    var textWidth = gCtx.measureText(text).width;
    gCtx.strokeRect(x - textWidth / 2 - 10, y - lineHeight + lineHeight / 5, textWidth + 20, lineHeight);
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        if (!gMeme) return;
        setTimeout(() => {
            resizeCanvas()
            renderCanvas()
        }, 250)
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}



function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    gMeme.lines[gMeme.selectedLineIdx].isDragging = true
    document.body.style.cursor = 'grabbing'
    renderCanvas()
}

function onMove(ev) {
    if (gMeme.lines.length !== 0 && gMeme.lines[gMeme.selectedLineIdx].isDragging) {
        const pos = getEvPos(ev)
        gMeme.lines[gMeme.selectedLineIdx].pos.x = pos.x;
        gMeme.lines[gMeme.selectedLineIdx].pos.y = pos.y;
        renderCanvas()
    }
}

function onUp() {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].isDragging = false
    document.body.style.cursor = 'default'
}

function newLine() {
    let line = {
        pos: {
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2
        },
        txt: 'New Line',
        size: 30,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: 'Impact',
        isDragging: false
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderText()
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isLineClicked(clickedPos) {
    let currLineIdx = gMeme.lines.findIndex((line) => {
        let lineHeight = line.size * 1.3
        let textWidth = gCtx.measureText(line.txt).width;
        return clickedPos.x > line.pos.x - textWidth / 2 - 10 &&
            clickedPos.x < line.pos.x + textWidth / 2 + 20 &&
            clickedPos.y > line.pos.y - lineHeight + 10 &&
            clickedPos.y < line.pos.y + 10
    })
    if (currLineIdx !== -1) {
        gMeme.selectedLineIdx = currLineIdx
        return true
    }
}

function removeLine() {
    if (gMeme.lines.length === 0) return
    gMeme.lines.splice([gMeme.selectedLineIdx], 1)
    gMeme.selectedLineIdx = 0
    renderCanvas()
}

function alignLine(pos) {
    if (gMeme.lines.length === 0) return
    switch (pos) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].pos.x =
                gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width / 2 + 10
            break
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width / 2
            break
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width -
                gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width / 2 - 10
            break
    }
    renderCanvas()
}

function changeSize(diff) {
    if (gMeme.lines.length === 0) return
    if (gMeme.lines[gMeme.selectedLineIdx].size + diff <= 20 ||
        gMeme.lines[gMeme.selectedLineIdx].size + diff >= 120) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
    renderCanvas()
}

function changeFont(font) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].font = font;
    renderCanvas()
}

function changeColor(color) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    renderCanvas()
}

function changeFontColor(color) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].stroke = color;
    renderCanvas()
}

function renderIcons() {
    var iconsToShow = gIconsUnicode.slice(gIconsPage, gIconsPage + gIconsPerPage)
    var strHTML = iconsToShow.map((icon, idx) => {
        return `<div class="pointer" onclick="onChoseIcon(${idx})">
        <i class="flex align-center">&#x${icon};</i>
        </div>`
    })
    document.querySelector('.icons-to-render').innerHTML = strHTML.join('')
}

function iconsPaging(diff) {
    console.log('gIconsPage:', gIconsPage)
    if (gIconsPage + diff < 0) gIconsPage = gIcons.length - gIconsPerPage;
    else if (gIconsPage + diff > gIcons.length - gIconsPerPage) gIconsPage = 0;
    else gIconsPage += diff;
    renderIcons()
}

function choseIcon(idx) {
    newLine()
    gMeme.lines[gMeme.selectedLineIdx].font = 'awesome'
    gMeme.lines[gMeme.selectedLineIdx].txt = `${gIcons[idx + gIconsPage]}`
    gMeme.lines[gMeme.selectedLineIdx].size = 60
    gMeme.lines[gMeme.selectedLineIdx].color = 'yellow'
    gMeme.lines[gMeme.selectedLineIdx].stroke = 'yellow'
    renderCanvas()
}

function removeBorder() {
    gMeme.isSave = true
    renderCanvas()
    setTimeout(() => {
        gMeme.isSave = false
    }, 800)
}

function download(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


function saveImage() {
    gMeme.isSave = true
    renderCanvas()
    setTimeout(() => {
        var imgContent = gElCanvas.toDataURL('image/jpeg')
        gStoredImages.push(imgContent)
        saveToStorage('images', gStoredImages)
        gMeme.isSave = false
    }, 500)
}


function loadImages() {
    var storedImages = loadFromStorage('images')
    if (!storedImages || !storedImages.length) return
    gStoredImages = storedImages;
    return storedImages;
}

function getTags(all) {
    let tagsToShow = all? gTags.slice() : gTags.slice(0, 4)
    return tagsToShow
}

function getImagesToShow() {
    var images = gImgs.slice()
    if (!gFilterBy) return images
    var imagesToShow = []
    images.forEach((image) => {
        let isShow = image.keywords.find((keyword) => {
            return gFilterBy === keyword
        })
        if (isShow) imagesToShow.push(image)
    })
    console.log('imagesToShow:', imagesToShow)
    return imagesToShow
}

function setFilter(tag) {
    gFilterBy = tag
    let currTag = gTags.find((cTag) => {
        return cTag.value === tag
    })
    if (!currTag) return

    if (currTag.rate >= 10) return
    currTag.rate++
}