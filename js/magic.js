// magic.js - Efectos mágicos e interacciones
document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas mágicas de fondo
    function createParticles() {
        const container = document.createElement('div');
        container.className = 'magic-bg';
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'magic-particle';
            
            // Tamaño y posición aleatoria
            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 15;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            
            container.appendChild(particle);
        }
        
        document.body.appendChild(container);
    }

    document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".magic-cursor");
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
});
    
    // Efecto de revelado al hacer scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.magic-reveal');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(position < screenPosition) {
                element.classList.add('active');
            }
        });
    }
    
    // Efecto de paralax para elementos
    function setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Efecto de iluminación al pasar el mouse
    function setupHoverEffects() {
        const hoverElements = document.querySelectorAll('.service-card, .btn-primary');
        
        hoverElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.style.setProperty('--mouse-x', `${x}px`);
                this.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
    
    // Efecto de escritura mágica
    function typeWriterEffect() {
        const elements = document.querySelectorAll('[data-typewriter]');
        
        elements.forEach(element => {
            const text = element.getAttribute('data-typewriter');
            let i = 0;
            let speed = parseInt(element.getAttribute('data-typewriter-speed')) || 100;
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            // Iniciar efecto cuando el elemento es visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.innerHTML = '';
                        type();
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }
    
    // Inicializar todos los efectos
    function initMagicEffects() {
        createParticles();
        revealOnScroll();
        setupParallax();
        setupHoverEffects();
        typeWriterEffect();
        
        window.addEventListener('scroll', revealOnScroll);
    }
    
    // Iniciar cuando el DOM esté listo
    initMagicEffects();
});