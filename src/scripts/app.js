document.addEventListener('DOMContentLoaded', () => {
    const passwordField = document.getElementById('password');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const generateButton = document.getElementById('generate');

    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    /* Fa funzionare il bottone per generare la password */
    generateButton.addEventListener('click', () => {
        const length = lengthSlider.value;
        const includeUppercase = document.getElementById('uppercase').checked;
        const includeLowercase = document.getElementById('lowercase').checked;
        const includeNumbers = document.getElementById('numbers').checked;
        const includeSpecial = document.getElementById('special').checked;

        passwordField.value = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecial);
    });

    /* Fa copiare la password quando si clicca l'output */
    passwordField.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordField.value)
            .then(() => {
                console.log("testt password copiata")
                alert('Password copiata negli appunti!');
            })
            .catch(err => {
                console.log("testtttttt non funziona un cazzo")
                console.error('Impossibile copiare il testo: ', err);
            });
    });

    /**
     * Genera una password casuale in base all'input dell'utente.
     * 
     * @param {number} length - La lunghezza della password da generare.
     * @param {boolean} uppercase - Se includere lettere maiuscole nella password.
     * @param {boolean} lowercase - Se includere lettere minuscole nella password.
     * @param {boolean} numbers - Se includere numeri nella password.
     * @param {boolean} special - Se includere caratteri speciali nella password.
     * 
     * @returns {string} La password generata.
     * 
     * @example
     * generatePassword(12, true, true, true, true);
     * // Restituisce una password di 12 caratteri con una miscela di lettere maiuscole e minuscole, numeri e caratteri speciali.
     */
    function generatePassword(length, uppercase, lowercase, numbers, special) {
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let allChars = '';
        if (uppercase) allChars += uppercaseChars;
        if (lowercase) allChars += lowercaseChars;
        if (numbers) allChars += numberChars;
        if (special) allChars += specialChars;

        if (allChars === '') return '';

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars[randomIndex];
        }
        return password;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const nicknameField = document.getElementById('nickname');
    const generateButton = document.getElementById('generate');
    const addNumberSwitch = document.getElementById('addNumber');
    const nicknamesUrl = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Usernames/Honeypot-Captures/multiplesources-users-fabian-fingerle.de.txt';

    let nicknames = [];

    // Prendere un nick a caso dall'url di github (const nicknamesUrl)
    fetch(nicknamesUrl)
        .then(response => response.text())
        .then(data => {
            nicknames = data.split('\n').filter(nickname => nickname.trim() !== '');
        })
        .catch(err => console.error('Error fetching nicknames:', err));

    generateButton.addEventListener('click', () => {
        if (nicknames.length === 0) {
            alert('Nicknames are still loading, please try again in a moment.');
            return;
        }

        let randomNickname = nicknames[Math.floor(Math.random() * nicknames.length)];
        if (addNumberSwitch.checked) {
            const randomNumber = Math.floor(Math.random() * 10000); // genera un numero casuale da 0 a 9999
            randomNickname += randomNumber;
        }

        nicknameField.value = randomNickname;
    });

    nicknameField.addEventListener('click', () => {
        navigator.clipboard.writeText(nicknameField.value)
            .then(() => {
                alert('Nickname copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    });
});
