const fileInput = document.getElementById('file-input');
const selectedImage = document.getElementById('selected-image');
const croppedImage = document.getElementById('cropped-image');
const resizedImage = document.getElementById('resized-image');
const cropWidthInput = document.getElementById('crop-width');
const cropHeightInput = document.getElementById('crop-height');
const cropButton = document.getElementById('crop-button');
const resizeWidthInput = document.getElementById('resize-width');
const resizeHeightInput = document.getElementById('resize-height');
const resizeButton = document.getElementById('resize-button');
let imageWidth = 0;
let imageHeight = 0;
let croppedWidth = 0;
let croppedHeight = 0;

// Show the image preview
fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(event) {
    selectedImage.src = event.target.result;
    selectedImage.onload = function() {
      imageWidth = this.width;
      imageHeight = this.height;
      cropWidthInput.setAttribute('max', imageWidth);
      cropHeightInput.setAttribute('max', imageHeight);
    }
  }
});

// Crop the image
cropButton.addEventListener('click', function() {
  const x = 0;
  const y = 0;
  const width = cropWidthInput.value;
  const height = cropHeightInput.value;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(selectedImage, x, y, width, height, 0, 0, width, height);
  croppedImage.src = canvas.toDataURL();
  croppedWidth = width;
  croppedHeight = height;
  resizeWidthInput.setAttribute('max', croppedWidth);
  resizeHeightInput.setAttribute('max', croppedHeight);
});

// Resize the cropped image
resizeButton.addEventListener('click', function() {
  const width = resizeWidthInput.value;
  const height = resizeHeightInput.value;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(croppedImage, 0, 0, croppedWidth, croppedHeight, 0, 0, width, height);
  resizedImage.src = canvas.toDataURL();
});

