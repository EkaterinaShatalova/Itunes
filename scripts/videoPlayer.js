/*jshint esversion: 8 */

const videoPlayerInit = () => {

  const videoPlayer  = document.querySelector('.video-player');
  const videoButtonPlay  = document.querySelector('.video-button__play');
  const videoButtonStop  = document.querySelector('.video-button__stop');
  const videoTimePassed  = document.querySelector('.video-time__passed');
  const videoTimeTotal  = document.querySelector('.video-time__total');
  const videoProgress  = document.querySelector('.video-progress');
  const videoVolume =  document.querySelector('.video-volume');
  const videoVolumeUp =  document.querySelector('.fa-volume-up');
  const videoVolumeDown =  document.querySelector('.fa-volume-down');
  const videoVolumeOff =  document.querySelector('.fa-volume-off');
  const videoFullscreen = document.querySelector('.video-fullscreen');

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.add('fa-play');
      videoButtonPlay.classList.remove('fa-pause');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  const togglePlay = (event) => {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
    }
    else {
      videoPlayer.pause();
    }
  };

  const stopPlay = () => {
     videoPlayer.pause();
     videoPlayer.currentTime = 0;
     toggleIcon();
  };

  const changeVolume = () => {
    videoPlayer.volume = videoVolume.value / 100;
  };

  videoPlayer.addEventListener('click', togglePlay );
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoProgress.addEventListener('input', (event) => {
    videoPlayer.currentTime = event.target.value / 100 * videoPlayer.duration;
  });

  videoFullscreen.addEventListener('click', ()=> {
    videoPlayer.requestFullscreen();
  });

  videoPlayer.addEventListener('timeupdate', () => {
    
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;
    const progress = (currentTime / duration) * 100;

    const addZero = n => n < 10 ? '0' + n : n;

    let minutesPassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);
    let minutesTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    videoProgress.value = progress;
  });

  videoVolume.addEventListener('input', changeVolume);

  let preVolume  = videoPlayer.volume;

  videoVolumeUp.addEventListener('click', () => {
    if (videoPlayer.volume !== 1) {
      preVolume = videoPlayer.volume;
      videoPlayer.volume = 1;
    } else {
      videoPlayer.volume = preVolume;
    }
  });

  videoVolumeDown.addEventListener('click', () => {
    if (videoPlayer.volume !== 0) {
      preVolume = videoPlayer.volume;
      videoPlayer.volume = 0;
    } else {
      videoPlayer.volume = preVolume;
    }
  });

  videoVolumeOff.addEventListener('click', ()=> {
    if (videoPlayer.volume !== 0) {
      preVolume = videoPlayer.volume;
      videoPlayer.volume = 0;
    } else {
      videoPlayer.volume = preVolume;
    }
    
  });

  videoPlayer.addEventListener('volumechange', () => {
    videoVolume.value  = Math.round(videoPlayer.volume * 100);
  });

  videoPlayer.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        videoPlayer.removeEventListener('click', togglePlay );
      } else {
        videoPlayer.addEventListener('click', togglePlay );
      }
    }
  );

};

export default videoPlayerInit;
