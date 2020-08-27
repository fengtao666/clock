var dom = document.getElementById('clock');
// 连接上下文
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;  //比例

function drawBackground() {
    ctx.save();
    ctx.translate(r, r);
    ctx.beginPath();    //起始一条路径  
    ctx.lineWidth = 10;    //当前线条的宽度
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);  //创建弧度、曲线 
    ctx.stroke();   //绘制已定义的路径

    // 小时树
    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = 18 * rem + 'px Arial';    //设置字体
    ctx.textAlign = 'center';   //左右对齐
    ctx.textBaseline = 'middle';    //上下对齐
    hourNumbers.forEach(function (number, i) {

        var rad = 2 * Math.PI / 12 * i;  // 每个小时树的弧度
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        // 填充文字
        ctx.fillText(number, x, y);

        // 时针圆点
        for (var i = 0; i < 60; i++) {
            var rad = 2 * Math.PI / 60 * i;
            var x = Math.cos(rad) * (r - 18 * rem);
            var y = Math.sin(rad) * (r - 18 * rem);
            ctx.beginPath();
            if (i % 5 === 0) {
                ctx.fillStyle = '#000';
            } else {
                ctx.fillStyle = '#ccc';
            }
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
            ctx.fill();
        }
        ctx.fillStyle = '#000';

    })
}

// 时针
function drawHour(hour, min) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * min;
    ctx.rotate(rad + mrad);    //旋转
    ctx.lineWidth = 6 * rem;
    ctx.lineCap = 'round'; //线端形状
    ctx.moveTo(0, 10 * rem);  //(x轴，y轴) 位置
    ctx.lineTo(0, - r / 2 * rem);   //线长
    ctx.stroke();
    ctx.restore();
}

// 分针
function drawMinute(min) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * min;
    ctx.rotate(rad);    //旋转
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r + 35 *rem);
    ctx.stroke();
    ctx.restore();
}

// 秒针
function drawSecond(sec) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#c1454c';
    var rad = 2 * Math.PI / 60 * sec;
    ctx.rotate(rad);
    ctx.moveTo(-2, 20 * rem);
    ctx.lineTo(2, 20 * rem);
    ctx.lineTo(1, -r + 18 * rem);
    ctx.lineTo(-1, -r + 18) * rem;
    ctx.fill();     //填充
    ctx.restore();
}

function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);    //画圆
    ctx.fill();
}

// drawBackground();
// drawHour(4,30);
// drawMinute(30);
// drawSecond(15);
// drawDot();

function draw() {
    ctx.clearRect(0, 0, width, height);     //每秒清除cancas
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    drawBackground();
    drawHour(hour, min);
    drawMinute(min);
    drawSecond(sec);
    drawDot();
    ctx.restore();   //还原设置
}

draw();
setInterval(draw, 1000)