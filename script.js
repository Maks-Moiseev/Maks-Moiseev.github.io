document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигационных ссылок
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрытие мобильного меню (если есть)
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.querySelector('.menu-toggle').classList.remove('active');
            }
        });
    });

    // Анимация при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.game-card, .member, .about-content, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Запуск анимации при загрузке и прокрутке
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Мобильное меню (для маленьких экранов)
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').appendChild(menuToggle);
    
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    mobileMenu.innerHTML = document.querySelector('nav').innerHTML;
    document.body.appendChild(mobileMenu);
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Закрытие мобильного меню при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Валидация формы обратной связи
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            let isValid = true;
            
            // Валидация имени
            if (nameInput.value.trim() === '') {
                nameInput.style.borderColor = 'red';
                isValid = false;
            } else {
                nameInput.style.borderColor = '#ddd';
            }
            
            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.style.borderColor = 'red';
                isValid = false;
            } else {
                emailInput.style.borderColor = '#ddd';
            }
            
            // Валидация сообщения
            if (messageInput.value.trim() === '') {
                messageInput.style.borderColor = 'red';
                isValid = false;
            } else {
                messageInput.style.borderColor = '#ddd';
            }
            
            // Если форма валидна - отправляем (здесь можно добавить AJAX)
            if (isValid) {
                alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
                this.reset();
            }
        });
    }

    // Форма подписки в футере
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.style.borderColor = 'red';
            } else {
                emailInput.style.borderColor = '#ddd';
                alert('Спасибо за подписку!');
                this.reset();
            }
        });
    }

    // Параллакс эффект для героя
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Подсветка активного раздела в навигации
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Инициализация активного состояния для первой ссылки
    navLinks[0].classList.add('active');
});
