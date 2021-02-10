'use strict'


var gKeywords = { 'happy': 12, 'funny puk': 1 }
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
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


function updateMeme(idx) {
    gMeme.selectedImgId = idx;
}

function updateText(elInput) {
    gMeme.lines[0].txt = elInput.value
    renderCanvas()
}

function renderCanvas() {
    drawImg(gMeme.selectedImgId, renderText)
}


function drawImg(idx, callback=console.log) {
    gMeme.selectedImgId = idx
    const img = new Image()
    img.src = `../images/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        callback()
    }
}



function renderText() {
    drawText (gMeme.lines[0].txt, gElCanvas.width/2, gElCanvas.height/2)
}


function drawText(text, x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'
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
    // if (!isCirlceClicked(pos)) return
    // gCircle.isDragging = true
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    // if (gCircle.isDragging) {
    //     const pos = getEvPos(ev)
    //     const dx = pos.x - gStartPos.x
    //     const dy = pos.y - gStartPos.y

    //     gCircle.pos.x += dx
    //     gCircle.pos.y += dy

    //     gStartPos = pos
    //     renderCanvas()
    //     renderCircle()
    // }
}

function onUp() {
    // gCircle.isDragging = false
    // document.body.style.cursor = 'grab'
}