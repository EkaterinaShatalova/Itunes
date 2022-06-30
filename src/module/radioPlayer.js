/*jshint esversion: 8 */

const radioPlayerInit = () => {
  const radio = document.querySelector(".radio");
  const radioNavigation = document.querySelector(".radio-navigation");
  const radioItem = document.querySelectorAll(".radio-item");
  const radioCover = document.querySelector(".radio-cover__img");
  const radioHeader = document.querySelector(".radio-header__big");
  const radioStop = document.querySelector(".radio-stop");

  const radioVolumeUp = document.querySelector(".radio-icon-up");
  const radioVolumeDown = document.querySelector(".radio-icon-down");
  const radioVolume = document.querySelector(".radio-volume");
  const radioVolumeOff = document.querySelector(".radio-icon-off");

  const audio = new Audio();

  audio.type = "audio/aac";

  const changeRadioVolume = () => {
    audio.volume = radioVolume.value / 100;
  };

  radioVolume.addEventListener("input", changeRadioVolume);
  changeRadioVolume();

  let preRadioVolume = audio.volume;

  radioStop.disabled = true;

  const toggleIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove("play");
      radioStop.classList.add("fa-play");
      radioStop.classList.remove("fa-pause");
    } else {
      radio.classList.add("play");
      radioStop.classList.add("fa-pause");
      radioStop.classList.remove("fa-play");
    }
  };

  const changeSelected = (elem) => {
    radioItem.forEach((item) => item.classList.remove("select"));
    elem.classList.add("select");
  };

  radioNavigation.addEventListener("change", (e) => {
    radioStop.disabled = false;
    const parent = e.target.closest(".radio-item");
    changeSelected(parent);

    const title = parent.querySelector(".radio-name");
    radioHeader.textContent = title.textContent;

    const cover = parent.querySelector(".radio-img");
    radioCover.src = cover.src;

    audio.src = e.target.dataset.radioStantion;
    audio.play();
    toggleIconPlay();
  });

  radioStop.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    toggleIconPlay();
  });

  radioVolumeUp.addEventListener("click", () => {
    if (audio.volume !== 1) {
      preRadioVolume = audio.volume;
      audio.volume = 1;
    } else {
      audio.volume = preRadioVolume;
    }
  });

  radioVolumeDown.addEventListener("click", () => {
    if (audio.volume !== 0) {
      preRadioVolume = audio.volume;
      audio.volume = 0;
    } else {
      audio.volume = preRadioVolume;
    }
  });

  radioVolumeOff.addEventListener("click", () => {
    if (audio.volume !== 0) {
      preRadioVolume = audio.volume;
      audio.volume = 0;
    } else {
      audio.volume = preRadioVolume;
    }
  });

  audio.addEventListener("volumechange", () => {
    radioVolume.value = Math.round(audio.volume * 100);
  });

  radioPlayerInit.stop = () => {
    audio.pause();
    toggleIconPlay();
  };
};

export default radioPlayerInit;
