const sectionFramePixels = document.createElement('section');
sectionFramePixels.id = 'pixel-board';
const body = document.querySelector('body');
const footer = document.querySelector('footer');
body.insertBefore(sectionFramePixels, footer);
const colors = document.querySelectorAll('.color');
const pixel = document.getElementsByClassName('pixel');
const divInsertBar = document.getElementById('insert-bar');
const buttonBoard = document.getElementById('generate-board');
const input = document.getElementById('board-size');

// for para colorir a paleta de cores

const colorData = [
  { name: 'Federal blue', backgroundColor: 'rgb(3, 4, 94)', className: 'Federal-blue' },
  { name: 'Marian blue', backgroundColor: 'rgb(2, 62, 138)', className: 'Marian-blue' },
  { name: 'Honolulu Blue', backgroundColor: 'rgb(0, 119, 182)', className: 'Honolulu-Blue' },
];

const defaultBackgroundColor = 'rgb(0, 150, 199)';
const defaultClassName = 'Blue-Green';

const paletteColor = () => {
  for (let index = 0; index < colors.length; index += 1) {
    const colorName = colors[index].innerHTML;
    const colorInfo = colorData.find((color) => color.name === colorName);

    colors[index].style.backgroundColor = colorInfo
      ? colorInfo.backgroundColor
      : defaultBackgroundColor;

    colors[index].classList.add(colorInfo ? colorInfo.className : defaultClassName);
    colors[index].classList.remove(defaultClassName);
  }
};
paletteColor();

const divLinePixel = [];
const newDivLinePixel = [];
const delimitFrameLine = 5;

const delimitArrayFrame = (delimitLine) => {
  for (let index = delimitLine; index >= 1; index -= 1) {
    if (delimitLine >= 5) {
      const numberIndex = delimitLine - index + 1;
      divLinePixel.push(numberIndex);
    }
  }
};
delimitArrayFrame(delimitFrameLine);
// cria o quadro para as linhas e colunas dos pixels.
const row = document.getElementsByClassName('row');
const frameLine = (array) => {
  for (let index = 0; index < array.length; index += 1) {
    const line = document.createElement('div');
    line.className = 'row';
    line.style.maxHeight = '40px';
    sectionFramePixels.appendChild(line);
    for (let indexColumn = 0; indexColumn < array.length; indexColumn += 1) {
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
frameLine(divLinePixel);
// Cria uma função para salvar o desenho atual no localStorage
const saveDrawingToLocalStorage = () => {
  const drawingData = [];
  const pixelStorage = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixelStorage.length; index += 1) {
    const pixelColor = window.getComputedStyle(pixelStorage[index]).backgroundColor;
    drawingData.push(pixelColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(drawingData));
};
// Cria uma função para rescuperar o desenho no localStorage
const recoverDrawingFromLocalStorage = () => {
  const drawingData = JSON.parse(localStorage.getItem('pixelBoard'));
  if (drawingData) {
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = drawingData[index];
    }
  }
};
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
const pixelSelect = () => {
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].addEventListener('click', () => {
      const pixelSelected = pixel[index];
      paintPixel(pixelSelected);
      // chama a função para salvar as cores nos pixels clicados
      saveDrawingToLocalStorage();
    });
  }
};
pixelSelect();
// limpa o quadro preenchendo a cor de todos seus pixels com branco
const button = document.createElement('button');
button.id = 'clear-board';
button.innerText = 'Limpar';
divInsertBar.appendChild(button);

button.addEventListener('click', () => {
  for (let index = 0; index < pixel.length; index += 1) {
    const resetPixel = pixel[index];
    resetPixel.style.backgroundColor = 'white';
    localStorage.clear();
  }
});
// Adicione um botão para gerar cores aleatórias para a paleta de cores
const buttonColors = document.createElement('button');
buttonColors.id = 'button-random-color';
buttonColors.innerText = 'Cores aleatórias';
divInsertBar.insertBefore(buttonColors, button);

const randomColors = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

buttonColors.addEventListener('click', () => {
  for (let index = 0; index < colors.length; index += 1) {
    const randomColor = colors[index];
    randomColor.style.backgroundColor = randomColors();
  }
});

const clearBoard = () => {
  sectionFramePixels.innerHTML = '';
  divLinePixel.length = 0;
  newDivLinePixel.length = 0;
};
// Crie uma função para gerar o quadro com o novo tamanho
const generateBoard = (size) => {
  let countSize = size;
  if (countSize < 5) {
    countSize = 5;
  } else if (countSize > 50) {
    countSize = 50;
  }
  for (let index = countSize; index >= 1; index -= 1) {
    const numberIndex = countSize - index + 1;
    newDivLinePixel.push(numberIndex);
  }
  frameLine(newDivLinePixel);
  pixelSelect();
  localStorage.setItem('boardSize', countSize);
};
// Recuperar o tamanho do board armazenado no localStorage
const getBoardSizeFromLocalStorage = () => {
  const boardSize = JSON.parse(localStorage.getItem('boardSize'));
  return boardSize || 5; // Valor padrão 5 caso não exista no localStorage
};
// Adicione um ouvinte de eventos para o botão "VQV"
buttonBoard.addEventListener('click', (event) => {
  event.preventDefault();
  clearBoard();
  localStorage.removeItem('pixelBoard');
  const inputValue = input.value;

  if (inputValue === '') {
    window.alert('Board inválido!');
  }
  generateBoard(inputValue);

  input.value = '';
});

// Função para manter o tamanho do board ao recarregar a página
const keepBoardSizeOnReload = () => {
  const boardSize = getBoardSizeFromLocalStorage();
  // input.value = boardSize;
  clearBoard();
  generateBoard(boardSize);
  recoverDrawingFromLocalStorage();
};

// para recuperar localStorage assim que a pagina for carregada.

window.addEventListener('load', () => {
  recoverDrawingFromLocalStorage();
  keepBoardSizeOnReload();
});
