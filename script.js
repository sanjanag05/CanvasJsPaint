// JavaScript to handle drawing
function ToolCircle(context, img_update) {
  this.started = false;
  this.context = context;
  this.img_update = img_update;

  this.mousedown = function (ev) {
    this.started = true;
    this.x0 = ev.offsetX;
    this.y0 = ev.offsetY;
  };

  this.mousemove = function (ev) {
    if (!this.started) {
      return;
    }

    const ctx = this.context;
    ctx.fillStyle = "#" + Math.random().toString(16).slice(-6);

    // Calculate the radius as the distance from the start point to the current mouse position
    const dx = this.x0 - ev.offsetX;
    const dy = this.y0 - ev.offsetY;
    const radius = Math.sqrt(dx * dx + dy * dy);

    ctx.beginPath();
    ctx.arc(this.x0, this.y0, radius, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
  };

  this.mouseup = function (ev) {
    if (this.started) {
      this.mousemove(ev);
      this.started = false;
      this.img_update(); // Update the image or canvas state if needed
    }
  };
}

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// Function to update the canvas image or state if needed
function img_update() {
  // Implement your logic here if you need to update the canvas
}

// Create a new circle tool instance
const circleTool = new ToolCircle(context, img_update);

const button = document.getElementById("button");
button.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

// Add event listeners to the canvas
canvas.addEventListener("mousedown", (ev) => circleTool.mousedown(ev));
canvas.addEventListener("mousemove", (ev) => circleTool.mousemove(ev));
canvas.addEventListener("mouseup", (ev) => circleTool.mouseup(ev));
canvas.addEventListener("mouseleave", (ev) => circleTool.mouseup(ev)); // Handles case when mouse leaves canvas
