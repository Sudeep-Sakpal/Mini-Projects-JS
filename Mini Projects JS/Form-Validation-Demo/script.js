// Form validation variables
const form = document.getElementById("registrationForm");
const inputs = form.querySelectorAll("input, select");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

// Validation patterns
const patterns = {
  name: /^[a-zA-Z\s]{2,30}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]{10,15}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  age: /^(?:1[8-9]|[2-9]\d|\d{3,})$/,
};

// Error messages
const errorMessages = {
  fullName: "Name must be 2-30 characters long and contain only letters",
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number",
  password:
    "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
  confirmPassword: "Passwords do not match",
  age: "Age must be 18 or older",
  country: "Please select a country",
  terms: "You must accept the terms and conditions",
};

// Validation functions
function validateField(field) {
  const fieldName = field.name;
  const fieldValue = field.value.trim();
  const errorElement = document.getElementById(fieldName + "Error");
  let isValid = true;

  // Reset field appearance
  field.classList.remove("valid", "invalid");
  errorElement.classList.remove("show");

  // Check if field is empty
  if (fieldValue === "") {
    if (field.required) {
      showError(
        field,
        errorElement,
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + " is required"
      );
      isValid = false;
    }
    return isValid;
  }

  // Specific validation based on field type
  switch (fieldName) {
    case "fullName":
      if (!patterns.name.test(fieldValue)) {
        showError(field, errorElement, errorMessages.fullName);
        isValid = false;
      }
      break;

    case "email":
      if (!patterns.email.test(fieldValue)) {
        showError(field, errorElement, errorMessages.email);
        isValid = false;
      }
      break;

    case "phone":
      if (!patterns.phone.test(fieldValue)) {
        showError(field, errorElement, errorMessages.phone);
        isValid = false;
      }
      break;

    case "password":
      const strength = checkPasswordStrength(fieldValue);
      updatePasswordStrength(strength);

      if (!patterns.password.test(fieldValue)) {
        showError(field, errorElement, errorMessages.password);
        isValid = false;
      }
      break;

    case "confirmPassword":
      const password = document.getElementById("password").value;
      if (fieldValue !== password) {
        showError(field, errorElement, errorMessages.confirmPassword);
        isValid = false;
      }
      break;

    case "age":
      const ageNum = parseInt(fieldValue);
      if (!patterns.age.test(fieldValue) || ageNum < 18) {
        showError(field, errorElement, errorMessages.age);
        isValid = false;
      }
      break;

    case "country":
      if (fieldValue === "") {
        showError(field, errorElement, errorMessages.country);
        isValid = false;
      }
      break;

    case "terms":
      if (!field.checked) {
        showError(field, errorElement, errorMessages.terms);
        isValid = false;
      }
      break;
  }

  // Mark field as valid if no errors
  if (isValid) {
    field.classList.add("valid");
  }

  return isValid;
}

function showError(field, errorElement, message) {
  field.classList.add("invalid");
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

function checkPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;

  if (/[a-z]/.test(password)) strength++;

  if (/[A-Z]/.test(password)) strength++;

  if (/\d/.test(password)) strength++;

  if (/[@$!%*?&]/.test(password)) strength++;

  return strength;
}

function updatePasswordStrength(strength) {
  const strengthBar = document.getElementById("strengthBar");
  strengthBar.className = "strength-bar";

  if (strength <= 2) {
    strengthBar.classList.add("strength-weak");
  } else if (strength <= 4) {
    strengthBar.classList.add("strength-medium");
  } else {
    strengthBar.classList.add("strength-strong");
  }
}

function validateForm() {
  let isFormValid = true;

  // Validate all fields
  inputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  // Update submit button state
  submitBtn.disabled = !isFormValid;

  return isFormValid;
}

// Event listeners
inputs.forEach((input) => {
  input.addEventListener("blur", () => validateField(input));
  input.addEventListener("input", () => {
    // Real-time validation for better UX
    setTimeout(() => validateField(input), 300);
    validateForm();
  });
});

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    // Simulate form submission
    submitBtn.disabled = true;
    submitBtn.textContent = "Creating Account...";

    setTimeout(() => {
      form.style.display = "none";
      successMessage.classList.add("show");
    }, 1500);
  }
});

// Initialize form validation
validateForm();
