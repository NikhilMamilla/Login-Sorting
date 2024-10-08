const togglePasswordSignUp = document.getElementById('togglePasswordSignUp');
const passwordInputSignUp = document.getElementById('password');
togglePasswordSignUp.addEventListener('click', function() {
    const type = passwordInputSignUp.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInputSignUp.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
toggleConfirmPassword.addEventListener('click', function() {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});


document.getElementById('signupBtn').addEventListener('click', function(event) {
    event.preventDefault();
    handleSignup();
});

function handleSignup() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');


    clearErrorMessages();

    let isValid = true;

    if (!firstName.value.trim()) {
        showError(firstName, 'Please fill this field');
        isValid = false;
    }
    if (!lastName.value.trim()) {
        showError(lastName, 'Please fill this field');
        isValid = false;
    }
    if (!password.value.trim()) {
        showError(password, 'Please fill this field');
        isValid = false;
    } else if (!isStrongPassword(password.value)) {
        showError(password, 'Password must be at least 8 characters long');
        isValid = false;
    }
    if (!confirmPassword.value.trim()) {
        showError(confirmPassword, 'Please fill this field');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    if (isValid) {

        const user = { firstName: firstName.value, lastName: lastName.value, password: password.value };
        localStorage.setItem('user', JSON.stringify(user));


        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = 'Signup successful!';
        successMessage.style.display = 'block';
        document.getElementById('signupForm').reset();
    }
}

function showError(inputElement, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';

    inputElement.parentElement.appendChild(errorDiv);
}


function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
}


function isStrongPassword(password) {
    const minLength = 8;

    return password.length >= minLength;
}

