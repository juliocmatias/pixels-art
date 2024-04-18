const path = require('path');

module.exports = {
  mode: 'development',
  entry: './script.js', // Caminho para o seu arquivo JavaScript principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Pasta de saída (será criada automaticamente)
    filename: 'bundle.js', // Nome do arquivo de saída
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 3000, // Ou qualquer porta que desejar
  },
};
