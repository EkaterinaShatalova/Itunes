/*jshint esversion: 8 */

import { radioPlayerInit } from "./radioPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";

const playerBtn = document.querySelectorAll('.player-btn'); //получаем псевдомассив nodeList - коллекция
const playerBlock = document.querySelectorAll('.player-block'); //получаем псевдомассив nodeList - коллекция
//document = dom дерево
const temp = document.querySelector('.temp');


const hideAll = () => {
  playerBlock.forEach(elem => {
    elem.classList.remove('active');
  });
  playerBtn.forEach(elem => {
    elem.classList.remove('active');
  });
  // temp.style.display = 'none';
};

playerBtn.forEach( (elem, i) => {
  elem.addEventListener('click', () => {
    hideAll();
    elem.classList.add('active');
    playerBlock[i].classList.add('active');
  });
});


console.log(playerBtn);
console.log(playerBlock);

radioPlayerInit();