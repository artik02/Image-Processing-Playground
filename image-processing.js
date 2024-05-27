
function gammaCorrection(gamma) {
  if (!imageR) return;
  const wait = setInterval(() => {
    if (openCV) {
      clearInterval(wait);

      let imgData = cnvSource.getContext('2d').getImageData(0, 0, cnvSource.width, cnvSource.height);
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

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function minimumFilter() {
  if (!imageR) return;
  const wait = setInterval(() => {
    if (openCV) {
      clearInterval(wait);

      let imgData = cnvSource.getContext('2d').getImageData(0, 0, cnvSource.width, cnvSource.height);
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

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      resMat.delete();
    }
  }, 100);
}

function robertsFilter(threshold) {
  if (!imageR) return;

  const wait = setInterval(() => {
    if (openCV) {
      clearInterval(wait);

      let imgData = cnvSource.getContext('2d').getImageData(0, 0, cnvSource.width, cnvSource.height);
      let mat = cv.matFromImageData(imgData);

      let grayMat = new cv.Mat();
      cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

      let resMat = new cv.Mat(grayMat.rows, grayMat.cols, cv.CV_8UC1);
      resMat.setTo(new cv.Scalar(0));

      for (let i = 1; i < grayMat.rows - 1; i++) {
        for (let j = 1; j < grayMat.cols - 1; j++) {
          let DIz = grayMat.ucharAt(i, j) - grayMat.ucharAt(i - 1, j - 1);
          let DDe = grayMat.ucharAt(i, j) - grayMat.ucharAt(i - 1, j + 1);

          let MRoberts = Math.sqrt(DIz * DIz + DDe * DDe);

          resMat.ucharPtr(i, j)[0] = MRoberts > threshold ? 255 : 0;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}
