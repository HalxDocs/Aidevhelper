const header = document.getElementById("sidebar-header");
let isDragging = false;
let startX = 0;

header.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const dx = startX - e.clientX;
  startX = e.clientX;

  const iframe = window.frameElement;
  let newWidth = parseInt(iframe.style.width) + dx;

  if (newWidth < 200) newWidth = 200;
  if (newWidth > 600) newWidth = 600;

  iframe.style.width = newWidth + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "auto";
});
