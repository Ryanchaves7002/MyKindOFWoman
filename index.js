document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const overlay = document.getElementById('entrance-overlay');
    const mainContent = document.getElementById('main-content');
    const heartsContainer = document.getElementById('hearts') || document.body; // Evita quebrar se não achar a div

    // 1. Botão de Entrada
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
                mainContent.classList.remove('hidden');
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                }, 50); // Pequeno delay para a transição de opacidade funcionar suavemente
            }, 1000);
        });
    }

    // 2. Criador de Corações flutuantes
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        heart.style.opacity = Math.random();

        // Coloca o coração dentro do container de corações
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);

    // 3. Slideshow clicável tipo stories do Instagram
    const slideshow = document.querySelector('.slideshow');
    if (slideshow) {
        const slides = Array.from(slideshow.querySelectorAll('img'));
        let currentSlide = slides.findIndex(slide => slide.classList.contains('active'));
        if (currentSlide < 0) currentSlide = 0;

        function updateSlides(index) {
            currentSlide = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => {
                slide.style.opacity = slideIndex === currentSlide ? '1' : '0';
            });
        }

        slides.forEach((slide, index) => {
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.height = '100%';
            slide.style.objectFit = 'cover';
            slide.style.transition = 'opacity 0.3s ease';
            slide.style.opacity = index === currentSlide ? '1' : '0';
            slide.style.cursor = 'pointer';
        });

        slideshow.addEventListener('click', (event) => {
            const rect = slideshow.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            if (clickX <= rect.width / 2) {
                updateSlides(currentSlide - 1);
            } else {
                updateSlides(currentSlide + 1);
            }
        });
    }

    // 4. Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    reveals.forEach(reveal => observer.observe(reveal));
});