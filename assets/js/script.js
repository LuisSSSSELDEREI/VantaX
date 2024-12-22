// Конфигурация для анимации звезд
const starsConfig = {
    count: 150,
    speed: 0.5,
    size: {
        min: 1,
        max: 3
    }
};

// Создание звезд
function createStars() {
    const starsContainer = document.getElementById('stars');
    starsContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых звезд
    
    for (let i = 0; i < starsConfig.count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Случайный размер
        const size = Math.random() * (starsConfig.size.max - starsConfig.size.min) + starsConfig.size.min;
        star.style.width = star.style.height = `${size}px`;
        
        // Случайное положение
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Случайная длительность анимации
        star.style.setProperty('--duration', `${Math.random() * 3 + 1}s`);
        
        starsContainer.appendChild(star);
    }
}

// Параллакс эффект для звезд
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelectorAll('.star');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        stars.forEach(star => {
            const speed = parseFloat(star.style.width) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            star.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Анимация для логотипа Vanta Loader
function initLogoAnimation() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', () => {
            logo.style.transform = 'scale(1.1)';
            logo.style.textShadow = '0 0 20px rgba(108, 92, 231, 0.8)';
        });

        logo.addEventListener('mouseout', () => {
            logo.style.transform = 'scale(1)';
            logo.style.textShadow = '0 0 10px rgba(108, 92, 231, 0.5)';
        });
    }
}

// Эффект наклона для карточек игр
function initCardTilt() {
    const cards = document.querySelectorAll('.game-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${-rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
            
            // Добавляем эффект блика
            const glare = card.querySelector('.card-glare');
            if (glare) {
                const glareX = ((x / rect.width) * 100);
                const glareY = ((y / rect.height) * 100);
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const glare = card.querySelector('.card-glare');
            if (glare) {
                glare.style.background = 'none';
            }
        });
        
        // Добавляем элемент для блика
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
    });
}

// Инициализация всех эффектов
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initParallax();
    initLogoAnimation();
    initCardTilt();
});

// Плавный скролл для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
