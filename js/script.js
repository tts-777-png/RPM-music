window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Opção: Efeito de revelação simples (Scroll Reveal)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Configuração do Observador para Autoplay
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Seleciona o iframe dentro da div que entrou na tela
        const iframe = entry.target.querySelector('iframe');
        
        if (iframe) {
            if (entry.isIntersecting) {
                // Se a seção está visível, envia o comando de PLAY para a API do YouTube
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } else {
                // Se o usuário saiu da seção, PAUSA o vídeo para não gastar banda/processamento
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        }
    });
}, { 
    threshold: 0.6 // O vídeo só dá play quando 60% dele estiver visível na tela
});

// Inicializa o observador em todos os containers de vídeo do site
document.querySelectorAll('.video-container').forEach(container => {
    videoObserver.observe(container);
});

// Extra: Smooth Scroll para os links da página (para a rolagem ser suave)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Adicione isso ao final do seu arquivo js
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('navbarNav');
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false});

navLinks.forEach((l) => {
    l.addEventListener('click', () => { 
        if (window.innerWidth < 992) { // Só fecha se estiver no mobile
            bsCollapse.hide(); 
        }
    });
});

window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

document.getElementById("backToTop").onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

document.getElementById("backToTop").onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Fecha o menu sanduíche ao clicar em qualquer link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.getElementById('navbarNav');
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        if (navbarCollapse.classList.contains('show')) {
            bsCollapse.hide();
        }
    });
});