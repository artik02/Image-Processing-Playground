
/* Helper functions */

function histogram(no_col) {
  if (!imageR) return;
  const wait = setInterval(() => {
    if (openCV) {
      clearInterval(wait);

      let imgData = cnvPreview.getContext('2d').getImageData(0, 0, cnvPreview.width, cnvPreview.height);
      let mat = cv.matFromImageData(imgData);

      let grayMat = new cv.Mat();
      cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

      no_col = parseInt(no_col, 10);

      let histogramArray = new Array(no_col).fill(0);

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let pixelValue = grayMat.ucharAt(i, j);
          let binIndex = Math.floor(pixelValue / (256 / no_col));
          histogramArray[binIndex]++;
        }
      }

      let max_val = Math.max(...histogramArray);

      let w = cnvHistogram.width;
      let h = cnvHistogram.height;
      let c = cnvHistogram.getContext('2d');

      c.clearRect(0, 0, w, h);

      c.fillStyle = 'purple';

      let dx = w / no_col;

      let pad = 1;

      for (let i = 0; i < no_col; i++) {
        let col = histogramArray[i];
        let barHeight = col / max_val * (h - pad);
        c.fillRect(i * dx + pad, h - pad - barHeight, dx - pad, barHeight);
      }

      mat.delete();
      grayMat.delete();
    }
  }, 100);
}

/* No value functions */

function uniformEqualization() {
  if (!imageR) return;

  const wait = setInterval(() => {
    if (openCV) {
      clearInterval(wait);

      let imgData = cnvSource.getContext('2d').getImageData(0, 0, cnvSource.width, cnvSource.height);
      let mat = cv.matFromImageData(imgData);

      let grayMat = new cv.Mat();
      cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

      let totalPixels = grayMat.rows * grayMat.cols;
      let histogram = new Array(256).fill(0);

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let pixel = grayMat.ucharAt(i, j);
          histogram[pixel]++;
        }
      }

      let cdf = new Array(256).fill(0);
      cdf[0] = histogram[0];
      for (let i = 1; i < 256; i++) {
        cdf[i] = cdf[i - 1] + histogram[i];
      }

      let cdfMin = cdf.find(value => value !== 0);
      let cdfMax = totalPixels;
      let equalizationMap = new Array(256).fill(0);

      for (let i = 0; i < 256; i++) {
        equalizationMap[i] = Math.round(((cdf[i] - cdfMin) / (cdfMax - cdfMin)) * 255);
      }

      let resMat = new cv.Mat(grayMat.rows, grayMat.cols, cv.CV_8UC1);
      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let pixel = grayMat.ucharAt(i, j);
          resMat.ucharPtr(i, j)[0] = equalizationMap[pixel];
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function hyperbolicEqualization() {
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

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let pixel = grayMat.ucharAt(i, j);
          let newPixel = Math.tanh(pixel / 255.0) * 255;
          resMat.ucharPtr(i, j)[0] = newPixel;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function hyperbolicLogarithmicEqualization() {
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

      const a = 1.0;
      const b = 255 / Math.log(1 + a * 255);

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let pixel = grayMat.ucharAt(i, j);
          let newPixel = b * Math.log(1 + a * pixel);
          resMat.ucharPtr(i, j)[0] = newPixel;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function exponentialEqualization() {
  if (!imageR) return;

  const wait = setInterval(() => {
    if (openCV) {
      clearInterval(wait);

      let imgData = cnvSource.getContext('2d').getImageData(0, 0, cnvSource.width, cnvSource.height);
      let mat = cv.matFromImageData(imgData);

      let grayMat = new cv.Mat();
      cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

      let totalPixels = grayMat.rows * grayMat.cols;
      let histogram = new Array(256).fill(0);

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let pixel = grayMat.ucharAt(i, j);
          histogram[pixel]++;
        }
      }

      let cdf = new Array(256).fill(0);
      cdf[0] = histogram[0];
      for (let i = 1; i < 256; i++) {
        cdf[i] = cdf[i - 1] + histogram[i];
      }

      let cdfMin = cdf.find(value => value !== 0);
      let cdfMax = totalPixels;

      let equalizationMap = new Array(256).fill(0);
      for (let i = 0; i < 256; i++) {
        equalizationMap[i] = Math.round(255 * (Math.exp(cdf[i] - cdfMin) / (cdfMax - cdfMin)));
      }

      let resMat = new cv.Mat(grayMat.rows, grayMat.cols, cv.CV_8UC1);
      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let pixel = grayMat.ucharAt(i, j);
          resMat.ucharPtr(i, j)[0] = equalizationMap[pixel];
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function histogramTransform(operationMode = 1) {
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

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let pixel = grayMat.ucharAt(i, j);
          let newPixel;

          if (operationMode === 1) {
            newPixel = Math.tanh(pixel / 255.0) * 127.5 + 127.5;
          } else {
            newPixel = Math.tanh(pixel / 127.5) * 255.0;
          }

          resMat.ucharPtr(i, j)[0] = newPixel;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

/* Value constrained functions */

function rayleighEqualization(sigma = 5) {
  if (!imageR) return;

  const wait = setInterval(() => {
    if (openCV) {
      clearInterval(wait);

      let imgData = cnvSource.getContext('2d').getImageData(0, 0, cnvSource.width, cnvSource.height);
      let mat = cv.matFromImageData(imgData);

      let grayMat = new cv.Mat();
      cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

      let totalPixels = grayMat.rows * grayMat.cols;

      let histogram = new Array(256).fill(0);
      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let pixel = grayMat.ucharAt(i, j);
          histogram[pixel]++;
        }
      }

      let rayleighCDF = new Array(256).fill(0);
      for (let i = 0; i < 256; i++) {
        let x = i / 255;
        rayleighCDF[i] = 1 - Math.exp(-Math.pow(x * sigma, 2) / 2);
      }

      let cdfMin = rayleighCDF.find(value => value !== 0);
      for (let i = 0; i < 256; i++) {
        rayleighCDF[i] = (rayleighCDF[i] - cdfMin) / (1 - cdfMin);
      }

      let equalizationMap = new Array(256).fill(0);
      for (let i = 0; i < 256; i++) {
        equalizationMap[i] = Math.round(rayleighCDF[i] * 255);
      }

      let resMat = new cv.Mat(grayMat.rows, grayMat.cols, cv.CV_8UC1);
      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let pixel = grayMat.ucharAt(i, j);
          resMat.ucharPtr(i, j)[0] = equalizationMap[pixel];
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

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

/* Threshold filters */

function binarization(threshold) {
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
          let p = grayMat.ucharAt(ni, nj);
          resMat.ucharPtr(i, j)[0] = p > threshold ? 255 : 0;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function sobelFilter(threshold) {
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

      let sobel_x = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
      let sobel_y = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

      for (let i = 1; i < grayMat.rows - 1; i++) {
        for (let j = 1; j < grayMat.cols - 1; j++) {

          let sob_x = 0;
          let sob_y = 0;
          let sob = 0;

          for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
              let ni = i + k;
              let nj = j + l;

              if (ni >= 0 && ni < grayMat.rows && nj >= 0 && nj < grayMat.cols) {
                let p = grayMat.ucharAt(ni, nj);
                sob_x += sobel_x[sob] * p;
                sob_y += sobel_y[sob] * p;
                sob++;
              }
            }
          }

          let MSobel = Math.sqrt(sob_x * sob_x + sob_y * sob_y);

          resMat.ucharPtr(i, j)[0] = MSobel > threshold ? 255 : 0;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function prewittFilter(threshold) {
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

      // Prewitt kernels
      let prewitt_x = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
      let prewitt_y = [-1, -1, -1, 0, 0, 0, 1, 1, 1];

      for (let i = 1; i < grayMat.rows - 1; i++) {
        for (let j = 1; j < grayMat.cols - 1; j++) {

          let pre_x = 0;
          let pre_y = 0;
          let pre = 0;

          for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
              let ni = i + k;
              let nj = j + l;

              if (ni >= 0 && ni < grayMat.rows && nj >= 0 && nj < grayMat.cols) {
                let p = grayMat.ucharAt(ni, nj);
                pre_x += prewitt_x[pre] * p;
                pre_y += prewitt_y[pre] * p;
                pre++;
              }
            }
          }

          let MPrewitt = Math.sqrt(pre_x * pre_x + pre_y * pre_y);

          resMat.ucharPtr(i, j)[0] = MPrewitt > threshold ? 255 : 0;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
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

function laplacianFilter(threshold) {
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

          let laplacian = (
            -1 * grayMat.ucharAt(i - 1, j - 1) +
            -1 * grayMat.ucharAt(i - 1, j) +
            -1 * grayMat.ucharAt(i - 1, j + 1) +
            -1 * grayMat.ucharAt(i, j - 1) +
            8 * grayMat.ucharAt(i, j) +
            -1 * grayMat.ucharAt(i, j + 1) +
            -1 * grayMat.ucharAt(i + 1, j - 1) +
            -1 * grayMat.ucharAt(i + 1, j) +
            -1 * grayMat.ucharAt(i + 1, j + 1)
          );

          let binarized = laplacian > threshold ? 255 : 0;
          resMat.ucharPtr(i, j)[0] = binarized;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function laplacianNegativeFilter(threshold) {
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

          let laplacian = (
            -1 * grayMat.ucharAt(i - 1, j - 1) +
            -1 * grayMat.ucharAt(i - 1, j) +
            -1 * grayMat.ucharAt(i - 1, j + 1) +
            -1 * grayMat.ucharAt(i, j - 1) +
            8 * grayMat.ucharAt(i, j) +
            -1 * grayMat.ucharAt(i, j + 1) +
            -1 * grayMat.ucharAt(i + 1, j - 1) +
            -1 * grayMat.ucharAt(i + 1, j) +
            -1 * grayMat.ucharAt(i + 1, j + 1)
          );

          let negative = 255 - laplacian;
          let binarized = negative > threshold ? 255 : 0;
          resMat.ucharPtr(i, j)[0] = binarized;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function kirschFilter(threshold) {
  if (!imageR) return;

  const kirschMasks = [
    [[-3, -3, 5], [-3, 0, 5], [-3, -3, 5]],
    [[-3, 5, 5], [-3, 0, 5], [-3, -3, -3]],
    [[5, 5, 5], [-3, 0, -3], [-3, -3, -3]],
    [[5, 5, -3], [5, 0, -3], [-3, -3, -3]],
    [[5, -3, -3], [5, 0, -3], [5, -3, -3]],
    [[-3, -3, -3], [5, 0, -3], [5, 5, -3]],
    [[-3, -3, -3], [-3, 0, -3], [5, 5, 5]],
    [[-3, -3, -3], [-3, 0, 5], [-3, 5, 5]]
  ];

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
          let maxResponse = 0;

          for (let maskIdx = 0; maskIdx < kirschMasks.length; maskIdx++) {
            let mask = kirschMasks[maskIdx];
            let response = 0;

            for (let m = -1; m <= 1; m++) {
              for (let n = -1; n <= 1; n++) {
                response += grayMat.ucharAt(i + m, j + n) * mask[m + 1][n + 1];
              }
            }

            maxResponse = Math.max(maxResponse, response);
          }

          resMat.ucharPtr(i, j)[0] = maxResponse > threshold ? 255 : 0;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function robinsonFilter(threshold) {
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

      // Robinson compass masks
      let robinson_masks = [
        [-1,  0,  1, -2,  0,  2, -1,  0,  1], // East
        [ 0,  1,  2, -1,  0,  1, -2, -1,  0], // North-East
        [ 1,  2,  1,  0,  0,  0, -1, -2, -1], // North
        [ 2,  1,  0,  1,  0, -1,  0, -1, -2], // North-West
        [ 1,  0, -1,  2,  0, -2,  1,  0, -1], // West
        [ 0, -1, -2,  1,  0, -1,  2,  1,  0], // South-West
        [-1, -2, -1,  0,  0,  0,  1,  2,  1], // South
        [-2, -1,  0, -1,  0,  1,  0,  1,  2]  // South-East
      ];

      for (let i = 1; i < grayMat.rows - 1; i++) {
        for (let j = 1; j < grayMat.cols - 1; j++) {
          let maxGradient = 0;

          for (let mask = 0; mask < robinson_masks.length; mask++) {
            let gradient = 0;
            let k = 0;

            for (let m = -1; m <= 1; m++) {
              for (let n = -1; n <= 1; n++) {
                let ni = i + m;
                let nj = j + n;

                if (ni >= 0 && ni < grayMat.rows && nj >= 0 && nj < grayMat.cols) {
                  gradient += grayMat.ucharAt(ni, nj) * robinson_masks[mask][k];
                  k++;
                }
              }
            }

            maxGradient = Math.max(maxGradient, Math.abs(gradient));
          }

          resMat.ucharPtr(i, j)[0] = maxGradient > threshold ? 255 : 0;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

/* Kernel filters */

function medianFilter(kernelSize = 3) {
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

      let halfKernel = Math.floor(kernelSize / 2);

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let neighbors = [];

          for (let k = -halfKernel; k <= halfKernel; k++) {
            for (let l = -halfKernel; l <= halfKernel; l++) {
              let ni = i + k;
              let nj = j + l;

              if (ni >= 0 && ni < grayMat.rows && nj >= 0 && nj < grayMat.cols) {
                let p = grayMat.ucharAt(ni, nj);
                neighbors.push(p);
              }
            }
          }

          neighbors.sort((a, b) => a - b);
          let median = neighbors[Math.floor(neighbors.length / 2)];

          resMat.ucharPtr(i, j)[0] = median;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function modeFilter(kernelSize = 3) {
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

      let halfKernel = Math.floor(kernelSize / 2);

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let neighbors = [];
          let counts = new Map();

          for (let k = -halfKernel; k <= halfKernel; k++) {
            for (let l = -halfKernel; l <= halfKernel; l++) {
              let ni = i + k;
              let nj = j + l;

              if (ni >= 0 && ni < grayMat.rows && nj >= 0 && nj < grayMat.cols) {
                let p = grayMat.ucharAt(ni, nj);
                neighbors.push(p);
              }
            }
          }

          // Count occurrences of each pixel value
          for (let pixel of neighbors) {
            counts.set(pixel, (counts.get(pixel) || 0) + 1);
          }

          // Find the mode (most frequent pixel value)
          let mode = null;
          let maxCount = -1;
          for (let [pixel, count] of counts.entries()) {
            if (count > maxCount) {
              maxCount = count;
              mode = pixel;
            }
          }

          resMat.ucharPtr(i, j)[0] = mode;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function maximumFilter(kernelSize = 3) {
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

      let halfKernel = Math.floor(kernelSize / 2);

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let neighbors = [];
          
          for (let k = -halfKernel; k <= halfKernel; k++) {
            for (let l = -halfKernel; l <= halfKernel; l++) {
              let ni = i + k;
              let nj = j + l;

              if (ni >= 0 && ni < grayMat.rows && nj >= 0 && nj < grayMat.cols) {
                let p = grayMat.ucharAt(ni, nj);
                neighbors.push(p);
              }
            }
          }

          let maxPixel = Math.max(...neighbors);

          resMat.ucharPtr(i, j)[0] = maxPixel;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function averageFilter(kernelSize = 3) {
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

      let halfKernel = Math.floor(kernelSize / 2);

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let mp = grayMat.ucharAt(i, j);
          let ps = 1;

          for (let k = -halfKernel; k <= halfKernel; k++) {
            for (let l = -halfKernel; l <= halfKernel; l++) {
              let ni = i + k;
              let nj = j + l;

              if (ni >= 0 && ni < grayMat.rows && nj >= 0 && nj < grayMat.cols) {
                let p = grayMat.ucharAt(ni, nj);
                mp += p;
                ps++;
              }
            }
          }

          resMat.ucharPtr(i, j)[0] = Math.floor(mp / ps);
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function heavyAverageFilter(kernelSize = 3) {
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

      let halfKernel = Math.floor(kernelSize / 2);
      let centralWeight = 5;
      let surroundingWeight = 1;

      let totalWeight = centralWeight + (kernelSize * kernelSize - 1) * surroundingWeight;

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let sum = 0;

          for (let ki = -halfKernel; ki <= halfKernel; ki++) {
            for (let kj = -halfKernel; kj <= halfKernel; kj++) {
              let ni = i + ki;
              let nj = j + kj;

              if (ni >= 0 && ni < grayMat.rows && nj >= 0 && nj < grayMat.cols) {
                let weight = (ki === 0 && kj === 0) ? centralWeight : surroundingWeight;
                sum += grayMat.ucharAt(ni, nj) * weight;
              }
            }
          }

          let avg = sum / totalWeight;
          resMat.ucharPtr(i, j)[0] = avg;
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function minimumFilter(kernelSize = 3) {
  if (!imageR) return;
  const wait = setInterval(() => {
    if (openCV) {
      clearInterval(wait);

      let imgData = cnvSource.getContext('2d').getImageData(0, 0, cnvSource.width, cnvSource.height);
      let mat = cv.matFromImageData(imgData);

      let grayMat = new cv.Mat();
      cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

      let resMat = new cv.Mat(grayMat.rows, grayMat.cols, grayMat.type());

      let halfKernel = Math.floor(kernelSize / 2);

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let mp = grayMat.ucharAt(i, j);

          for (let k = -halfKernel; k <= halfKernel; k++) {
            for (let l = -halfKernel; l <= halfKernel; l++) {
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
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}

function gaussianFilter(kernelSize = 3, sigma = 1.0) {
  if (!imageR) return;

  const calculateGaussianWeight = (x, y) => {
    return Math.exp(-(x * x + y * y) / (2 * sigma * sigma)) / (2 * Math.PI * sigma * sigma);
  };

  const wait = setInterval(() => {
    if (openCV) {
      clearInterval(wait);

      let imgData = cnvSource.getContext('2d').getImageData(0, 0, cnvSource.width, cnvSource.height);
      let mat = cv.matFromImageData(imgData);

      let grayMat = new cv.Mat();
      cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

      let resMat = new cv.Mat(grayMat.rows, grayMat.cols, cv.CV_8UC1);
      resMat.setTo(new cv.Scalar(0));

      let halfKernel = Math.floor(kernelSize / 2);

      let weights = [];
      for (let i = -halfKernel; i <= halfKernel; i++) {
        let row = [];
        for (let j = -halfKernel; j <= halfKernel; j++) {
          row.push(calculateGaussianWeight(i, j));
        }
        weights.push(row);
      }

      for (let i = 0; i < grayMat.rows; i++) {
        for (let j = 0; j < grayMat.cols; j++) {
          let sum = 0;
          let weightSum = 0;

          for (let k = -halfKernel; k <= halfKernel; k++) {
            for (let l = -halfKernel; l <= halfKernel; l++) {
              let ni = i + k;
              let nj = j + l;

              if (ni >= 0 && ni < grayMat.rows && nj >= 0 && nj < grayMat.cols) {
                let pixel = grayMat.ucharAt(ni, nj);
                let weight = weights[k + halfKernel][l + halfKernel];

                sum += pixel * weight;
                weightSum += weight;
              }
            }
          }

          resMat.ucharPtr(i, j)[0] = Math.round(sum / weightSum);
        }
      }

      cv.imshow('canvasPreview', resMat);

      mat.delete();
      grayMat.delete();
      resMat.delete();
    }
  }, 100);
}
