const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let isDrag = false;

// 描画処理
function drawStart() {
  beforeDraw();
  context.beginPath();
  isDrag = true;
}
function drawEnd() {
  context.closePath();
  isDrag = false;
}
function draw(x, y) {
  if (!isDrag) return;
  context.strokeStyle = colors[selectColor];
  context.lineWidth = range.value;
  context.lineTo(x, y);
  context.stroke();
}

// マウスの処理
canvas.addEventListener("mousedown", drawStart);
canvas.addEventListener("mouseup", drawEnd);
canvas.addEventListener("mousemove", (e) => {
  draw(e.layerX, e.layerY);
});

// モバイルの処理
canvas.addEventListener("touchstart", drawStart);
canvas.addEventListener("touchend", drawEnd);
canvas.addEventListener("touchmove", (e) => {
  draw(e.layerX, e.layerY);
});

// 全消しボタン
const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

// ダウンロードボタン
const download = document.getElementById("download");
download.addEventListener("click", () => {
  let link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "drawingIMG.png";
  link.click();
});

// 太さ調整
const range = document.getElementById("range");
const rangeValue = document.getElementById("rangeValue");
range.addEventListener("change", () => {
  rangeValue.textContent = range.value;
});

// 色
const colors = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
];

// 選択色
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

// IOSのスクロール無効化
window.addEventListener("touchmove", function (event) {
  event.preventDefault();
});

// スタック配列
const maxStack = 5;
let undoStack = [];
let redoStack = [];

// 描画前に現在のcanvasを保存
function beforeDraw() {
  redoStack = [];
  if (undoStack.length >= maxStack) undoStack.pop();
  undoStack.unshift(context.getImageData(0, 0, 350, 350));
  // console.log(undoStack);
}

// 元に戻すボタン
const undoBtn = document.getElementById("undo");
function undo() {
  if (undoStack.length <= 0) return;
  redoStack.unshift(context.getImageData(0, 0, 350, 350));
  const imageData = undoStack.shift();
  context.putImageData(imageData, 0, 0);
}
undoBtn.addEventListener("click", undo);

// やり直しボタン
const redoBtn = document.getElementById("redo");
function redo() {
  if (redoStack.length <= 0) return;
  undoStack.unshift(context.getImageData(0, 0, 350, 350));
  const imageData = redoStack.shift();
  context.putImageData(imageData, 0, 0);
}
redoBtn.addEventListener("click", redo);
