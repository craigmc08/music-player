const loopElement = $('.control-button--loop');
const shuffleElement = $('.control-button--shuffle');
const playElement = $('.control-button--play');
const timeSliderElement = $('.controls-time-slider');
const volumeSliderElement = $('.control-volume-slider');
const volumeLevelIconElement = $('.control-volume-icon');
const audioSrc = $('#audiosrc');

const registerToggleControl = (e, updateFunc) => {
  e.addEventListener('click', () => {
    const dataState = e.getAttribute('data-state');
    if (dataState === 'active') e.setAttribute('data-state', '');
    else e.setAttribute('data-state', 'active');
    updateFunc(dataState !== 'active');
  });
};
const registerPlayElement = (e, updateFunc) => {
  e.addEventListener('click', () => {
    const state = e.innerText;
    if (state === 'play_arrow') e.innerText = 'pause';
    else e.innerText = 'play_arrow';
    updateFunc(state === 'play_arrow');
  });
}

const registerAudioSource = (audiosrc) => {
  audiosrc.addEventListener('play', () => {
    playElement.innerText = 'pause';
  });
  audiosrc.addEventListener('pause', () => {
    playElement.innerText = 'play_arrow';
  });
};

const updateLooping = active => {
  // Do something with this later
};
const updateShuffling = active => {
  // Do something with this later
};
const updatePlaying = active => {
  if (active) audioSrc.play();
  else audioSrc.pause();
};
const updateTime = value => {
  audioSrc.currentTime = value;
};
const updateVolume = value => {
  AnalyserController.setGain(value);
  updateVolumeGainIcon();
};
const updateVolumeGainIcon = () => {
  volumeLevelIconElement.innerText = volumeSlider.percentage > 0 ? volumeSlider.percentage > 0.5 ? 'volume_up' : 'volume_down': 'volume_off';
};
const updateVolumeMuted = active => {
  AnalyserController.setGain(0);
  if (active) {
    volumeLevelIconElement.innerText = 'volume_off';
  } else {
    updateVolumeGainIcon();
    AnalyserController.setGain(volumeSlider.value);
  }
};

const timeSlider = new Slider(timeSliderElement, 0, $('#audiosrc').duration);
timeSlider.addEventListener('slideupdate', updateTime);
let wasPlayingBeforeSlide = false;
timeSlider.addEventListener('slidestart', ()=>{wasPlayingBeforeSlide=audioSrc.paused?false:true;audioSrc.pause();});
timeSlider.addEventListener('slideend', ()=>{if(wasPlayingBeforeSlide)audioSrc.play();});
audioSrc.addEventListener('timeupdate', () => {
  timeSlider.maxVal = audioSrc.duration;
  timeSlider.value = audioSrc.currentTime;
});

const volumeSlider = new Slider(volumeSliderElement, 0, 0.5);
volumeSlider.addEventListener('slideupdate', updateVolume);
volumeSlider.percentage = AnalyserController.defaultGain / (volumeSlider.maxVal - volumeSlider.minVal) + volumeSlider.minVal;
updateVolumeGainIcon();

registerToggleControl(loopElement, updateLooping);
registerToggleControl(shuffleElement, updateShuffling);
registerToggleControl(volumeLevelIconElement, updateVolumeMuted);
registerPlayElement(playElement, updatePlaying);

registerAudioSource($('#audiosrc'));
