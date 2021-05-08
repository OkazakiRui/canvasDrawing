const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const clear = document.getElementById("clear");
let isDrag = false;

// 描画処理
function draw(x, y) {
  if (!isDrag) {
    return;
  }
  context.strokeStyle = colors[selectColor];
  context.lineWidth = range.value;
  context.lineTo(x, y);
  context.stroke();
}

// マウスの処理
canvas.addEventListener("mousedown", () => {
  context.beginPath();
  isDrag = true;
});
canvas.addEventListener("mouseup", () => {
  context.closePath();
  isDrag = false;
});
canvas.addEventListener("mousemove", (e) => {
  draw(e.layerX, e.layerY);
});

// モバイルの処理
canvas.addEventListener("touchstart", () => {
  context.beginPath();
  isDrag = true;
});
canvas.addEventListener("touchend", () => {
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
const range = document.getElementById("range");
const rangeValue = document.getElementById("rangeValue");
range.addEventListener("change", () => {
  rangeValue.textContent = range.value;
});

// 色関係
const colors = ["#000", "#fff", "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];
const colorBtns = document.querySelectorAll("button.color");
let selectColor = 0;
colorBtns.forEach((el, index) => {
  el.style.transform = "scale(1)";
  colorBtns[selectColor].style.transform = "scale(1.2)";
  el.style.background = colors[index];
  el.addEventListener("click", () => {
    colorBtns[selectColor].style.transform = "scale(1)";
    selectColor = index;
    el.style.transform = "scale(1.2)";
  });
});
