
let language = 1;

let openCV = false;
let imageR = false;

function replaceToolbox(box, article) {
  box.replaceChildren(article);
}

function openCVReady() { 
  openCV = true;
  document.getElementById('playgroundTitle').replaceChildren(getText('playgroundTitle'));
}

function fileSelectorChange(e) {
  const file = e.target.files[0];
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(event) {
      imgHidden.src = event.target.result;
    };
    reader.readAsDataURL(file);
    document.getElementById('toolboxCanvases').setAttribute('style', '');
  } else {
    alert('Please select an image file.');
    e.target.value = null;
  }
}

function imageReady() {
  imgHidden.style.display = 'block';
  
  const computedStyle = window.getComputedStyle(imgHidden);
  
  const w = parseFloat(computedStyle.width);
  const h = parseFloat(computedStyle.height);

  cnvSource.width = w;
  cnvSource.height = h;

  cnvPreview.width = w;
  cnvPreview.height = h;

  cnvSource.getContext('2d').drawImage(imgHidden, 0, 0, w, h);
  cnvPreview.getContext('2d').drawImage(imgHidden, 0, 0, w, h);

  imgHidden.style.display = 'none';

  imageR = true;
}

function restoreImage() {
  if (!imageR) return;
  imgHidden.style.display = 'block';
  const computedStyle = window.getComputedStyle(imgHidden);
  const w = parseFloat(computedStyle.width);
  const h = parseFloat(computedStyle.height);
  cnvSource.width = w;
  cnvSource.height = h;
  cnvSource.getContext('2d').drawImage(imgHidden, 0, 0, w, h);
  imgHidden.style.display = 'none';
}

function restorePreview() {
  if (!imageR) return;

  cnvPreview.width = cnvSource.width;
  cnvPreview.height = cnvSource.height;
  
  let imgData = cnvSource.getContext('2d').getImageData(0, 0, cnvSource.width, cnvSource.height);
  cnvPreview.getContext('2d').putImageData(imgData, 0, 0);
}

function applyChanges() {
  if (!imageR) return;
  let imgData = cnvPreview.getContext('2d').getImageData(0, 0, cnvPreview.width, cnvPreview.height);
  cnvSource.getContext('2d').putImageData(imgData, 0, 0);
}
