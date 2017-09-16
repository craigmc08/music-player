const AnalyserController = {
  numberBars: 64,
  barWidth: '16px',
  barGap: '8px',
  minFrequency: 200,
  maxFrequency: 4000,

  bars: null,
  analyserContainer: null,
  fftAnalser: null,
  init: () => {
    AnalyserController.bars = [];
    AnalyserController.analyserContainer = document.querySelector('.analyser-container');

    for (let i = 0; i < AnalyserController.numberBars; i++) {
      const newBar = document.createElement('div');
      newBar.classList.add('analyser-bar');
      newBar.id = `ab-${i}`;
      AnalyserController.bars[i] = newBar;

      AnalyserController.analyserContainer.appendChild(newBar);
    }

    const acs = AnalyserController.analyserContainer.style;
    acs.setProperty('--analyser-bars', AnalyserController.numberBars);
    acs.setProperty('--bar-width', AnalyserController.barWidth);
    acs.setProperty('--bar-gap', AnalyserController.barGap);
    acs.setProperty('--analyser-height', 0.5);

    AnalyserController.fftAnalyser = new FFTAnalyser(document.getElementById('audiosrc'));

    AnalyserController.loop();
  },
  update: (bardata, max) => {
    if (bardata.length !== AnalyserController.numberBars) {
      throw new Error(`Invalid bar data length (${bardata.length})`);
      return;
    }

    for (let i = 0; i < AnalyserController.numberBars; i++) {
      const bar = AnalyserController.bars[i];
      bar.style.height = `${bardata[i] / max * 100}%`;
      // bar.style.top = `${bardata[i] / max * 100}%`;
      bar.style.bottom = `0`;
    }
  },
  loop: () => {
    requestAnimationFrame(AnalyserController.loop);

    AnalyserController.fftAnalyser.process();
  }
};
