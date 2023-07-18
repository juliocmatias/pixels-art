const sectionFramePixels = document.createElement('section');
sectionFramePixels.id = 'pixel-board';
const body = document.querySelector('body');
const footer = document.querySelector('footer');
body.insertBefore(sectionFramePixels, footer);
const row = document.getElementsByClassName('row');

const divLinePixel = [];

// for para delimitar o tamanho do array divframePixel
const delimitFrameLine = 5;
const delimitArrayFrame = () => {
  for (let index = delimitFrameLine; index >= 1; index -= 1) {
    if (delimitFrameLine >= 5) {
      const numberIndex = delimitFrameLine - index + 1;
      divLinePixel.push(numberIndex);
    }
  }
  if (delimitFrameLine < 5) {
    return window.alert('A linha e coluna do pixel deve conter no mínimo 5 elementos');
  }
};

delimitArrayFrame();

// cria as linhas dos pixels

const frameLine = () => {
  for (let index = 0; index < divLinePixel.length; index += 1) {
    const line = document.createElement('div');
    line.className = 'row';
    line.style.maxHeight = '40px';
    line.style.margin = '1px';
    sectionFramePixels.appendChild(line);
    for (let indexColumn = 0; indexColumn < divLinePixel.length; indexColumn += 1) {
      const pixelColumn = document.createElement('div');
      pixelColumn.className = 'pixel';
      pixelColumn.style.border = '1px solid black';
      pixelColumn.style.width = '40px';
      pixelColumn.style.height = '40px';
      pixelColumn.style.backgroundColor = 'white';
      pixelColumn.style.display = 'inline-block';
      row[index].appendChild(pixelColumn);
    }
  }
};
frameLine();
