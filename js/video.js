// let player;
// const playerContainer = $(".player");

// let eventsInit = () => {
//  $(".player__start").click(e => {
//    e.preventDefault();

//    if (playerContainer.hasClass("paused")) {
//      player.pauseVideo();
//    } else {
//      player.playVideo();
//    }
//  });

//  $(".player__playback").click(e => {
//    const bar = $(e.currentTarget);
//    const clickedPosition = e.originalEvent.layerX;
//    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//    const newPlaybackPositionSec =
//      (player.getDuration() / 100) * newButtonPositionPercent;

//    $(".player__playback-button").css({
//      left: `${newButtonPositionPercent}%`
//    });

//    player.seekTo(newPlaybackPositionSec);
//  });

//  $(".player__splash").click(e => {
//    player.playVideo();
//  })
// };

// const formatTime = timeSec => {
//  const roundTime = Math.round(timeSec);

//  const minutes = addZero(Math.floor(roundTime / 60));
//  const seconds = addZero(roundTime - minutes * 60);

//  function addZero(num) {
//    return num < 10 ? `0${num}` : num;
//  }

//  return `${minutes} : ${seconds}`;
// };

// const onPlayerReady = () => {
//  let interval;
//  const durationSec = player.getDuration();

//  $(".player__duration-estimate").text(formatTime(durationSec));

//  if (typeof interval !== "undefined") {
//    clearInterval(interval);
//  }

//  interval = setInterval(() => {
//    const completedSec = player.getCurrentTime();
//    const completedPercent = (completedSec / durationSec) * 100;

//    $(".player__playback-button").css({
//      left: `${completedPercent}%`
//    });

//    $(".player__duration-completed").text(formatTime(completedSec));
//  }, 1000);
// };

// const onPlayerStateChange = event => {
//  /*
//    -1 (воспроизведение видео не начато)
//    0 (воспроизведение видео завершено)
//    1 (воспроизведение)
//    2 (пауза)
//    3 (буферизация)
//    5 (видео подают реплики).
//  */
//  switch (event.data) {
//    case 1:
//      playerContainer.addClass("active");
//      playerContainer.addClass("paused");
//      break;

//    case 2:
//      playerContainer.removeClass("active");
//      playerContainer.removeClass("paused");
//      break;
//  }
// };

// function onYouTubeIframeAPIReady() {
//  player = new YT.Player("yt-player", {
//    height: "405",
//    width: "660",
//    videoId: "LXb3EKWsInQ",
//    events: {
//      onReady: onPlayerReady,
//      onStateChange: onPlayerStateChange
//    },
//    playerVars: {
//      controls: 0,
//      disablekb: 0,
//      showinfo: 0,
//      rel: 0,
//      autoplay: 0,
//      modestbranding: 0
//    }
//  });
// }

let video;
let durationControl;
let soundControl;
let intervalId;

const playBtn = document.querySelector(".video__player-img");
const soundBtn = document.querySelector(".sound");
const playerPlayBtn = document.querySelector(".duration__img");


video = document.getElementById("player");


video.addEventListener('loadeddata', function () {
  video.addEventListener('click', playStop);


  let playButtons = document.querySelectorAll(".play");
  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', playStop);
  }

  let micControl = document.getElementById("mic");
  micControl.addEventListener('click', soundOf);

  durationControl = document.getElementById("durationLevel");
  durationControl.addEventListener('input', setVideoDuration);

  durationControl.min = 0;
  durationControl.value = 0;
  durationControl.max = video.duration;

  soundControl = document.getElementById("micLevel");
  soundControl.addEventListener('input', changeSoundVolume);

  soundControl.min = 0;
  soundControl.max = 10;

  soundControl.value = soundControl.max;

  video.addEventListener('ended', function () {
    playBtn.classList.toggle("video__player-img--active");
    video.currentTime = 0;
    playerPlayBtn.classList.remove('active');
  });
});

function playStop() {

  playBtn.classList.toggle("video__player-img--active");



  if (video.paused) {

    video.play();

    intervalId = setInterval(updateDuration, 1000 / 60);

    playerPlayBtn.classList.add('active');

  } else {
    video.pause();

    clearInterval(intervalId);
    playerPlayBtn.classList.remove('active');
  }
}

function setVideoDuration() {
  video.currentTime = durationControl.value;
  updateDuration();
}

function updateDuration() {
  durationControl.value = video.currentTime;
  let step = video.duration / 100;
  let percent = video.currentTime / step;
  durationControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #333333 ${percent}%)`;

}

function soundOf() {
  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
    soundBtn.classList.remove('active');
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
    soundBtn.classList.add('active');

  }
}

function changeSoundVolume() {
  video.volume = soundControl.value / 10;
  if (video.volume == 0) {
    soundBtn.classList.add('active');
  } else {
    soundBtn.classList.remove('active');
  }
  console.log('значение volume у видео ' + video.volume);
  console.log('значение value у micLevel ' + soundControl.value / 10);
}