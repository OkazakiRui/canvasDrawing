const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const clear = document.getElementById("clear");
const range = document.getElementById("range");
const rangeValue = document.getElementById("rangeValue");
let isDrag = false;

// 描画処理
function draw(x, y) {
  if (!isDrag) {
    return;
  }
  context.lineWidth = range.value;
  context.lineTo(x, y);
  context.stroke();
}

// マウスの処理
canvas.addEventListener("mousedown", (e) => {
  context.beginPath();
  isDrag = true;
});
canvas.addEventListener("mouseup", (e) => {
  context.closePath();
  isDrag = false;
});
canvas.addEventListener("mousemove", (e) => {
  draw(e.layerX, e.layerY);
});

// モバイルの処理
canvas.addEventListener("touchstart", (e) => {
  context.beginPath();
  isDrag = true;
});
canvas.addEventListener("touchend", (e) => {
  context.closePath();
  isDrag = false;
});
canvas.addEventListener("touchmove", (e) => {
  draw(e.layerX, e.layerY);
});

// 全消しボタン
clear.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

// 太さ調整
range.addEventListener("change", () => {
  rangeValue.textContent = range.value;
});
