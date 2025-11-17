document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('login-form');
            const errorMessage = document.getElementById('error-message');
            
            loginForm.addEventListener('submit', function(e) {
                // Impede o envio real do formulário
                e.preventDefault(); 
                
                // Pega os valores dos campos
                const username = document.getElementById('usuario').value.trim();
                const password = document.getElementById('senha').value.trim();
                
                // 1. SIMULAÇÃO DE VALIDAÇÃO (Campos vazios)
                if (username === '' || password === '') {
                    errorMessage.textContent = 'Por favor, preencha todos os campos.';
                    errorMessage.style.display = 'block';
                } 
                // 2. SIMULAÇÃO DE VALIDAÇÃO (Senha muito curta - mais realista)
                else if (password.length < 4) { 
                    errorMessage.textContent = 'Usuário ou senha inválidos. Tente novamente.';
                    errorMessage.style.display = 'block';
                } 
                // 3. SIMULAÇÃO DE SUCESSO
                else {
                    errorMessage.style.display = 'none';
                    
                    // Redireciona para o Dashboard!
                    window.location.href = 'dashboard.html'; 
                }
            });
        });