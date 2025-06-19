document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const errorDiv = document.getElementById('error-message-register');
            errorDiv.style.display = 'none';

            const name = registerForm.name.value;
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const passwordConfirm = registerForm.passwordConfirm.value;

            if (password !== passwordConfirm) {
                errorDiv.textContent = 'Passwords do not match!';
                errorDiv.style.display = 'block';
                return;
            }

            // --- ბექენდის ლოგიკა (მომავალში) ---
            // აქ გაიგზავნება მონაცემები სერვერზე
            console.log('Registering user:', { name, email, password });
            
            // სიმულაცია: წარმატებული რეგისტრაციის შემდეგ გადავიყვანოთ login გვერდზე
            alert('Registration successful (simulation)! You will now be redirected to the login page.');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const errorDiv = document.getElementById('error-message-login');
            errorDiv.style.display = 'none';

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            // --- ბექენდის ლოგიკა (მომავალში) ---
            // აქ გაიგზავნება მონაცემები სერვერზე
            console.log('Logging in user:', { email, password });

            // სიმულაცია: წარმატებული ლოგინის შემდეგ ვინახავთ "ტოკენს" და ვცვლით UI-ს
            alert('Login successful (simulation)!');
            
            // 1. შევინახოთ მომხმარებლის წარმოსახვითი ტოკენი
            localStorage.setItem('laliUserToken', 'dummy_jwt_token_for_testing');
            localStorage.setItem('laliUserName', 'ArtLover123'); // შევინახოთ სახელიც

            // 2. გადავიყვანოთ მთავარ გვერდზე
            window.location.href = 'index.html';
        });
    }
});