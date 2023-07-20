const sectionFramePixels = document.createElement('section');
sectionFramePixels.id = 'pixel-board';
const body = document.querySelector('body');
const footer = document.querySelector('footer');
body.insertBefore(sectionFramePixels, footer);
const row = document.getElementsByClassName('row');
// const colors = document.getElementsByClassName('color');
const colors = document.querySelectorAll('.color');
const pixel = document.getElementsByClassName('pixel');

// for para colorir a paleta de cores

const paletteColor = () => {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].style.backgroundColor = 'rgb(0, 150, 199)';
    // eslint-disable-next-line sonarjs/no-duplicate-string
    colors[index].classList.add('Blue-Green');
    if (colors[index].innerHTML === 'Federal blue') {
      colors[index].style.backgroundColor = 'rgb(3, 4, 94)';
      colors[index].classList.add('Federal-blue');
      colors[index].classList.remove('Blue-Green');
    } else if (colors[index].innerHTML === 'Marian blue') {
      colors[index].style.backgroundColor = 'rgb(2, 62, 138)';
      colors[index].classList.add('Marian-blue');
      colors[index].classList.remove('Blue-Green');
    } else if (colors[index].innerHTML === 'Honolulu Blue') {
      colors[index].style.backgroundColor = 'rgb(0, 119, 182)';
      colors[index].classList.add('Honolulu-Blue');
      colors[index].classList.remove('Blue-Green');
    }
  }
};

paletteColor();

const divLinePixel = [];

// for para delimitar o tamanho do array divframePixel
const delimitFrameLine = 5;

const delimitArrayFrame = () => {
  for (let index = delimitFrameLine; index >= 1; index -= 1) {
    if (delimitFrameLine >= 5 && delimitFrameLine <= 30) {
      const numberIndex = delimitFrameLine - index + 1;
      divLinePixel.push(numberIndex);
    }
  }
  if (delimitFrameLine < 5) {
    return window.alert('A linha e coluna do pixel deve conter no mínimo 5 elementos');
  }
};

delimitArrayFrame();

// cria o quadro para as linhas e colunas dos pixels.

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

// selecionar a cor da paleta

let saveClickedColor = '';
const getColor = (colorElement) => {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].classList.remove('selected');
  }

  const clickedColor = colorElement;
  clickedColor.classList.add('selected');
  const saveColor = window.getComputedStyle(clickedColor).backgroundColor;
  saveClickedColor = saveColor;
};
const selectColor = () => {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].addEventListener('click', () => {
      const colorElemnt = colors[index];
      getColor(colorElemnt);
    });
  }
};

selectColor();

// preencher um pixel do quadro com a cor selecionada

const paintPixel = (pixelSelected) => {
  if (!saveClickedColor) return;
  const pixelClicked = pixelSelected;
  pixelClicked.style.backgroundColor = saveClickedColor;
};

for (let index = 0; index < pixel.length; index += 1) {
  pixel[index].addEventListener('click', () => {
    const pixelSelected = pixel[index];
    paintPixel(pixelSelected);
  });
}
