// ===== Menu Mobile =====
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== Scroll Suave e Link Ativo =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Botão voltar ao topo
    const btnTopo = document.getElementById('btn-topo');
    if (window.scrollY > 400) {
        btnTopo.classList.add('visible');
    } else {
        btnTopo.classList.remove('visible');
    }
});

// ===== Botão Voltar ao Topo =====
document.getElementById('btn-topo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Formulário de Contato =====
const formContato = document.getElementById('form-contato');

formContato.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação simples
    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido!');
        return;
    }

    // Simulação de envio (aqui você pode integrar com um serviço real)
    const btnSubmit = formContato.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerHTML;

    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btnSubmit.disabled = true;

    setTimeout(() => {
        // Redireciona para o WhatsApp com a mensagem formatada
        const mensagemWhats = `Olá! Meu nome é ${nome} (${email}).%0A%0A${mensagem}`;
        const urlWhats = `https://wa.me/5519993560417?text=${mensagemWhats}`;
        
        alert(`Obrigado, ${nome}! Sua mensagem foi preparada. Você será redirecionado para o WhatsApp para finalizar o envio.`);
        
        window.open(urlWhats, '_blank');

        // Reset do formulário
        formContato.reset();
        btnSubmit.innerHTML = textoOriginal;
        btnSubmit.disabled = false;
    }, 1500);
});

// ===== Animação de entrada dos elementos =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards e seções
document.querySelectorAll('.produto-card, .info-card, .sobre-text, .sobre-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Ano atual no footer (opcional) =====
// Já está fixo como 2026, mas pode ser dinâmico:
// document.querySelector('.footer-bottom p').innerHTML = 
//     `&copy; ${new Date().getFullYear()} Priscilla Cantarero de Freitas - CNPJ: 68.478.182/0001-44. Todos os direitos reservados.`;
