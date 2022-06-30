/*jshint esversion: 8 */

const musicPlayerInit = () => {
  const audio = document.querySelector(".audio");
  const audioImg = document.querySelector(".audio-img");
  const audioHeader = document.querySelector(".audio-header");
  const audioPlayer = document.querySelector(".audio-player");
  const audioNavigation = document.querySelector(".audio-navigation");
  const audioProgress = document.querySelector(".audio-progress");
  const audioTimePassed = document.querySelector(".audio-time__passed");
  const audioProgressTiming = document.querySelector(".audio-progress__timing");
  const audioTimeTotal = document.querySelector(".audio-time__total");
  const audioButtonPlay = document.querySelector(".audio-button__play");

  const audioVolumeUp = document.querySelector(".audio-icon-up");
  const audioVolumeDown = document.querySelector(".audio-icon-down");
  const audioVolume = document.querySelector(".audio-volume");
  const audioVolumeOff = document.querySelector(".audio-icon-off");

  const playlist = ["hello", "flow", "speed"];
  let trackIndex = 0;
  let preRadioVolume = audioPlayer.volume;

  const changeMusicVolume = () => {
    audioPlayer.volume = audioVolume.value / 100;
  };

  audioVolume.addEventListener("input", changeMusicVolume);
  changeMusicVolume();

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioPlayer.src = `./audio/${track}.mp3`;
    audioHeader.textContent = track.toUpperCase();

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--;
    } else {
      trackIndex = playlist.length - 1;
    }
    loadTrack();
  };

  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  };

  const timeUpdate = () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + "%";
    const currentMunutes = Math.floor(currentTime / 60) || "0";
    const currentSeconds = Math.floor(currentTime % 60) || "0";
    const durationMinutes = Math.floor(duration / 60) || "0";
    const durationSeconds = Math.floor(duration % 60) || "0";

    const addZero = (n) => (n < 10 ? "0" + n : n);
    audioTimePassed.textContent = `${addZero(currentMunutes)}:${addZero(currentSeconds)}`;
    audioTimeTotal.textContent = `${addZero(durationMinutes)}:${addZero(durationSeconds)}`;
  };

  timeUpdate();

  const toggleMusicIcon = () => {
    if (audioPlayer.paused) {
      audio.classList.remove("play");
      audioButtonPlay.classList.add("fa-play");
      audioButtonPlay.classList.remove("fa-pause");
    } else {
      audio.classList.add("play");
      audioButtonPlay.classList.remove("fa-play");
      audioButtonPlay.classList.add("fa-pause");
    }
  };

  audioNavigation.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("audio-button__play")) {
      loadTrack();

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      toggleMusicIcon();
    }

    if (target.classList.contains("audio-button__prev")) {
      prevTrack();
    }
    if (target.classList.contains("audio-button__next")) {
      nextTrack();
    }
  });

  audioPlayer.addEventListener("ended", () => {
    nextTrack();
    audioPlayer.play();
  });

  audioPlayer.addEventListener("timeupdate", timeUpdate);

  audioProgress.addEventListener("click", (e) => {
    const x = e.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });

  audioVolumeUp.addEventListener("click", () => {
    if (audioPlayer.volume !== 1) {
      preRadioVolume = audioPlayer.volume;
      audioPlayer.volume = 1;
    } else {
      audioPlayer.volume = preRadioVolume;
    }
  });

  audioVolumeDown.addEventListener("click", () => {
    if (audioPlayer.volume !== 0) {
      preRadioVolume = audioPlayer.volume;
      audioPlayer.volume = 0;
    } else {
      audioPlayer.volume = preRadioVolume;
    }
  });

  audioVolumeOff.addEventListener("click", () => {
    if (audioPlayer.volume !== 0) {
      preRadioVolume = audioPlayer.volume;
      audioPlayer.volume = 0;
    } else {
      audioPlayer.volume = preRadioVolume;
    }
  });

  audioPlayer.addEventListener("volumechange", () => {
    audioVolume.value = Math.round(audioPlayer.volume * 100);
  });

  musicPlayerInit.stop = () => {
    audioPlayer.pause();
    toggleMusicIcon();
  };
};

export default musicPlayerInit;
