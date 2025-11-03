document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------
    // 1. FUNCIONALIDADE: TOGGLE DO MENU PARA MOBILE
    // ----------------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('menu-principal');

    if (menuToggle && navMenu) {
        // Ao clicar no botão de toggle (o "☰")
        menuToggle.addEventListener('click', () => {
            // Adiciona ou remove a classe 'active', que será usada no CSS
            navMenu.classList.toggle('active');
        });

        // Fechar o menu ao clicar em um link (útil no mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Remove a classe 'active' para esconder o menu
                navMenu.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------------------
    // 2. FUNCIONALIDADE: SCROLL SUAVE
    // ----------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previne o comportamento padrão do clique

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Realiza o scroll suave até a seção
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

/**SPLASH INTRO **/

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".splash").style.display = "none";
  }, 2500); // tempo em milissegundos
});





/** |--------------------------------------------------------------------------
    | MOTOR ANIMADO 
    |-------------------------------------------------------------------------- **/

const motorImage = document.getElementById("motorImage");
const motorSound = document.getElementById("motorSound");

// 1. Variável de controle para o estado do motor
let motorLigado = false; 

// 2. Variável para armazenar a ID do Timeout do tremor
let tremorTimeout;

motorImage.addEventListener("click", () => {
    if (!motorLigado) {
        // --- CÓDIGO DE LIGAR (ON) ---
        motorLigado = true;
        
        motorSound.currentTime = 0;
        motorSound.play();

        // Tremor
        motorImage.classList.add("tremendo");

        // O motor continua "ligado" (tremendo) pelo tempo do som (15 segundos)
        // Armazenamos a ID do Timeout
        tremorTimeout = setTimeout(() => {
            // Desliga o motor automaticamente se o som terminar
            motorLigado = false; 
            motorImage.classList.remove("tremendo");
            // É bom pausar o som aqui também, caso o arquivo de áudio se repita
            motorSound.pause(); 
            motorSound.currentTime = 0;
        }, 15000); 

    } else {
        // --- CÓDIGO DE DESLIGAR (OFF) ---
        motorLigado = false;
        
        // Cancela o desligamento automático (se o som ainda estivesse tocando)
        clearTimeout(tremorTimeout); 

        // Para o som imediatamente e reinicia a posição
        motorSound.pause();
        motorSound.currentTime = 0; 
        
        // Remove a classe de animação imediatamente
        motorImage.classList.remove("tremendo");
    }
});





/*
    |--------------------------------------------------------------------------
    | 🌟 LÓGICA DE ANIMAÇÃO NO SCROLL (INTERSECTION OBSERVER)
    |--------------------------------------------------------------------------
    */
    const observerOptions = {
        root: null, // Observa o viewport (a janela)
        rootMargin: '0px',
        threshold: 0.2 // O elemento é considerado visível quando 20% dele estiver na tela
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe que ativa a animação no CSS
                entry.target.classList.add('is-visible');
                // Para de observar o elemento, pois ele já foi animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Encontra todos os elementos que devem ser animados
    // Inclui a classe geral e os IDs específicos que configuramos
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, #motorImage, #text-mot');
    
    // Inicia a observação em cada elemento
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });







    // ==============================================
    // 4. FUNCIONALIDADE DO CAROUSEL DE LANÇAMENTOS
    // ==============================================
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-nav.next');
    const prevButton = document.querySelector('.carousel-nav.prev');

    // Verifica se os elementos do carousel existem antes de tentar manipulá-los
    if (track && slides.length > 0 && nextButton && prevButton) {
        let currentSlideIndex = 0;

        // Função principal para mover o carousel
        const moveSlide = (index) => {
            // Calcula o deslocamento em % (-100% para slide 1, -200% para slide 2, etc.)
            const offset = -index * 100;
            track.style.transform = `translateX(${offset}%)`;
        };

        // Evento para o botão PRÓXIMO
        nextButton.addEventListener('click', () => {
            currentSlideIndex++;
            // Se for o último slide, volta para o primeiro (loop infinito)
            if (currentSlideIndex >= slides.length) {
                currentSlideIndex = 0;
            }
            moveSlide(currentSlideIndex);
        });

        // Evento para o botão ANTERIOR
        prevButton.addEventListener('click', () => {
            currentSlideIndex--;
            // Se estiver no primeiro slide, vai para o último (loop infinito)
            if (currentSlideIndex < 0) {
                currentSlideIndex = slides.length - 1;
            }
            moveSlide(currentSlideIndex);
        });
    }


    // script.js - Adicione esta função na área de outras interações
    
    // ==============================================
    // 5. FUNCIONALIDADE DO FORMULÁRIO DE AGENDAMENTO
    // ==============================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(event) {
            // Previne o comportamento padrão (que enviaria para outra página)
            event.preventDefault(); 

            // Simula o envio de dados para o servidor
            console.log('Dados do formulário enviados!');
            
            // 1. Mostra a mensagem de sucesso
            formMessage.textContent = 'Sua solicitação foi enviada! Entraremos em contato em até 24 horas.';
            formMessage.style.display = 'block';
            formMessage.style.color = '#FF0000'; // Feedback de sucesso em vermelho Ferrari
            
            // 2. Desativa o botão e muda o texto
            const submitButton = contactForm.querySelector('.submit-button');
            submitButton.textContent = 'SOLICITAÇÃO ENVIADA';
            submitButton.disabled = true;
            submitButton.style.backgroundColor = '#333';
            
            // 3. Opcional: Limpa os campos do formulário
            contactForm.reset();

            // Opcional: Esconde a mensagem e reabilita o botão após alguns segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
                submitButton.textContent = 'ENVIAR SOLICITAÇÃO';
                submitButton.disabled = false;
                submitButton.style.backgroundColor = ''; // Volta ao estilo padrão do CSS
            }, 6000); // Mensagem visível por 6 segundos
        });
    }

    // script.js - Adicione esta função na área de outras interações
    
    // ==============================================
    // 6. FUNCIONALIDADE DA GALERIA (LIGHTBOX)
    // ==============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevLbBtn = document.querySelector('.prev-lb');
    const nextLbBtn = document.querySelector('.next-lb');

    let currentLightboxIndex = 0; // Índice da imagem atualmente aberta

    // ----------------------------------------------------
    // FUNÇÃO PARA ABRIR O LIGHTBOX E DEFINIR O CONTEÚDO
    // ----------------------------------------------------
    function openLightbox(index) {
        if (galleryItems.length === 0) return;
        
        currentLightboxIndex = index;
        const item = galleryItems[index];
        const imgSrc = item.getAttribute('data-src');
        const imgCaption = item.getAttribute('data-caption');
        
        lightbox.style.display = 'block';
        lightboxImage.src = imgSrc;
        captionText.textContent = imgCaption;
        
        // Bloqueia a rolagem do corpo da página quando o lightbox está aberto
        document.body.style.overflow = 'hidden'; 
    }

    // ----------------------------------------------------
    // EVENT LISTENERS PARA ABRIR O LIGHTBOX
    // ----------------------------------------------------
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // ----------------------------------------------------
    // FUNÇÃO PARA FECHAR O LIGHTBOX
    // ----------------------------------------------------
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura a rolagem da página
    }

    // Listener para o botão 'X' de fechar
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Fechar ao clicar fora da imagem
    window.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Fechar ao pressionar a tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });

    // ----------------------------------------------------
    // FUNÇÕES DE NAVEGAÇÃO INTERNA DO LIGHTBOX
    // ----------------------------------------------------
    function navigate(direction) {
        if (galleryItems.length === 0) return;

        currentLightboxIndex += direction;
        
        // Loop: Se passar do último, volta ao primeiro
        if (currentLightboxIndex >= galleryItems.length) {
            currentLightboxIndex = 0;
        } 
        // Loop: Se estiver antes do primeiro, vai para o último
        else if (currentLightboxIndex < 0) {
            currentLightboxIndex = galleryItems.length - 1;
        }
        
        openLightbox(currentLightboxIndex);
    }

    // Listener para o botão 'Próximo'
    if (nextLbBtn) {
        nextLbBtn.addEventListener('click', () => navigate(1));
    }
    
    // Listener para o botão 'Anterior'
    if (prevLbBtn) {
        prevLbBtn.addEventListener('click', () => navigate(-1));
    }
    
    // Navegação por setas do teclado (opcional, mas profissional)
    document.addEventListener('keydown', (event) => {
        if (lightbox.style.display === 'block') {
            if (event.key === 'ArrowRight') {
                navigate(1);
            } else if (event.key === 'ArrowLeft') {
                navigate(-1);
            }
        }
    });