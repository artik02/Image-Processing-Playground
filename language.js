
const languages = ['en', 'es'];

const language_map = {
  'en': {
    'playgroundTitle': 'Image Processing Playground',
    'fileSelector': 'Select an image',
    'openCVHeader': 'OpenCV.js is loading...',
    'btnApply': 'Apply changes',
    'btnRestore': 'Restore image',
    'btnRestorePrev': 'Restore preview',
    'btnGrayscale': 'Apply grayscale',
    'btnMinimum': 'Apply minimum filter',
    'btnGamma': 'Gamma correction',
    'btnRoberts': 'Roberts filter',
    'lblGamma': 'Gamma value: ',
    'lblBinarization': 'Binarization threshold: ',
    'lblSource': 'Image',
    'lblPreview': 'Preview',
    'lblRoberts': 'Roberts threshold',
  },
  'es': {
    'playgroundTitle': 'Patio de Juegos de Procesamiento de Imágenes',
    'fileSelector': 'Elige una imagen',
    'openCVHeader': 'OpenCV.js esta cargando...',
    'btnRestore': 'Restaurar imagen',
    'btnRestorePrev': 'Restaurar previsualización',
    'btnApply': 'Aplicar cambios',
    'btnGrayscale': 'Aplicar escala de grises',
    'btnMinimum': 'Aplicar filtro mínimo',
    'btnRoberts': 'Filtro de Roberts',
    'btnGamma': 'Correción Gamma',
    'lblGamma': 'Valor Gamma: ',
    'lblBinarization': 'Umbral para la binarización: ',
    'lblSource': 'Imagen',
    'lblPreview': 'Previsualización',
    'lblRoberts': 'Umbral de Roberts: ',
  },
};

function getText(key) {
  initial = language_map[languages[language]][key];
  return initial ? initial : language_map['en'][key] ;
}