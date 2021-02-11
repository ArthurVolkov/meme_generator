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
    { id: 2, url: 'images/2.jpg', keywords: ['happy'] },
    { id: 1, url: 'images/1.jpg', keywords: ['happy'] },
    { id: 3, url: 'images/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'images/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'images/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'images/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'images/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'images/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'images/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'images/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'images/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'images/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'images/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'images/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'images/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'images/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'images/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'images/18.jpg', keywords: ['happy'] },
];

var gMeme;

// var gMeme.lines[gMeme.selectedLineIdx] = gMeme.lines[0]

function refresh() {
    gMeme = {
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


function drawImg(idx, callback = console.log) {
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

        // let aspectX = gElCanvas.width / line.pos.x
        // line.pos.x = gElCanvas.width * aspectX
        // line.pos.x = gElCanvas.width / 2,
        // console.log('line.pos.x:', line.pos.x)

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
    // gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = `${fontSize}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)


    gCtx.strokeStyle = selected ? 'green' : 'black'
    var lineHeight = fontSize * 1.25
    var textWidth = gCtx.measureText(text).width;
    gCtx.strokeRect(x - textWidth / 2 - 10, y - lineHeight + lineHeight/5, textWidth + 20, lineHeight);
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        if (!gMeme) return;
        resizeCanvas()
        renderCanvas()
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
    // gStartPos = pos
    document.body.style.cursor = 'grabbing'
    renderCanvas()
}

function onMove(ev) {
    if (gMeme.lines.length !== 0 && gMeme.lines[gMeme.selectedLineIdx].isDragging) {
        const pos = getEvPos(ev)
        // const dx = pos.x - gStartPos.x
        // const dy = pos.y - gStartPos.y

        // gCircle.pos.x += dx
        // gCircle.pos.y += dy
        // gStartPos = pos
        // renderCanvas()
        // renderCircle()

        gMeme.lines[gMeme.selectedLineIdx].pos.x = pos.x;
        gMeme.lines[gMeme.selectedLineIdx].pos.y = pos.y;

        renderCanvas()
        // drawText()

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
    // gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width / 2
    // gMeme.lines[gMeme.selectedLineIdx].pos.y = gElCanvas.height / 2
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
    switch (pos) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 
                gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width / 2 + 10
            break
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width/2
            break
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width - 
                gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width / 2 - 10
            break
    }
    renderCanvas()
}

function changeSize(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].size + diff <= 20 ||
        gMeme.lines[gMeme.selectedLineIdx].size + diff >= 120) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
    renderCanvas()
}




function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
    renderCanvas()
}


function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    renderCanvas()
}

function changeFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color;
    renderCanvas()
}














// function renderIcons() {
    
//     var strHTML = gIconsUnicode.map((icon, idx) => {

//         return `<div onclick="onChoseIcon(${idx})">
//         <i class=icon-foo>&#x${icon};</i>
//         </div>`
//     })
//     document.querySelector('.icons-modal').innerHTML = strHTML.join('')
// }


function renderIcons() {

    var iconsToShow = gIconsUnicode.slice(gIconsPage, gIconsPage + gIconsPerPage)
    var strHTML = iconsToShow.map((icon, idx) => {

        return `<div onclick="onChoseIcon(${idx})">
        <i class="flex align-center">&#x${icon};</i>
        </div>`
    })
    document.querySelector('.icons-to-render').innerHTML = strHTML.join('')
}


function iconsPaging(diff) {
    
    console.log('gIconsPage:', gIconsPage)
    if (gIconsPage + diff < 0 ) gIconsPage = gIcons.length - gIconsPerPage;
    else if (gIconsPage + diff > gIcons.length - gIconsPerPage) gIconsPage = 0;
    else gIconsPage += diff;
    renderIcons()
}


function choseIcon(idx) {
    newLine()

    
    gMeme.lines[gMeme.selectedLineIdx].font = 'awesome'
    // document.querySelector('canvas').classList.toggle('awesome')
    gMeme.lines[gMeme.selectedLineIdx].txt = `${gIcons[idx]}`
    gMeme.lines[gMeme.selectedLineIdx].size = 60
    gMeme.lines[gMeme.selectedLineIdx].color = 'yellow'
    gMeme.lines[gMeme.selectedLineIdx].stroke = 'yellow'
    renderCanvas()
    onCloseModal()
}



