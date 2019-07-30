var HSL = require('../lib/hsl.js');
var RGB = require('../lib/rgb.js');

var c_hue = HSL.getUnifiedColors('hue', 180, 10);
var c_satution = HSL.getUnifiedColors('satuation', 0.3, 10);
var c_lightness = HSL.getUnifiedColors('lightness', 0.5, 10);

let dom = document.getElementById('random-color-box-container');
let hueDomContainer = document.createElement('div');
hueDomContainer.id = 'hue-dom-container';
let satutionDomContainer = document.createElement('div');
satutionDomContainer.id = 'satution-dom-container';
let lightnessDomContainer = document.createElement('div');
lightnessDomContainer.id = 'lightness-dom-container';

c_hue.forEach(RGB => {
  let colorBlock = document.createElement('div');
  console.log(RGB)
  let color = `rgb(${RGB.red}, ${RGB.green}, ${RGB.blue})`;
  colorBlock.style.backgroundColor = color;
  colorBlock.className = 'hue color-block';
  hueDomContainer.appendChild(colorBlock)
});

c_satution.forEach(RGB => {
  let colorBlock = document.createElement('div');
  let color = `rgb(${RGB.red}, ${RGB.green}, ${RGB.blue})`;
  colorBlock.style.backgroundColor = color;
  colorBlock.className = 'hue color-block';
  satutionDomContainer.appendChild(colorBlock)
});

c_lightness.forEach(RGB => {
  let colorBlock = document.createElement('div');
  let color = `rgb(${RGB.red}, ${RGB.green}, ${RGB.blue})`;
  colorBlock.style.backgroundColor = color;
  colorBlock.className = 'hue color-block';
  lightnessDomContainer.appendChild(colorBlock)
});

dom.appendChild(hueDomContainer);
dom.appendChild(satutionDomContainer);
dom.appendChild(lightnessDomContainer);