const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let isDrag = false;
let eraserBool = false;

// 画質
canvas.style.height = "350px";

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
  if (eraserBool) {
    context.globalCompositeOperation = "destination-out";
  } else {
    context.globalCompositeOperation = "source-over";
  }
  context.strokeStyle = colors[selectColor];
  context.lineWidth = range.value;
  context.lineTo(x * 2, y * 2);
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

// 全消し
const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  beforeDraw();
  context.clearRect(0, 0, canvas.width, canvas.height);
});

// ダウンロード
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
range.addEventListener("input", () => {
  rangeValue.textContent = range.value;
});

// カラーパレット
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
const maxStack = 30;
let undoStack = [];
let redoStack = [];

// 描画前に現在のcanvasを保存
function beforeDraw() {
  redoStack = [];
  if (undoStack.length >= maxStack) undoStack.pop();
  undoStack.unshift(
    context.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight)
  );
  // console.log(undoStack);
}

// 元に戻す
const undoBtn = document.getElementById("undo");
function undo() {
  if (undoStack.length <= 0) return;
  redoStack.unshift(
    context.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight)
  );
  const imageData = undoStack.shift();
  context.putImageData(imageData, 0, 0);
}
undoBtn.addEventListener("click", undo);

// やり直し
const redoBtn = document.getElementById("redo");
function redo() {
  if (redoStack.length <= 0) return;
  undoStack.unshift(
    context.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight)
  );
  const imageData = redoStack.shift();
  context.putImageData(imageData, 0, 0);
}
redoBtn.addEventListener("click", redo);

// 消しゴム
const eraserBtn = document.getElementById("eraser");
eraserBtn.style.transform = "scale(0.8)";
eraserBtn.addEventListener("click", () => {
  eraserBool = !eraserBool;
  if (eraserBool) {
    eraserBtn.style.transform = "scale(1)";
  } else {
    eraserBtn.style.transform = "scale(0.8)";
  }
});

// 画像読み込み
const loadingBtn = document.getElementById("loading");
loadingBtn.addEventListener("click", () => {
  let input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();

  input.addEventListener("change", () => {
    var file = input.files[0];
    if (!file.type.match(/^image\/(png|jpeg|gif)$/)) return;

    var image = new Image();
    var reader = new FileReader();

    reader.onload = function (evt) {
      image.onload = function () {
        // $("#canvas").attr("width", image.width);
        // $("#canvas").attr("height", image.height);
        context.drawImage(image, 0, 0); //canvasに画像を転写
      };

      image.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  });
});
