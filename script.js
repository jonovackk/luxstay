// ===================================
// MENU HAMBURGUER - LUXSTAY
// ===================================

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona os elementos
    const hamburger = document.getElementById('hamburger');
    const navbarLinks = document.getElementById('navbarLinks');
    
    // Verifica se os elementos existem
    if (!hamburger || !navbarLinks) {
        console.error('Elementos do menu não encontrados!');
        return;
    }

    // Toggle do menu hamburguer
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navbarLinks.classList.toggle('active');
        
        // Previne o scroll do body quando menu está aberto
        if (navbarLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Fechar menu ao clicar em qualquer link (mobile)
    const menuLinks = document.querySelectorAll('.navbar-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbarLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Fechar menu ao redimensionar a janela (caso mude de mobile para desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            hamburger.classList.remove('active');
            navbarLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbarLinks.contains(event.target) || 
                                hamburger.contains(event.target);
        
        if (!isClickInsideNav && navbarLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navbarLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Fechar menu com tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navbarLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navbarLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

});

// ===================================
// SCROLL SUAVE PARA ÂNCORAS (BONUS)
// ===================================

// Adiciona scroll suave para todos os links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                e.preventDefault();
                
                // Calcula a posição considerando a altura da navbar fixa
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===================================
// HIGHLIGHT DO MENU ATIVO (BONUS)
// ===================================

// Adiciona classe 'active' no link do menu correspondente à seção visível
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.navbar-links a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && 
                window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        menuLinks.forEach(link => {
            link.classList.remove('active-section');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active-section');
            }
        });
    });
});