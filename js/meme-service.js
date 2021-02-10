'use strict'


const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gElCanvas;
var gCtx;

var gImgs = [
    { id: 1, url: '../images/1.jpg', keywords: ['happy'] },
    { id: 2, url: '../images/2.jpg', keywords: ['happy'] },
    { id: 3, url: '../images/3.jpg', keywords: ['happy'] },
    { id: 4, url: '../images/4.jpg', keywords: ['happy'] },
    { id: 5, url: '../images/5.jpg', keywords: ['happy'] },
    { id: 6, url: '../images/6.jpg', keywords: ['happy'] },
    { id: 7, url: '../images/7.jpg', keywords: ['happy'] },
    { id: 8, url: '../images/8.jpg', keywords: ['happy'] },
    { id: 9, url: '../images/9.jpg', keywords: ['happy'] },
    { id: 10, url: '../images/10.jpg', keywords: ['happy'] },
    { id: 11, url: '../images/11.jpg', keywords: ['happy'] },
    { id: 12, url: '../images/12.jpg', keywords: ['happy'] },
    { id: 13, url: '../images/13.jpg', keywords: ['happy'] },
    { id: 14, url: '../images/14.jpg', keywords: ['happy'] },
    { id: 15, url: '../images/15.jpg', keywords: ['happy'] },
    { id: 16, url: '../images/16.jpg', keywords: ['happy'] },
    { id: 17, url: '../images/17.jpg', keywords: ['happy'] },
    { id: 18, url: '../images/18.jpg', keywords: ['happy'] },
];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            pos: {},
            txt: 'I never eat Falafel',
            size: 40,
            align: 'center',
            color: 'white',
            isDragging: false
        }
    ],
}

var gCurrLine = gMeme.lines[0]

function updateMeme(idx) {
    gCurrLine.pos.x = gElCanvas.width / 2
    gCurrLine.pos.y = gElCanvas.height / 2
    gMeme.selectedImgId = idx;
}

function updateText(elInput) {

    gCurrLine.txt = elInput.value
    renderCanvas()
}

function renderCanvas() {
    drawImg(gMeme.selectedImgId, renderText)
}


function drawImg(idx, callback = console.log) {
    gMeme.selectedImgId = idx
    const img = new Image()
    img.src = `../images/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        callback()
    }
}



function renderText() {
    let currLine = gCurrLine;
    gMeme.lines.forEach((line) => {
        gCurrLine = line;
        drawText()
    })
    gCurrLine = currLine
}


function drawText() {
    let text = gCurrLine.txt;
    let x = gCurrLine.pos.x;
    let y = gCurrLine.pos.y;
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'


    var fontSize = 40
    var lineHeight = fontSize * 1.3
    var textWidth = gCtx.measureText(text).width;
    gCtx.strokeRect(x - textWidth / 2 - 10, y - lineHeight + 10, textWidth + 20, lineHeight);



    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
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
    gCurrLine.isDragging = true
    // gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    if (gCurrLine.isDragging) {
        // console.log('gCurrLine:', gCurrLine)
        const pos = getEvPos(ev)
        // const dx = pos.x - gStartPos.x
        // const dy = pos.y - gStartPos.y

        // gCircle.pos.x += dx
        // gCircle.pos.y += dy
        // gStartPos = pos
        // renderCanvas()
        // renderCircle()

        gCurrLine.pos.x = pos.x;
        gCurrLine.pos.y = pos.y;
        // console.log('gCurrLine onMuve:', gCurrLine)
        renderCanvas()
        // drawText()
    }
}

function onUp() {
    gCurrLine.isDragging = false
    // console.log('gCurrLine onup:', gCurrLine)
    document.body.style.cursor = 'default'
}


function newLine() {
    let line = {
        pos: {},
        txt: 'New Line',
        size: 40,
        align: 'center',
        color: 'white',
        isDragging: false
    }
    gMeme.lines.push(line)
    gCurrLine = gMeme.lines[gMeme.lines.length - 1]
    gCurrLine.pos.x = gElCanvas.width / 2
    gCurrLine.pos.y = gElCanvas.height / 2
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


    let currLine = gMeme.lines.find((line) => {
        let lineHeight = line.size * 1.3
        let textWidth = gCtx.measureText(line.txt).width;
        return clickedPos.x > line.pos.x - textWidth / 2 - 10 &&
            clickedPos.x < line.pos.x + textWidth / 2 + 20 &&
            clickedPos.y > line.pos.y - lineHeight + 10 &&
            clickedPos.y < line.pos.y + 10
    })
    if (currLine) {
        gCurrLine = currLine
        // console.log('gCurrLine isLineClicked:', gCurrLine)
        return true
    }
}