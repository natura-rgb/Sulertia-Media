const robot = document.querySelector(".robot-wrapper");

function getNext7AM() {
  const now = new Date();

  const target = new Date();
  target.setHours(7, 0, 0, 0);

  if (now > target) {
    target.setDate(target.getDate() + 1);
  }

  return target;
}

function updateTimer() {
  const now = new Date();
  const target = getNext7AM();

  const diff = target - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("timer").innerText =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

function runAnimation() {
  // reset animation
  robot.classList.remove("move");

  // force reflow so restart works properly
  void robot.offsetWidth;

  // start again
  robot.classList.add("move");
}

// first run
runAnimation();

// restart every 40 seconds
setInterval(runAnimation, 40000);

setInterval(updateTimer, 1000);
updateTimer();
