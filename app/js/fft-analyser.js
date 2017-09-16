const noteStep = 120 / AnalyserController.numberBars;
const a = 2 ** (1/12);
const aNoteStep = a ** noteStep;

class FFTAnalyser {
  constructor(audiosrc) {
    const fftSize = 2**13*2;
    const volume = 0.2;

    this.actx = new AudioContext();
    this.audio = audiosrc;
    this.audiosrc = this.actx.createMediaElementSource(this.audio);
    this.analyser = this.actx.createAnalyser();
    this.analyser.fftSize = 2**13 * 2;

    const delayTime = (fftSize / 2) / this.actx.sampleRate;

    this.delay = this.actx.createDelay(1);
    this.delay.delayTime.value = delayTime;

    this.gain = this.actx.createGain();
    this.gain.gain.value = volume;

    this.audiosrc.connect(this.analyser);
    this.analyser.connect(this.delay);
    this.delay.connect(this.gain);
    this.gain.connect(this.actx.destination);

    this.frequencydata = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.smoothingTimeConstant = 0.7;

    this.frequencyOffset = 0;
    this.hstart = 8;

    // Calculate frequencyOffset and hstart from AnalyserController.minFrequency and AnalyserController.maxFrequency
    {
      const difference = AnalyserController.maxFrequency - AnalyserController.minFrequency;
      this.hstart = difference / 1000;
      this.frequencyOffset = AnalyserController.minFrequency;
    }
  }

  setGain(gain) {
    this.gain.gain.value = gain;
  }

  // Process current frequency data
  process() {
    this.analyser.getByteFrequencyData(this.frequencydata);

    const barData = [];

    let l = 0;
    let h = this.hstart;

    for (let i = 0; i < AnalyserController.numberBars; i++) {
      // Increase the frequency range on a logarithmic scale
      l = h;
      h = l * aNoteStep;

      const lo = l + this.frequencyOffset;
      const ho = h + this.frequencyOffset;

      barData[i] = this.frequencyRange(lo, ho > 8190 ? 8190 : ho);
      barData[i] = Math.pow(barData[i], 2) / 65025;
      barData[i] = barData[i] > 1 ? 1 : barData[i];
      barData[i] = Math.min(Math.max(barData[i], 0.01), 1);
    }

    // Render the stuff
    AnalyserController.update(barData, 1);
  }

  // Get the average magnitude of the frequencies from l (low) to h (high)
  frequencyRange(l, h) {
    let sum = 0;
    let count = 2;

    // Use partial pieces of frequency (for fractional frequencies which doesn't make sense anyways)
    sum += this.frequencydata[Math.floor(l)] * (l % 1);
    sum += this.frequencydata[Math.floor(h + 1)] * (h % 1);

    for (let i = Math.floor(l + 1); i < Math.floor(h); i++) {
      sum += this.frequencydata[i];
      count++;
    }

    return sum / count;
  }
}
