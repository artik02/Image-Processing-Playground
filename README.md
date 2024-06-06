# Patio de Procesamiento de Imágenes

¡Bienvenido al Patio de Procesamiento de Imágenes! Esta aplicación web permite a los usuarios cargar una imagen y aplicar varias técnicas de procesamiento de imágenes utilizando OpenCV.js. La aplicación admite la conversión a escala de grises, la corrección gamma, la aplicación de filtro mínimo y la binarización. Está diseñada para ser simple e intuitiva para usuarios de todos los niveles de habilidad.

## Accede a la Aplicación

La aplicación está disponible en línea en [Patio de Procesamiento de Imágenes](https://artik02.github.io/Image-Processing-Playground).

## Características

- **Carga de Imágenes**: Carga cualquier archivo de imagen para su procesamiento.
- **Conversión a Escala de Grises**: Convierte la imagen cargada a escala de grises.
- **Corrección Gamma**: Ajusta el nivel gamma de la imagen.
- **Filtro Mínimo**: Aplica un filtro mínimo a la imagen.
- **Binarización**: Aplica un umbral de binarización a la imagen.
- **Diseño Responsivo**: Se ajusta a diferentes tamaños de pantalla para una visualización óptima.

## Cómo Usar

1. **Carga una Imagen**: Haz clic en el botón "Seleccionar una imagen" para cargar un archivo de imagen.
2. **Aplica Procesamiento**: Usa la caja de herramientas para aplicar diferentes técnicas de procesamiento de imágenes:
    - **Restaurar la Imagen**: Revierte la imagen a su estado original.
    - **Aplicar Escala de Grises**: Convierte la imagen a escala de grises.
    - **Aplicar Filtro Mínimo**: Aplica un filtro mínimo a la imagen.
    - **Corrección Gamma**: Ajusta el nivel gamma usando el control deslizante proporcionado.
    - **Binarización**: Ajusta el umbral de binarización usando el control deslizante proporcionado.
3. **Ajustes Responsivos**: La aplicación ajustará automáticamente el tamaño del lienzo para que se adapte a la pantalla.

## Dependencias

- **OpenCV.js**: Se utiliza para operaciones de procesamiento de imágenes.
- **Yotta.js**: Se utiliza para crear elementos HTML y gestionar la interfaz de usuario.

## Idiomas Soportados

- **Español** (predeterminado)
- **Inglés** (requiere modificar la variable `language` en language.js)

## Desarrollo

### Requisitos Previos

Asegúrate de tener un navegador web moderno que admita JavaScript y pueda cargar bibliotecas externas.

### Instalación

Clona el repositorio y abre `index.html` en tu navegador web.

```bash
git clone https://github.com/artik02/Image-Processing-Playground.git
cd Image-Processing-Playground
open index.html
```

### Estructura de Carpetas

- `index.html`: El archivo HTML principal que contiene la estructura de la aplicación.
- `style.css`: La hoja de estilo para el estilo de la aplicación.
- `language.js`: Contiene soporte de idiomas para la aplicación.
- `image-processing.js`: Contiene funciones para el procesamiento de imágenes usando OpenCV.js.

## Reconocimientos

- OpenCV por proporcionar una biblioteca potente para tareas de visión por computadora.
- Yotta.js por simplificar la creación y manipulación de elementos HTML.

¡Disfruta explorando y experimentando con diferentes técnicas de procesamiento de imágenes!
