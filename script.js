const sectionFramePixels = document.createElement('section');
sectionFramePixels.id = 'pixel-board';
const body = document.querySelector('body');
const footer = document.querySelector('footer');
body.insertBefore(sectionFramePixels, footer);
const row = document.getElementsByClassName('row');
// const colors = document.getElementsByClassName('color');
const colors = document.querySelectorAll('.color');
const pixel = document.getElementsByClassName('pixel');

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
// let saveClickedColor = null;
const getColor = (event) => {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].classList.remove('selected');
  }

  const clickedColor = event.target;
  clickedColor.classList.add('selected');
  // saveClickedColor = clickedColor.style.backgroundColor;
  // console.log(saveClickedColor);
};

const selectColor = () => {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].addEventListener('click', getColor);
  }
};

selectColor();

// preencher um pixel do quadro com a cor selecionada

for (let index = 0; index < pixel.length; index += 1) {
  pixel[index].addEventListener('click', (event) => {
    const saveColor = document.querySelector('.selected');
    const eventTarget = event.target;
    const colorSave = saveColor.style.backgroundColor;
    console.log(colorSave);
    if (saveColor) {
      eventTarget.style.backgroundColor = colorSave;
    }
  });
}
