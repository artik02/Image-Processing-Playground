
const languages = ['en', 'es'];

const language_map = {
  'en': {
    'playgroundTitle': 'Image Processing Playground',
    'fileSelector': 'Select an image',

    'lblSource': 'Image',
    'lblPreview': 'Preview',

    'btnRestore': 'Restore image',
    'btnRestorePrev': 'Restore preview',
    'btnApply': 'Apply changes',
    'btnSave': 'Save image',

    'btnHistogram': 'Show histogram',
    'lblHistogram': 'Histogram columns:',

    'btnUniform': 'Uniform equalization',
    'btnHyperbolic': 'Hyperbolic equalization',
    'btnLogarithmic': 'Hyperbolic logarithmic equalization',
    'btnExponential': 'Hyperbolic exponential equalization',
    
    'btnRayleigh': 'Rayleigh equalization',
    'lblRayleigh': 'Rayleigh sigma: ',
    'btnGamma': 'Gamma correction',
    'lblGamma': 'Gamma value: ',
    'btnTransform': 'Histogram correction',
    'lblTransform': 'Histogram mode: ',
    
    'btnBinarization': 'Binarization',
    'lblBinarization': 'Binarization threshold: ',
    'btnChannel': 'Channel binarization',
    'lblChannel': 'Channel threshold: ',
    'btnSobel': 'Sobel filter',
    'lblSobel': 'Sobel threshold: ',
    'btnPrewitt': 'Prewitt filter',
    'lblPrewitt': 'Prewitt threshold: ',
    'btnRoberts': 'Roberts filter',
    'lblRoberts': 'Roberts threshold: ',
    'btnLaplacian': 'Laplacian filter',
    'lblLaplacian': 'Laplacian threshold: ',
    'btnLaplacianNegative': 'Negative Laplacian filter',
    'lblLaplacianNegative': 'Negative Laplacian threshold: ',
    'btnKirsch': 'Kirsch filter',
    'lblKirsch': 'Kirsch threshold: ',
    'btnRobinson': 'Robinson filter',
    'lblRobinson': 'Robinson threshold: ',

    'btnMedian': 'Median filter',
    'lblMedian': 'Median kernel: ',
    'btnMode': 'Mode filter',
    'lblMode': 'Mode kernel: ',
    'btnMaximum': 'Maximum filter',
    'lblMaximum': 'Maximum kernel: ',
    'btnMinimum': 'Minimum filter',
    'lblMinimum': 'Minimum kernel: ',
    'btnAverage': 'Average filter',
    'lblAverage': 'Average kernel: ',
    'btnHeavy': 'Heavy average filter',
    'lblHeavy': 'Heavy average kernel: ',
    'btnGaussian': 'Gaussian filter',
    'lblGaussian': 'Gaussian kernel: ',
    'lblGaussianSigma': 'Gaussian sigma: ',
  },
  'es': {
    'playgroundTitle': 'Patio de Juegos de Procesamiento de Imágenes',
    'fileSelector': 'Elige una imagen',
    
    'lblSource': 'Imagen',
    'lblPreview': 'Previsualización',

    'btnRestore': 'Restaurar imagen',
    'btnRestorePrev': 'Restaurar previsualización',
    'btnApply': 'Aplicar cambios',
    'btnSave': 'Guardar imagen',
    
    'btnHistogram': 'Mostrar histograma',
    'lblHistogram': 'Columnas del histograma: ',
    
    'btnUniform': 'Ecualización uniforme',
    'btnHyperbolic': 'Ecualización hiperbólica',
    'btnLogarithmic': 'Ecualización logaritmo hiperbólico',
    'btnExponential': 'Ecualización exponencial',
    
    'btnRayleigh': 'Ecualización Rayleigh',
    'lblRayleigh': 'Sigam de Rayleigh: ',
    'btnGamma': 'Corrección Gamma',
    'lblGamma': 'Valor Gamma: ',
    'btnTransform': 'Corrección del histograma',
    'lblTransform': 'Modo de corrección: ',
    
    'btnBinarization': 'Binarización',
    'lblBinarization': 'Umbral de binarización: ',
    'btnChannel': 'Binarización de canal',
    'lblChannel': 'Umbral del canal: ',
    'btnSobel': 'Filtro de Sobel',
    'lblSobel': 'Umbral de Sobel: ',
    'btnPrewitt': 'Filtro de Prewitt',
    'lblPrewitt': 'Umbral de Prewitt: ',
    'btnRoberts': 'Filtro de Roberts',
    'lblRoberts': 'Umbral de Roberts: ',
    'btnLaplacian': 'Filtro Laplaciano',
    'lblLaplacian': 'Umbral Laplaciano: ',
    'btnLaplacianNegative': 'Filtro Laplaciano negativo',
    'lblLaplacianNegative': 'Umbral Laplaciano negativo: ',
    'btnKirsch': 'Filtro Kirsch',
    'lblKirsch': 'Umbral de Kirsch: ',
    'btnRobinson': 'Filtro de Robinson',
    'lblRobinson': 'Umbral de Robinson: ',
    
    'btnMedian': 'Filtro mediana',
    'lblMedian': 'Kernel mediana: ',
    'btnMode': 'Filtro moda',
    'lblMode': 'Kernel moda: ',
    'btnMaximum': 'Filtro máximo',
    'lblMaximum': 'Kernel máximo: ',
    'btnMinimum': 'Filtro mínimo',
    'lblMinimum': 'Kernel mínimo: ',
    'btnAverage': 'Filtro promedio',
    'lblAverage': 'Kernel promedio: ',
    'btnHeavy': 'Filtro promedio pesado',
    'lblHeavy': 'Kernel promedio pesado: ',
    'btnGaussian': 'Filtro gausiano',
    'lblGaussian': 'Kernel gausiano: ',
    'lblGaussianSigma': 'Sigma gausiano: ',
  },
};

function getText(key) {
  initial = language_map[languages[language]][key];
  return initial ? initial : language_map['en'][key] ;
}