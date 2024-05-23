
# Image Processing Playground

Welcome to the Image Processing Playground! This web application allows users to upload an image and apply various image processing techniques using OpenCV.js. The application supports grayscale conversion, gamma correction, minimum filter application, and binarization. It is designed to be simple and intuitive for users of all skill levels.

## Access the Application

The application is available online at [Image Processing Playground](https://artik02.github.io/Image-Processing-Playground).

## Features

- **Image Upload**: Upload any image file for processing.
- **Grayscale Conversion**: Convert the uploaded image to grayscale.
- **Gamma Correction**: Adjust the gamma level of the image.
- **Minimum Filter**: Apply a minimum filter to the image.
- **Binarization**: Apply a binarization threshold to the image.
- **Responsive Design**: Adjusts to different screen sizes for optimal viewing.

## How to Use

1. **Upload an Image**: Click on the "Select an image" button to upload an image file.
2. **Apply Processing**: Use the toolbox to apply different image processing techniques:
    - **Restore the Image**: Reverts the image to its original state.
    - **Apply Grayscale**: Converts the image to grayscale.
    - **Apply Minimum Filter**: Applies a minimum filter to the image.
    - **Gamma Correction**: Adjust the gamma level using the provided slider.
    - **Binarization**: Adjust the binarization threshold using the provided slider.
3. **Responsive Adjustments**: The application will automatically adjust the canvas size to fit the screen.

## Dependencies

- **OpenCV.js**: Used for image processing operations.
- **Yotta.js**: Used for creating HTML elements and managing the UI.

## Languages Supported

- **Spanish** (default)
- **English** (requires modifying index.html `language` variable)

## Development

### Prerequisites

Ensure you have a modern web browser that supports JavaScript and can load external libraries.

### Installation

Clone the repository and open `index.html` in your web browser.

```bash
git clone https://github.com/artik02/Image-Processing-Playground.git
cd Image-Processing-Playground
open index.html
```

### Folder Structure

- `index.html`: The main HTML file containing the application structure.
- `style.css`: The stylesheet for styling the application.
- `language.js`: Contains language support for the application.
- `image-processing.js`: Contains functions for image processing using OpenCV.js.

## Acknowledgments

- OpenCV for providing a powerful library for computer vision tasks.
- Yotta.js for simplifying HTML element creation and manipulation.

Enjoy exploring and experimenting with different image processing techniques!
