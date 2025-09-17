// contact.js - Validación de formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Validar nombre
            if(nameInput.value.trim() === '') {
                showError(nameInput, 'Por favor ingresa tu nombre');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // Validar email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailPattern.test(emailInput.value)) {
                showError(emailInput, 'Por favor ingresa un email válido');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // Validar asunto
            if(subjectInput.value.trim() === '') {
                showError(subjectInput, 'Por favor ingresa un asunto');
                isValid = false;
            } else {
                removeError(subjectInput);
            }
            
            // Validar mensaje
            if(messageInput.value.trim() === '') {
                showError(messageInput, 'Por favor ingresa tu mensaje');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if(isValid) {
                // Simular envío exitoso
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = 'Enviando... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
                submitBtn.disabled = true;
                
                // Efecto visual de éxito
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.classList.add('is-valid');
                });
                
                setTimeout(() => {
                    // Crear efecto de confeti
                    createConfetti();
                    
                    // Mostrar mensaje de éxito
                    const successAlert = document.createElement('div');
                    successAlert.className = 'alert alert-success mt-3';
                    successAlert.innerHTML = '<i class="fas fa-check-circle me-2"></i> ¡Mensaje enviado con éxito! Te contactaremos pronto.';
                    contactForm.appendChild(successAlert);
                    
                    // Restaurar botón
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Limpiar formulario
                    contactForm.reset();
                    
                    // Remover alerta después de 5 segundos
                    setTimeout(() => {
                        successAlert.remove();
                        inputs.forEach(input => {
                            input.classList.remove('is-valid');
                        });
                    }, 5000);
                }, 2000);
            }
        });
        
        function showError(input, message) {
            removeError(input);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback d-block';
            errorDiv.textContent = message;
            input.parentNode.appendChild(errorDiv);
            input.classList.add('is-invalid');
        }
        
        function removeError(input) {
            const errorDiv = input.parentNode.querySelector('.invalid-feedback');
            if(errorDiv) {
                errorDiv.remove();
            }
            input.classList.remove('is-invalid');
            input.classList.remove('is-valid');
        }
        
        function createConfetti() {
            const confettiContainer = document.createElement('div');
            confettiContainer.style.position = 'fixed';
            confettiContainer.style.top = '0';
            confettiContainer.style.left = '0';
            confettiContainer.style.width = '100%';
            confettiContainer.style.height = '100%';
            confettiContainer.style.pointerEvents = 'none';
            confettiContainer.style.zIndex = '9999';
            document.body.appendChild(confettiContainer);
            
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.position = 'absolute';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = getRandomColor();
                confetti.style.borderRadius = '50%';
                confetti.style.top = '0';
                confetti.style.left = Math.random() * 100 + 'vw';
                
                const animation = confetti.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 3000 + 2000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.1, 1)'
                });
                
                confettiContainer.appendChild(confetti);
                
                animation.onfinish = () => {
                    confetti.remove();
                };
            }
            
            setTimeout(() => {
                confettiContainer.remove();
            }, 5000);
        }
        
        function getRandomColor() {
            const colors = ['#64ffda', '#4facfe', '#ff6b6b', '#ffd93d', '#6bcf7f'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }
});