/* Events:
 * slidestart:
 *   startingValue: value at slide start
 *  when something clicks on the slider
 *
 * slideend
 *   value: value of the slider
 *  when the slider is stopped being moved
 *
 * slideupdate
 *   value: value of the slider
 *  when the slider is slid a little
 *
 */

class Slider extends EventHandler {
  constructor(container, minVal, maxVal) {
    super();

    const track = container;
    const pretrack = document.createElement('div');
    const thumb = document.createElement('div');

    track.classList.add('slider--container');
    if (!track.style.getPropertyValue('--percentage')) track.style.setProperty('--percentage', 0);

    pretrack.classList.add('slider--pretrack');

    thumb.classList.add('slider--thumb');

    track.appendChild(pretrack);
    track.appendChild(thumb);

    track.addEventListener('mousedown', e=>this.mousedown(e));
    document.addEventListener('mousemove', e=>this.mousemove(e));
    document.addEventListener('mouseup', e=>this.mouseup(e));

    // Don't reference this value, use this.percentage instead
    this._percentage = parseInt(track.style.getPropertyValue('--percentage'));

    this.track = track;
    this.pretrack = pretrack;
    this.thumb = thumb;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.movementInfo = {};

    this.resetMovementInfo();
  }

  mousedown(event) {
    this.resetMovementInfo();
    this.movementInfo.xStart = event.clientX;
    this.movementInfo.moving = true;
    this.dispatchEvent('slidestart', this.value);
    this.updateSlider(event.clientX);
    this.dispatchEvent('slideupdate', this.value);
  }
  mousemove(event) {
    if (this.movementInfo.moving) {
      this.updateSlider(event.clientX);
      this.dispatchEvent('slideupdate', this.value);
    }
  }
  mouseup(event) {
    if (this.movementInfo.moving) {
      this.updateSlider(event.clientX);
      this.dispatchEvent('slideend', this.value);
      this.resetMovementInfo();

      this.track.setAttribute('data-state', this.movementInfo.moving ? 'sliding' : '');
    }
  }

  updateSlider(mouseX) {
    this.track.setAttribute('data-state', this.movementInfo.moving ? 'sliding' : '');

    this.movementInfo.deltaX = mouseX - this.movementInfo.startX;
    const boundingRect = this.track.getBoundingClientRect();
    const start = boundingRect.left;
    const end = boundingRect.right;
    const positionRaw = mouseX - start;
    const position = positionRaw < 0 ? 0 : positionRaw > (end - start) ? (end - start) : positionRaw;
    const percentage = position / (end - start);
    this.percentage = percentage;
    this.track.style.setProperty('--percentage', percentage);
  }

  resetMovementInfo() {
    this.movementInfo = {
      moving: false,
      xStart: null,
      deltaX: null,
      startingPercent: null,
    };
  }

  get percentage() {
    return this._percentage;
  }
  set percentage(value) {
    this._percentage = value;
    this.track.style.setProperty('--percentage', value);
  }
  get value() {
    return this.percentage * (this.maxVal - this.minVal) + this.minVal;
  }
}
