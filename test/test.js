var HSL = require('../lib/hsl.js');
var RGB = require('../lib/rgb.js');

var c_hue = HSL.getUnifiedColors('hue', 180, 2);
var c_satution = HSL.getUnifiedColors('satuation', 0.3, 2);
var c_lightness = HSL.getUnifiedColors('lightness', 0.5, 2);


console.log(...c_hue);
console.log(c_hue.map(rgb => {
  return rgb.toHSL();
}))
console.log(...c_satution);
console.log(c_satution.map(rgb => {
  return rgb.toHSL();
}));
console.log(...c_lightness);
console.log(c_lightness.map(rgb => {
  return rgb.toHSL();
}));
