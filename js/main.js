/* ================================== */
/* Abas cardápio */
/* ================================== */
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.menu-tab');
    const contentSections = document.querySelectorAll('.cardapio-produtos');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o comportamento padrão do link (#)

            // 1. Ocultar todo o conteúdo (remover a classe 'active-content')
            contentSections.forEach(section => {
                section.classList.remove('active-content');
            });

            // 2. Desativar todas as abas (remover a classe 'active')
            tabs.forEach(t => {
                t.classList.remove('active');
            });

            // 3. Ativar a aba clicada (adicionar a classe 'active')
            this.classList.add('active');

            // 4. Exibir o conteúdo correspondente
            const targetId = this.getAttribute('data-tab'); // Pega o valor do atributo 'data-tab' (ex: 'bebidas-secao')
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.add('active-content'); // Adiciona a classe para exibir a seção
            }
        });
    });
});
/* ================================== */
/* Animação cardápio */
/* ================================== */

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.menu-tab');
    const contentSections = document.querySelectorAll('.cardapio-produtos');
    
    // Função para remover a classe 'visible' após a transição de saída (fade out)
    function handleTransitionEnd(e) {
        if (!e.target.classList.contains('active-content')) {
            e.target.classList.remove('visible');
            e.target.removeEventListener('transitionend', handleTransitionEnd);
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault(); 

            const targetId = this.getAttribute('data-tab');
            const targetSection = document.getElementById(targetId);

            // 1. ANIMAÇÃO DE SAÍDA (Fade Out)
            // Remove a classe 'active-content' de todas as seções ativas
            contentSections.forEach(section => {
                if (section.classList.contains('active-content')) {
                    section.classList.remove('active-content');
                    // Adiciona um listener para quando o fade out terminar, remover o display:grid/flex
                    section.addEventListener('transitionend', handleTransitionEnd);
                }
            });
            
            // 2. DESATIVAR TODAS AS ABAS
            tabs.forEach(t => {
                t.classList.remove('active');
            });

            // 3. ANIMAÇÃO DE ENTRADA (Fade In)
            if (targetSection) {
                // Primeiro, torna o elemento visível no layout (display: grid/flex), mas ainda transparente
                targetSection.classList.add('visible'); 

                // Força um pequeno atraso para o browser reconhecer a mudança de 'display' antes de animar a 'opacity'
                setTimeout(() => {
                    // Depois de um pequeno atraso, ativa o fade in (opacity: 1)
                    targetSection.classList.add('active-content');
                }, 10); // 10ms é o suficiente
            }
            
            // 4. ATIVAR A ABA CLICADA
            this.classList.add('active');
        });
    });
});
/* ================================== */
/* Scroll cardápio */
/* ================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os botões/links que têm a classe 'btn-primary' E o href para '#cardapio'.
    // Usamos um seletor mais específico para garantir que apenas o botão de pedido seja afetado.
    const orderButtons = document.querySelectorAll('a.btn-primary[href="#cardapio"]');
    
    // 2. Itera sobre todos os botões encontrados (caso haja mais de um na página)
    orderButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            
            // Impede a rolagem abrupta padrão do link <a>
            event.preventDefault(); 

            // Pega o ID da seção de destino (#cardapio)
            const targetId = button.getAttribute('href'); 
            
            // Seleciona o elemento de destino (a seção <section id="cardapio">)
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Rola suavemente até o elemento de destino
                targetSection.scrollIntoView({
                    behavior: 'smooth', // O efeito de rolagem suave
                    block: 'start'      // Alinha o topo da seção com o topo da viewport
                });
            }
        });
    });
});

/* ================================== */
/* paralaxe-cardapio */
/* ================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o contêiner principal da seção do cardápio onde o mouse será monitorado
    const cardapioContainer = document.querySelector('.cardapio-container');

    // Seleciona as imagens decorativas que se moverão
    const tomateEsquerdo = document.querySelector('.tomate-esq');
    const alfaceDireito = document.querySelector('.alface-dir');
    const panoLaranjaEsquerdo = document.querySelector('.pano-laranja-esq');
    const redondoDireito = document.querySelector('.redondo-dir'); // Incluímos a nova imagem

    // Apenas executa se o contêiner e pelo menos uma imagem forem encontrados
    if (cardapioContainer && (tomateEsquerdo || alfaceDireito || panoLaranjaEsquerdo || redondoDireito)) {
        
        cardapioContainer.addEventListener('mousemove', (e) => {
            // Obtém as dimensões e posição do contêiner
            const rect = cardapioContainer.getBoundingClientRect();
            
            // Calcula a posição do mouse em relação ao centro do contêiner
            // (e.clientX - rect.left) -> Posição X do mouse dentro do contêiner
            // rect.width / 2 -> Centro do contêiner
            const xAxis = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2); // De -1 a 1
            const yAxis = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2); // De -1 a 1

            // Ajuste a sensibilidade do movimento aqui.
            // Quanto maior o número, mais as imagens se movem.
            const sensitivity = 15; 

            // Aplica a transformação em cada imagem
            // As imagens se movem de forma ligeiramente diferente para criar profundidade
            if (tomateEsquerdo) {
                tomateEsquerdo.style.transform = `translate(${xAxis * sensitivity * 0.8}px, ${yAxis * sensitivity * 0.8}px)`;
            }
            if (alfaceDireito) {
                alfaceDireito.style.transform = `translate(${xAxis * sensitivity * 1.2}px, ${yAxis * sensitivity * 1.2}px)`;
            }
            if (panoLaranjaEsquerdo) {
                panoLaranjaEsquerdo.style.transform = `translate(${xAxis * sensitivity * 0.6}px, ${yAxis * sensitivity * 0.6}px) rotate(180deg)`; // Mantém a rotação
            }
            if (redondoDireito) {
                redondoDireito.style.transform = `translate(${xAxis * sensitivity * 1.0}px, ${yAxis * sensitivity * 1.0}px)`;
            }
        });

        // Opcional: Resetar a posição quando o mouse sair do contêiner
        cardapioContainer.addEventListener('mouseleave', () => {
            if (tomateEsquerdo) tomateEsquerdo.style.transform = `translate(0px, 0px)`;
            if (alfaceDireito) alfaceDireito.style.transform = `translate(0px, 0px)`;
            if (panoLaranjaEsquerdo) panoLaranjaEsquerdo.style.transform = `translate(0px, 0px) rotate(180deg)`;
            if (redondoDireito) redondoDireito.style.transform = `translate(0px, 0px)`;
        });
    }
});

