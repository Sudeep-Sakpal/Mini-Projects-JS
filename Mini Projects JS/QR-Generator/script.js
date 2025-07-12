const textInput = document.getElementById("textInput");
const generateBtn = document.getElementById("generateBtn");
const qrContainer = document.getElementById("qrContainer");
const errorMessage = document.getElementById("errorMessage");

// Add enter key support
textInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    generateQR();
  }
});

// Clear error when user starts typing
textInput.addEventListener("input", function () {
  hideError();
});

function generateQR() {
  const text = textInput.value.trim();

  if (!text) {
    showError();
    return;
  }

  hideError();
  showLoading();

  // Add a small delay to show loading animation
  setTimeout(() => {
    try {
      // Create QR code using client-side library
      const qr = qrcode(0, "M"); // Error correction level M
      qr.addData(text);
      qr.make();

      // Create QR code as data URL
      const qrDataUrl = qr.createDataURL(4, 8); // cell size 4, margin 8

      // Create image element
      const img = new Image();
      img.onload = function () {
        hideLoading();
        showQRCode(img);
      };

      img.src = qrDataUrl;
    } catch (error) {
      hideLoading();
      showError("Failed to generate QR code. Please try again.");
    }
  }, 500);
}

function showLoading() {
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  qrContainer.innerHTML = '<div class="loading-spinner"></div>';
}

function hideLoading() {
  generateBtn.disabled = false;
  generateBtn.textContent = "Generate QR Code";
}

function showQRCode(img) {
  img.className = "qr-code";
  img.alt = "Generated QR Code";

  qrContainer.innerHTML = "";
  qrContainer.appendChild(img);
}

function showError(message = "Please enter some text to generate QR code!") {
  textInput.classList.add("shake");
  errorMessage.textContent = message;
  errorMessage.classList.add("show");

  setTimeout(() => {
    textInput.classList.remove("shake");
  }, 500);
}

function hideError() {
  textInput.classList.remove("shake");
  errorMessage.classList.remove("show");
}

// Add some interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Focus on input when page loads
  textInput.focus();

  // Add floating animation to container
  const container = document.querySelector(".container");
  let floatDirection = 1;

  setInterval(() => {
    const currentTransform = container.style.transform || "";
    const translateY = floatDirection * 2;
    container.style.transform = `translateY(${translateY}px)`;
    floatDirection *= -1;
  }, 3000);
});
