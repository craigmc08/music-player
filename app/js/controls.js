const loopElement = $('.control-button--loop');
const shuffleElement = $('.control-button--shuffle');
const playElement = $('.control-button--play');

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
  if (active) $('#audiosrc').play();
  else $('#audiosrc').pause();
};

registerToggleControl(loopElement, updateLooping);
registerToggleControl(shuffleElement, updateShuffling);
registerPlayElement(playElement, updatePlaying);

registerAudioSource($('#audiosrc'));
