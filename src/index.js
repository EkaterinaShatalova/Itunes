/*jshint esversion: 8 */

import radioPlayerInit from "./module/radioPlayer.js";
import musicPlayerInit from "./module/musicPlayer.js";
import videoPlayerInit from "./module/videoPlayer.js";

const playerBtn = document.querySelectorAll(".player-btn");
const playerBlock = document.querySelectorAll(".player-block");
const temp = document.querySelector(".temp");

const deactivation = () => {
  playerBlock.forEach((elem) => {
    elem.classList.remove("active");
  });
  playerBtn.forEach((elem) => {
    elem.classList.remove("active");
  });
  temp.style.display = "none";
  videoPlayerInit.stop();
  radioPlayerInit.stop();
  musicPlayerInit.stop();
};

playerBtn.forEach((elem, i) => {
  elem.addEventListener("click", () => {
    deactivation();
    elem.classList.add("active");
    playerBlock[i].classList.add("active");
  });
});

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();
