
function grayscaleImage() {
  let imgData = resCanvas.getContext('2d').getImageData(0, 0, resCanvas.width, resCanvas.height);
  let mat = cv.matFromImageData(imgData);

  let grayMat = new cv.Mat();
  cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

  cv.imshow('responsiveCanvas', grayMat);

  mat.delete();
  grayMat.delete();
}

function gammaCorrectionImage(gamma) {
  if (srcGammaSource.checked == false) setOriginalImage();

  let imgData = resCanvas.getContext('2d').getImageData(0, 0, resCanvas.width, resCanvas.height);
  let mat = cv.matFromImageData(imgData);

  let grayMat = new cv.Mat();
  cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

  let resMat = new cv.Mat(grayMat.rows, grayMat.cols, grayMat.type());
  for (let i = 0; i < grayMat.rows; i++) {
    for (let j = 0; j < grayMat.cols; j++) {
      let pixel = grayMat.ucharAt(i, j);
      let resPixel = 255 * Math.pow(pixel / 255, gamma);
      resMat.ucharPtr(i, j)[0] = resPixel;
    }
  }

  cv.imshow('responsiveCanvas', resMat);

  mat.delete();
  grayMat.delete();
  resMat.delete();
}

function binarizationImage(threshold) {
  if (srcBinarizationSource.checked == false) setOriginalImage();

  let imgData = resCanvas.getContext('2d').getImageData(0, 0, resCanvas.width, resCanvas.height);
  let mat = cv.matFromImageData(imgData);

  let grayMat = new cv.Mat();
  cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

  let resMat = new cv.Mat(grayMat.rows, grayMat.cols, grayMat.type());
  for (let i = 0; i < grayMat.rows; i++) {
    for (let j = 0; j < grayMat.cols; j++) {
      let pixel = grayMat.ucharAt(i, j);
      let resPixel = (pixel <= threshold) ? 0 : 255;
      resMat.ucharPtr(i, j)[0] = resPixel;
    }
  }

  cv.imshow('responsiveCanvas', resMat);

  mat.delete();
  grayMat.delete();
  resMat.delete();
}

function minimumFilterImage() {
  //if (srcBinarizationSource.checked == false) setOriginalImage();

  let imgData = resCanvas.getContext('2d').getImageData(0, 0, resCanvas.width, resCanvas.height);
  let mat = cv.matFromImageData(imgData);

  let grayMat = new cv.Mat();
  cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

  let resMat = new cv.Mat(grayMat.rows, grayMat.cols, grayMat.type());

  for (let i = 0; i < grayMat.rows; i++) {
    for (let j = 0; j < grayMat.cols; j++) {
      let mp = grayMat.ucharAt(i, j);

      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          let ni = i + k;
          let nj = j + l;

          if (ni >= 0 && ni < grayMat.rows && nj >= 0 && nj < grayMat.cols) {
            let p = grayMat.ucharAt(ni, nj);
            if (p < mp) mp = p;
          }
        }
      }

      resMat.ucharPtr(i, j)[0] = mp;
    }
  }

  cv.imshow('responsiveCanvas', resMat);

  mat.delete();
  resMat.delete();
}
