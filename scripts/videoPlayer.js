/*jshint esversion: 8 */

const videoPlayerInit = () => {

  const videoPlayer  = document.querySelector('.video-player');
  const videoButtonPlay  = document.querySelector('.video-button__play');
  const videoButtonStop  = document.querySelector('.video-button__stop');
  const videoTimePassed  = document.querySelector('.video-time__passed');
  const videoTimeTotal  = document.querySelector('.video-time__total');
  const videoProgress  = document.querySelector('.video-progress');

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.add('fa-play');
      videoButtonPlay.classList.remove('fa-pause');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  const togglePlay = () => {
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

  videoPlayer.addEventListener('click', togglePlay );
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoProgress.addEventListener('change', (event) => {
    videoPlayer.currentTime = event.target.value / 100 * videoPlayer.duration;
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
};

export default videoPlayerInit;
