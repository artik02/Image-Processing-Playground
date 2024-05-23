
const language_map = {
  'en': {
    'fileHeader': 'Select an image',
    'openCVHeader': 'OpenCV.js is loading...',
    'btnRestore': 'Restore the Image',
    'btnGrayscale': 'Apply Grayscale',
    'btnMinimum': 'Apply Minimum Filter',
    'lblGamma': 'Gamma Correction: ',
    'lblGammaSource': 'Gamma Correction Source: ',
    'lblBinarization': 'Binarization Threshold: ',
    'lblBinarizationSource': 'Binarization Source: ',
    'Modified': 'Modified',
    'Original': 'Original',
  },
  'es': {
    'fileHeader': 'Elige una imagen',
    'openCVHeader': 'OpenCV.js esta cargando...',
    'btnRestore': 'Restaurar la imagen',
    'btnGrayscale': 'Aplicar escala de grises',
    'btnMinimum': 'Aplicar filtro mínimo',
    'lblGamma': 'Corrección Gamma: ',
    'lblGammaSource': 'Imagen fuente para Corrección Gamma: ',
    'lblBinarization': 'Umbral para la Binarización: ',
    'lblBinarizationSource': 'Imagen fuente para la Binarización: ',
    'Modified': 'Modificado',
    'Original': 'Original',
  },
};

function getText(key) {
  initial = language_map[language][key];
  return initial ? initial : language_map['en'][key] ;
}