import { hs} from './main.js'
export var mouseX = 0;
export var mouseY = 0;
export var mouseClicked = false;
const canvas = document.getElementById("catan-board");
const ctx = canvas.getContext("2d");
export function drawHarbors() {
    const harborLocations = [
      { x: 300, y: 30 }, { x: 450, y: 30 }, { x: 570, y: 130 },
      { x: 630, y: 280 }, { x: 570, y: 430 }, { x: 450, y: 530 },
      { x: 300, y: 530 }, { x: 150, y: 430 }, { x: 90, y: 280 }
    ];
    const harborTypes = ["3:1", "3:1", "3:1", "3:1", "2:1 Brick", "2:1 Wood", "2:1 Wheat", "2:1 Sheep", "2:1 Ore"];
    for (let i = 0; i < harborLocations.length; i++) {
      let { x, y } = harborLocations[i];
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + hs, y + hs * Math.sin(Math.PI / 3));
      ctx.lineTo(x - hs, y + hs * Math.sin(Math.PI / 3));
      ctx.closePath();
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#000000";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(harborTypes[i], x, y + hs * Math.sin(Math.PI / 3) / 2);
    }
  }
export function drawHexagon(x, y, fillColor, number) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        let angle = (Math.PI / 180) * (60 * i + 30);
        let xOffset = hs * Math.cos(angle);
        let yOffset = hs * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(x + xOffset, y + yOffset);
        } else {
            ctx.lineTo(x + xOffset, y + yOffset);
        }
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.stroke();
    if (number !== null) {
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(number, x, y);
    }
}
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});
canvas.addEventListener("mousedown", () => {
    mouseClicked = true;
});
canvas.addEventListener("mouseup", () => {
    mouseClicked = false;
});

