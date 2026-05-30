let uppercaseEnabled = true;
let numbersEnabled = true;
let symbolsEnabled = true;

function toggleOption(button, option) {
    button.classList.toggle('active');
    switch(option) {
        case 'uppercase':
            uppercaseEnabled = !uppercaseEnabled;
            break;
        case 'numbers':
            numbersEnabled = !numbersEnabled;
            break;
        case 'symbols':
            symbolsEnabled = !symbolsEnabled;
            break;
    }
}

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    document.getElementById('length-value').textContent = length;

    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (uppercaseEnabled) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbersEnabled) charset += '0123456789';
    if (symbolsEnabled) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById('password').textContent = password;
}

function copyPassword() {
    const passwordText = document.getElementById('password').textContent;
    if (passwordText) {
        navigator.clipboard.writeText(passwordText).then(() => {
            const originalText = document.getElementById('password').textContent;
            document.getElementById('password').textContent = 'Copiado!';
            setTimeout(() => {
                document.getElementById('password').textContent = originalText;
            }, 1000);
        }).catch(() => {
            const textarea = document.createElement('textarea');
            textarea.value = passwordText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            const originalText = document.getElementById('password').textContent;
            document.getElementById('password').textContent = 'Copiado!';
            setTimeout(() => {
                document.getElementById('password').textContent = originalText;
            }, 1000);
        });
    } else {
        alert('Gere uma senha primeiro!');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    generatePassword();
});

document.getElementById('length').addEventListener('input', function() {
    document.getElementById('length-value').textContent = this.value;
});