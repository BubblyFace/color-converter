class RGB {
  constructor(...args) {
    let [red, green, blue, opacity] = args;

    this._red = red || 360 * Math.random();
    this._green = green || Math.random();
    this._blue = blue || Math.random();
    this._opacity = opacity || 1;
  }

  toHSL() {
    if(this._hsl) {
      return this._hsl;
    }
    let h = this.hue,
        s = this.saturation, 
        l = this.lightness;

    let HSL = require('./hsl.js');
    this._hsl = new HSL(h, s, l, this._opacity)
    return this._hsl;
  }

  get red() {
    return this._red
  } 

  get green() {
    return this._green
  } 

  get blue() {
    return this._blue
  } 

  get hue() {
    return RGB.getHue(this._red / 255, this._green / 255, this._blue / 255);
  }

  get saturation() {
    return RGB.getSaturation(this._red / 255, this._green / 255, this._blue / 255);
  }

  get lightness() {
    return RGB.getLightness(this._red / 255, this._green / 255, this._blue / 255);
  }
}

RGB.getHue = (r, g, b) => {
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  if(max === min) {
    return 0;
  }

  if(max === r) {
    let hue;
    if(g >= b) {
      hue = 60 * (g - b) / (max - min) || 0;
    } else {
      hue = 60 * ((g - b) / (max - min)) + 360 || 0;
    }
    return hue
  }

  if(max === g) {
    return 60 * (b - r) / (max - min) + 120;
  }

  if( max === b ) {
   return  60 * (r - g) / (max - min) + 240;
  }

};

RGB.getSaturation = (r, g, b) => {
  let l = RGB.getLightness(r, g, b);
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  
  if(l === 0 || max === min) {
    return 0
  }

  if(l > 0 && l <= 0.5) {
    return (max - min) / (2 * l)
  }

  if(l > 0.5) {
    return (max - min) / (2 - 2 * l)
  }
};

RGB.getLightness = (r, g, b) => {
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  return (max + min) / 2;
}

module.exports = RGB;