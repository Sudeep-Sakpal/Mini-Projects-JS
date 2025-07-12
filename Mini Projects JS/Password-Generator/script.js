let currentPassword = "";

function generatePassword() {
  // Character sets for strong password
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Combine all character sets
  const allChars = lowercase + uppercase + numbers + symbols;

  // Ensure password contains at least one character from each set
  let password = "";

  // Add one character from each category to ensure strength
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill remaining 8 characters randomly
  for (let i = 4; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to avoid predictable patterns
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  // Display the password
  currentPassword = password;
  const display = document.getElementById("passwordDisplay");
  display.textContent = password;
  display.classList.add("generated");

  // Enable copy button
  document.getElementById("copyBtn").disabled = false;

  // Remove animation class after animation
  setTimeout(() => {
    display.classList.remove("generated");
  }, 300);
}

function copyPassword() {
  if (currentPassword) {
    navigator.clipboard
      .writeText(currentPassword)
      .then(() => {
        showCopyFeedback();
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = currentPassword;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        showCopyFeedback();
      });
  }
}

function showCopyFeedback() {
  const feedback = document.getElementById("copyFeedback");
  feedback.classList.add("show");
  setTimeout(() => {
    feedback.classList.remove("show");
  }, 2000);
}

// Generate initial password on page load
window.onload = function () {
  generatePassword();
};
