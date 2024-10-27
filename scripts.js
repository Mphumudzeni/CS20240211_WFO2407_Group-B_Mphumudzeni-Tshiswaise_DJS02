// Declare global variables
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  // Perform validation and calculation
  const validationResult = validateInputs(dividend, divider);
  
  if (validationResult.error) {
    result.innerText = validationResult.message;
  } else {
    const sum = performDivision(dividend, divider);
    if (isNaN(sum)) {
      handleCriticalError();
    } else {
      result.innerText = sum;
    }
  }
}

// Function to validate the inputs
function validateInputs(dividend, divider) {
  if (!dividend || !divider) {
    return { error: true, message: "Division not performed. Both values are required in inputs. Try again" };
  }
  
  if (+divider <= 0) {
    return { error: true, message: "Division not performed. Invalid number provided. Try again" };
  }
  
  return { error: false };
}

// Function to perform the division
function performDivision(dividend, divider) {
  return Math.floor(dividend / divider);
}

// Function to handle critical errors
function handleCriticalError() {
  document.querySelector("body").innerHTML = `<h1>Something critical went wrong. Please reload the page</h1>`;
  throw new Error("Critical Error invalid data entry");
}

// Set up the event listener for the form
form.addEventListener("submit", handleFormSubmit);
