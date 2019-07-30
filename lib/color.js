/** 
 * @author: shwbubbly 
 * @since: 2019-07-30 16:09:51  
 */

class Color {
  constructor(value, type) {
    if (type = 'hsl') {
      this._type = type;
      this._hsl = new HSL(...value);
    } else if (type = 'rgb') {
      this._rgb = new RGB(...value);
    } else {
      throw new Error('Error Type')
    }
  }

  get hsl() {
    if(this._hsl) {
      return this._hsl
    }
    else if(this._rgb) {
      let [r, g, b, a] = [this._rgb.red, this._rgb.green, this._rgb.blue, this._rgb.opacity];
      this.hsl = Color.toHSL(r, g, b, a)
      return this.hsl
    } 
    else {
      throw new Error('Color')
    }
  }

  get rgb() {
    if(this._rgb) {
      return this._rgb
    }
    else if(this._hsl) {
      let [h, s, l, a] = [this._hsl.hue, this._hsl.saturation, this._hsl.lightness, this._hsl.opacity]
      this.rgb = Color.toRGB(h, s, l, a)
      return this.rgb
    } 
    else {
      throw new Error('Color')
    }
  }
}

Color.toRGB = (h, s, l, a) => {
  let r, g, b;
  let q, p;

  // satuation is zero. then r, g, b all should equals lightness in value areas [0,1];
  if (s === 0) {
    r = g = b = l;
    return new RGB(r * 255, g * 255, b * 255);
  }

  if (l >= 0.5) {
    q = l + s - (l * s);
  } else {
    q = l * (1 + s);
  }

  p = 2 * l - q;

  r = h + 1 / 3;
  g = h;
  b = h - 1 / 3;

  [r, g, b] = [r, g, b].map(c => {
    c > 1 && (c = c - 1);
    c < 0 && (c = c + 1);

    if (c < 1 / 6) {
      c = p + ((q - p) * 6 * c);
    } else if (c >= 1 / 6 && c < 1 / 2) {
      c = q;
    } else if (c >= 1 / 2 && c < 2 / 3) {
      c = p + ((q - p) * 6 * (2 / 3 - c));
    } else {
      c = p;
    }

    return c
  })

  return new RGB(parseInt(r * 255), parseInt(g * 255), parseInt(b * 255), a);
}


Color.toHSL = (r, g, b, a) => {
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h, s, l;

  l = (max + min) / 2;


  // satuation 
  if (l === 0 || max === min) {
    s = 0
  }

  if (l > 0 && l <= 0.5) {
    s = (max - min) / (2 * l)
  }

  if (l > 0.5) {
    s = (max - min) / (2 - 2 * l)
  }

  // hue
  if (max === min) {
    h = 0;
  }

  if (max === r) {
    if (g >= b) {
      h = 60 * (g - b) / (max - min) || 0;
    } else {
      h = 60 * ((g - b) / (max - min)) + 360 || 0;
    }
  }

  if (max === g) {
    h = 60 * (b - r) / (max - min) + 120;
  }

  if (max === b) {
    h = 60 * (r - g) / (max - min) + 240;
  }

  return new HSL(h, s, l, a);
};


Color.getUnifiedColors = (type, value, number) => {
  let h, s, l;
  switch (type) {
    case 'hue':
      h = value;
      break;
    case 'satuation':
      s = value;
      break;
    case 'lightness':
      l = value;
      break;
    default:
      l = value;
      break;
  }

  number = Number(number) || 1;

  let colorsArray = [];
  for (let i = 0; i < number; i++) {
    colorsArray.push(Color.toRGB(h, s, l));
  }

  return colorsArray
}


class RGB {
  constructor(...args) {
    let [red, green, blue, opacity] = args;

    this._red = red || 255 * Math.random();
    this._green = green || 255 * Math.random();
    this._blue = blue || 255 * Math.random();
    this._opacity = opacity || 1;
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

  get opacity () {
    return this._opacity;
  }
}

class HSL {
  constructor(...args) {
    let [hue, saturation, lightness, opacity] = args;

    this._hue = isNaN(Number(hue)) ?  360 * Math.random() : Number(hue);
    this._satuation = isNaN(Number(saturation)) ? Math.random() :  Number(saturation);
    this._lightness = isNaN(Number(lightness)) ?  Math.random(): Number(lightness);
    this._opacity = opacity || 1;

  }
  get opacity () {
    return this._opacity;
  }

  get hue() {
    return this._hue
  }

  get saturation() {
    return this._satuation
  }

  get lightness() {
    return this._lightness
  }
}

module.exports = Color