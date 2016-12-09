/**
 * Created by 流口水流 on 2016/10/17.
 */

var chess = document.getElementById('chess'),
    ctx = chess.getContext('2d');

var chessBoard = [],
    me = true;


/**
 * 画出棋盘 20X20
 */
function drawChessBoard() {
    ctx.strokeStyle = '#bbb';
    for (var i = 0; i <= 20; i++) {
        ctx.moveTo(20 + i * 30, 20);
        ctx.lineTo(20 + i * 30, 620);

        ctx.moveTo(20, 20 + i * 30);
        ctx.lineTo(620, 20 + i * 30);
    }
    ctx.stroke();
}

/**
 * 画棋子
 * @param i   x轴
 * @param j   y轴
 * @param me  黑白子
 */
function chessMan(i, j, me) {
    var grd = ctx.createRadialGradient(20 + i * 30 + 2, 20 + j * 30 -2, 13, 20 + i * 30 + 2, 20 + j * 30 -2, 0);
    if(me){
        grd.addColorStop(0,"#0a0a0a");
        grd.addColorStop(1,"#666");
    }else {
        grd.addColorStop(0,"#d1d1d1");
        grd.addColorStop(1,"#f9f9f9");
    }
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(20 + i * 30, 20 + j * 30, 13, 0, 2 * Math.PI);
    ctx.fill();
}

/**
 * 每一步
 * @param e
 */
function oneStep(e) {
    var x = e.offsetX,
        y = e.offsetY,
        i = Math.floor(x / 30),
        j = Math.floor(y / 30);
    if(chessBoard[i][j] == 0){
        chessMan(i, j, me);
        if(me){
            chessBoard[i][j] = 1;
        }else {
            chessBoard[i][j] = 2;
        }
    }
    me = !me;
}

function init() {
    drawChessBoard();
    chess.addEventListener('click',oneStep)
}

init();