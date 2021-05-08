const canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  clear = document.getElementById("clear");

// 描画処理
function draw(x, y) {
  context.lineWidth = 1;
  context.lineTo(x, y);
  context.stroke();
}

// イベント
canvas.addEventListener("mousemove", (e) => {
  draw(e.layerX, e.layerY);
});
canvas.addEventListener("touchmove", (e) => {
  draw(e.layerX, e.layerY);
});
clear.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});
